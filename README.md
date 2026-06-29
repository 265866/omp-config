# OMP config

Personal Oh My Pi config tracked in Git.

This repo tracks hand-authored files under `agent/`. The live OMP runtime stays outside the repo at `~/.omp/agent` on macOS/Linux/WSL/Git Bash or `%USERPROFILE%\.omp\agent` on native Windows. The installer creates symlinks in the live runtime that point to this repo.

Do not symlink the whole runtime directory. It contains local state, sessions, databases, logs, and secrets.

## Tracked paths

```text
agent/AGENTS.md
agent/RULES.md
agent/config.yml
agent/models.yml
agent/agents/
agent/rules/
agent/skills/
agent/extensions/
```

The installers also link optional OMP config paths if they exist in the repo: `agent/commands/`, `agent/prompts/`, `agent/instructions/`, `agent/hooks/`, `agent/tools/`, and `agent/settings.json`.

## Install

macOS, Linux, WSL, or Git Bash:

```bash
git clone <repo-url> "$HOME/Documents/omp-config"
cd "$HOME/Documents/omp-config"
./install.sh
```

`install.sh` is a Bash script.

Native Windows PowerShell:

```powershell
git clone <repo-url> "$env:USERPROFILE\Documents\omp-config"
cd "$env:USERPROFILE\Documents\omp-config"
.\install.ps1
```

If PowerShell blocks the script for this shell:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\install.ps1
```

Windows may require Developer Mode or an elevated PowerShell session for symlink creation.

The installers refuse to overwrite existing files or symlinks that point somewhere else. Move or merge any conflicting live path, then rerun the installer.

## Secrets and models

`agent/models.yml` must not contain raw API keys. Cliproxy uses an environment variable name:

```yaml
apiKey: CLIPROXY_API_KEY
```

OMP 16.2.5 resolves `models.yml` API keys as env-var-name-or-literal: it checks the environment for `CLIPROXY_API_KEY` first, then falls back to the literal string if unset. Set the key in the process environment or in a local `.env` file.

OMP loads `.env` from the current project, live agent directory, config root, and home directory without overriding already-set environment values. Common local files:

```text
~/.omp/agent/.env
%USERPROFILE%\.omp\agent\.env
```

Example content:

```dotenv
CLIPROXY_API_KEY=your-key-here
```

Do not commit `.env` files or raw keys. The repo `.gitignore` excludes runtime databases, sessions, terminal state, logs, secrets, package installs, and OS-generated files.

Current default model role:

```yaml
modelRoles:
  default: cliproxy/gpt-5.5:xhigh
```

## Editing

Edit files in this repo, not in a copied live config tree.

```bash
cd "$HOME/Documents/omp-config"
$EDITOR agent/AGENTS.md
git status
git diff
```

Commit manually when you want to save a reviewed change:

```bash
git add -A
git commit -m "Update OMP config"
```

Push only when you intend to sync to the remote.

## Adding or removing linked paths

To add a new OMP config path, create it under `agent/` and rerun the installer for your platform.

To stop using the repo for one path:

1. Remove the symlink from the live runtime directory.
2. Copy the matching file or directory from `agent/` back into the live runtime directory.

On Windows, use `Remove-Item` without `-Recurse` when the path is a symlink. If the path is not a symlink, stop and inspect it before deleting anything.
