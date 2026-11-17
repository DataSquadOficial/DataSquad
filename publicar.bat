@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo  Publicando el sitio de DataSquad en GitHub Pages...
echo.
rem El flujo que compila y publica el sitio en GitHub Pages
if not exist ".github\workflows" mkdir ".github\workflows"
copy /Y "github-pages\pages.yml" ".github\workflows\pages.yml" >nul

if not exist ".git" (
  git init -b main
  git config user.name "DataSquadOficial"
  git config user.email "datasquadoficial@gmail.com"
  git remote add origin https://DataSquadOficial@github.com/DataSquadOficial/DataSquad.git
)
git add -A
git commit -m "Sitio web de DataSquad" -m "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_01U93d5CgtUuTG26QAjmbk3q"
git push -u origin main
echo.
echo  Si no hubo errores, el sitio queda en https://datasquadoficial.github.io/DataSquad/ en un par de minutos.
echo.
pause
