@echo off
setlocal enabledelayedexpansion

echo ========================================================
echo   Matthews Global Dashboard - GitHub Deployer
echo ========================================================
echo.

REM Prompt for GitHub username/repo if not set
set /p GH_USER="Enter your GitHub username or org: "
if "%GH_USER%"=="" (
    echo Error: GitHub username cannot be empty.
    pause
    exit /b 1
)

set REPO_NAME=matthews-global-dashboard
set /p REPO_NAME="Enter repository name [default: matthews-global-dashboard]: "

echo.
echo Initializing Git repository...
git init
git branch -M main
git add .
git commit -m "Initial commit: Matthews Global Dashboard (Tuesday Edition & Family Hub)"

echo.
echo Linking to https://github.com/%GH_USER%/%REPO_NAME%.git ...
git remote remove origin 2>nul
git remote add origin https://github.com/%GH_USER%/%REPO_NAME%.git

echo.
echo Pushing to GitHub main branch...
git push -u origin main

echo.
echo ========================================================
echo   DEPLOYMENT READY!
echo ========================================================
echo   GitHub Repository: https://github.com/%GH_USER%/%REPO_NAME%
echo.
echo   To make it publicly linkable via GitHub Pages:
echo   1. Go to https://github.com/%GH_USER%/%REPO_NAME%/settings/pages
echo   2. Under 'Build and deployment', set Source = 'Deploy from a branch'
echo   3. Select Branch = 'main', folder = '/ (root)' and click Save.
echo.
echo   Your live public dashboard link will be:
echo   👉 https://%GH_USER%.github.io/%REPO_NAME%/
echo ========================================================
pause
