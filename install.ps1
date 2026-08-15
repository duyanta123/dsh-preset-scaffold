# 一键安装 dsh-preset-scaffold 到 DSH 用户预设根目录。
# 用法（在仓库根目录）： powershell -ExecutionPolicy Bypass -File install.ps1
$ErrorActionPreference = 'Stop'
$src = $PSScriptRoot
$dst = Join-Path $env:USERPROFILE '.dsh\.agent-presets\scaffold'

if (-not (Test-Path (Join-Path $src 'agent.cordis.yml'))) { throw '未找到 agent.cordis.yml，请在仓库根目录运行本脚本' }
if (Test-Path $dst) { Remove-Item $dst -Recurse -Force }
New-Item -ItemType Directory -Force -Path $dst | Out-Null

Get-ChildItem $src -Force | Where-Object { $_.Name -ne '.git' } | ForEach-Object {
  Copy-Item -Recurse -Force $_.FullName $dst
}
Write-Host "已安装到 $dst`n新建会话并选择「项目初始化脚手架」即可。"