# OMP config

Personal Oh My Pi configuration tracked in Git.

This repo stores hand-authored OMP config only. The live OMP runtime directory stays at `~/.omp/agent`, and selected config paths are symlinked from there into this repo.

## Tracked paths

Current tracked paths:

```text
agent/AGENTS.md
agent/RULES.md
agent/config.yml
agent/agents/
agent/rules/
agent/skills/
agent/extensions/
```

Live symlink layout:

```text
~/.omp/agent/AGENTS.md  -> ~/Documents/omp-config/agent/AGENTS.md
~/.omp/agent/RULES.md   -> ~/Documents/omp-config/agent/RULES.md
~/.omp/agent/config.yml -> ~/Documents/omp-config/agent/config.yml
~/.omp/agent/agents     -> ~/Documents/omp-config/agent/agents
~/.omp/agent/rules      -> ~/Documents/omp-config/agent/rules
~/.omp/agent/skills     -> ~/Documents/omp-config/agent/skills
~/.omp/agent/extensions -> ~/Documents/omp-config/agent/extensions
```

Do not symlink the whole `~/.omp/agent` directory. It contains live state such as SQLite databases, WAL files, session data, and terminal session state.

## Not tracked

These are machine-local runtime files and should stay out of Git:

```text
~/.omp/agent/*.db
~/.omp/agent/*.db-wal
~/.omp/agent/*.db-shm
~/.omp/agent/sessions/
~/.omp/agent/terminal-sessions/
```

The repo `.gitignore` also excludes common OMP runtime state, secrets, and package install directories.

## Install on a new machine

Clone the repo:

```bash
git clone <repo-url> "$HOME/Documents/omp-config"
```

Run the installer:

```bash
cd "$HOME/Documents/omp-config"
./install.sh
```

The installer links the current tracked paths into `~/.omp/agent`. It also knows about future OMP-native config paths, but it only links them if they exist in the repo:

```text
agent/commands/
agent/prompts/
agent/instructions/
agent/hooks/
agent/tools/
agent/settings.json
```

It refuses to overwrite existing files or symlinks that point somewhere else. If a target already exists on a new machine, merge or move that path manually, then rerun the installer.

## Editing workflow

Edit files in the repo, not through a copied local config tree:

```bash
cd "$HOME/Documents/omp-config"
$EDITOR agent/AGENTS.md
$EDITOR agent/rules/testing.md
```

Then commit normally:

```bash
git status
git add agent README.md .gitignore install.sh
git commit -m "Update OMP config"
```

Push only when you intend to sync to the remote.

## Adding future OMP config paths

If you start using another OMP-native config path, create it under `agent/` in this repo:

```bash
mkdir -p "$HOME/Documents/omp-config/agent/tools"
```

Then rerun:

```bash
cd "$HOME/Documents/omp-config"
./install.sh
```

The script will create the matching symlink under `~/.omp/agent` if the live path does not already exist.

## Undoing the symlink setup

To stop using the repo for one path:

1. Remove the symlink from `~/.omp/agent`.
2. Copy the corresponding file or directory from `agent/` back into `~/.omp/agent`.

Example for `rules/`:

```bash
unlink "$HOME/.omp/agent/rules"
cp -R "$HOME/Documents/omp-config/agent/rules" "$HOME/.omp/agent/rules"
```

Use the same pattern for `AGENTS.md`, `RULES.md`, `config.yml`, `agents/`, and `skills/`.
