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

## Model providers and secrets

`agent/models.yml` is tracked because it describes model providers and endpoints. It must not contain raw API keys.

For Cliproxy, the tracked provider config reads the key directly out of the live, untracked OMP env file:

```yaml
apiKey: "!sed -n 's/^CLIPROXY_API_KEY=//p' $HOME/.omp/agent/.env"
```

The `!` prefix tells OMP to run that command and use its stdout as the key. It is evaluated lazily, every time the provider is loaded.

> Note: OMP does **not** auto-source `~/.omp/agent/.env`.

Keep the real key in the live, untracked OMP env file:

```text
~/.omp/agent/.env
```

Example local-only content:

```dotenv
CLIPROXY_API_KEY=...
```

That live file is outside this repo and stays untracked. The repo `.gitignore` also ignores any accidental `agent/.env` or other `.env` file. Use `chmod 600 ~/.omp/agent/.env` on machines that store secrets there.

The current default model role is:

```yaml
modelRoles:
  default: cliproxy/gpt-5.5:xhigh
```

After bootstrapping a new machine, verify the provider is visible:

```bash
omp models find cliproxy
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
