# Matthews Global Dashboard Launcher
$dashboardPath = Join-Path $PSScriptRoot "index.html"
Write-Host "Opening Matthews Global Dashboard: $dashboardPath" -ForegroundColor Cyan
Start-Process $dashboardPath
