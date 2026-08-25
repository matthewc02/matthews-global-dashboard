# Matthews Global Dashboard - GitHub Auto-Deploy Script
param(
    [string]$Username,
    [string]$RepoName = "matthews-global-dashboard"
)

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "   Matthews Global Dashboard - GitHub Auto Deployer" -ForegroundColor White
Write-Host "========================================================" -ForegroundColor Cyan

if (-not $Username) {
    $Username = Read-Host "Enter your GitHub username or organization"
}

if (-not $Username) {
    Write-Host "Error: GitHub username cannot be empty." -ForegroundColor Red
    exit 1
}

Write-Host "`nInitializing Git Repository & Staging Files..." -ForegroundColor Yellow
git init
git branch -M main
git add .
git commit -m "Matthews Global Dashboard: Tuesday Edition, Family Photos, Deck/Bathroom/Shop Hub"

$remoteUrl = "https://github.com/$Username/$RepoName.git"
Write-Host "Setting remote origin to $remoteUrl" -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin $remoteUrl

Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

$pagesUrl = "https://$Username.github.io/$RepoName/"
$repoUrl = "https://github.com/$Username/$RepoName"

Write-Host "`n========================================================" -ForegroundColor Green
Write-Host "   SUCCESSFULLY PUSHED TO GITHUB!" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
Write-Host "Repository URL: $repoUrl" -ForegroundColor Cyan
Write-Host "Public Live URL: $pagesUrl`n" -ForegroundColor Green
Write-Host "To enable GitHub Pages:" -ForegroundColor White
Write-Host "1. Navigate to: $repoUrl/settings/pages"
Write-Host "2. Under 'Source', choose 'Deploy from a branch'"
Write-Host "3. Select branch 'main' and '/ (root)', then click Save."
Write-Host "`nYour live public dashboard will be live at: $pagesUrl" -ForegroundColor Cyan
