#!/usr/bin/env bash
set -euo pipefail

repo_root="${OMP_CONFIG_REPO:-$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)}"
repo_root="$(cd -- "$repo_root" && pwd)"
repo_agent="$repo_root/agent"
live_agent="$HOME/.omp/agent"

if [ ! -d "$repo_agent" ]; then
  echo "Missing repo agent directory: $repo_agent" >&2
  exit 1
fi

mkdir -p "$live_agent"

# Current tracked paths plus future OMP-native loadable paths.
# Future paths are linked only if they exist in the repo.
items=(
  AGENTS.md
  RULES.md
  config.yml
  models.yml
  agents
  rules
  skills
  commands
  prompts
  instructions
  hooks
  tools
  extensions
  settings.json
)

for item in "${items[@]}"; do
  src="$repo_agent/$item"
  dst="$live_agent/$item"

  if [ ! -e "$src" ] && [ ! -L "$src" ]; then
    continue
  fi

  if [ -L "$dst" ]; then
    current_target="$(readlink "$dst")"
    if [ "$current_target" = "$src" ]; then
      echo "already linked: $item"
      continue
    fi
    echo "Refusing to replace existing symlink: $dst -> $current_target" >&2
    exit 1
  fi

  if [ -e "$dst" ]; then
    echo "Refusing to replace existing path: $dst" >&2
    echo "Move or merge it manually, then rerun this script." >&2
    exit 1
  fi

  ln -s "$src" "$dst"
  echo "linked: $item"
done
