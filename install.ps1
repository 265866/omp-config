$ErrorActionPreference = 'Stop'

$repoRoot = if ([string]::IsNullOrEmpty($env:OMP_CONFIG_REPO)) {
    if ([string]::IsNullOrEmpty($PSScriptRoot)) {
        Split-Path -Parent $MyInvocation.MyCommand.Path
    }
    else {
        $PSScriptRoot
    }
}
else {
    $env:OMP_CONFIG_REPO
}

$cwd = (Get-Location).ProviderPath

if (-not ([System.IO.Path]::IsPathRooted($repoRoot))) {
    $repoRoot = [System.IO.Path]::GetFullPath((Join-Path -Path $cwd -ChildPath $repoRoot))
}
else {
    $repoRoot = [System.IO.Path]::GetFullPath($repoRoot)
}

function Get-FullPathFromBase {
    param(
        [Parameter(Mandatory = $true)][string]$BasePath,
        [Parameter(Mandatory = $true)][string]$Path
    )

    if ([System.IO.Path]::IsPathRooted($Path)) {
        return [System.IO.Path]::GetFullPath($Path)
    }

    return [System.IO.Path]::GetFullPath((Join-Path -Path $BasePath -ChildPath $Path))
}

function Stop-Install {
    param(
        [Parameter(Mandatory = $true)][string]$Message
    )

    [Console]::Error.WriteLine($Message)
    exit 1
}


$repoAgent = Join-Path -Path $repoRoot -ChildPath 'agent'
$homeRoot = if ([string]::IsNullOrEmpty($env:USERPROFILE)) {
    $HOME
}
else {
    $env:USERPROFILE
}
$liveAgent = Join-Path -Path $homeRoot -ChildPath '.omp/agent'

if (-not (Test-Path -LiteralPath $repoAgent -PathType Container)) {
    Stop-Install "Missing repo agent directory: $repoAgent"
}

New-Item -ItemType Directory -Path $liveAgent -Force | Out-Null

# Current tracked paths plus future OMP-native loadable paths.
# Future paths are linked only if they exist in the repo.
$items = @(
    'AGENTS.md'
    'RULES.md'
    'config.yml'
    'models.yml'
    'agents'
    'rules'
    'skills'
    'commands'
    'prompts'
    'instructions'
    'hooks'
    'tools'
    'extensions'
    'settings.json'
)

foreach ($item in $items) {
    $src = Join-Path -Path $repoAgent -ChildPath $item
    $dst = Join-Path -Path $liveAgent -ChildPath $item

    $srcItem = Get-Item -LiteralPath $src -Force -ErrorAction SilentlyContinue
    if ($null -eq $srcItem) {
        continue
    }

    $dstItem = Get-Item -LiteralPath $dst -Force -ErrorAction SilentlyContinue
    if ($null -ne $dstItem) {

        if ($dstItem.LinkType -eq 'SymbolicLink') {
            $currentTarget = [string]$dstItem.Target
            $currentTargetPath = Get-FullPathFromBase -BasePath (Split-Path -Parent $dst) -Path $currentTarget
            $desiredTargetPath = [System.IO.Path]::GetFullPath($src)
            if ($currentTargetPath -eq $desiredTargetPath) {
                Write-Output "already linked: $item"
                continue
            }

            Stop-Install "Refusing to replace existing symlink: $dst -> $currentTarget"
        }

        Stop-Install "Refusing to replace existing path: $dst`nMove or merge it manually, then rerun this script."
    }

    try {
        New-Item -ItemType SymbolicLink -Path $dst -Target $src | Out-Null
        Write-Output "linked: $item"
    }
    catch {
        Stop-Install "Failed to create symbolic link: $dst -> $src`nWindows symlink creation may require Developer Mode or an elevated shell.`n$($_.Exception.Message)"
    }
}
