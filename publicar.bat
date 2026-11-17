@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo  Publicando el sitio de DataSquad en GitHub Pages...
echo  (el detalle queda guardado en publicar-log.txt)
echo.
set LOG=publicar-log.txt
echo ==== %date% %time% ==== > "%LOG%"

rem El flujo que compila y publica el sitio en GitHub Pages
if not exist ".github\workflows" mkdir ".github\workflows"
copy /Y "github-pages\pages.yml" ".github\workflows\pages.yml" >> "%LOG%" 2>&1

if not exist ".git" git init -b main >> "%LOG%" 2>&1
git config user.name "DataSquadOficial"
git config user.email "datasquadoficial@gmail.com"
git branch -M main >> "%LOG%" 2>&1
git remote remove origin >nul 2>&1
git remote add origin https://DataSquadOficial@github.com/DataSquadOficial/DataSquad.git

echo --- add --- >> "%LOG%"
git add -A >> "%LOG%" 2>&1
echo --- commit --- >> "%LOG%"
git commit -m "Sitio web de DataSquad" -m "Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_01U93d5CgtUuTG26QAjmbk3q" >> "%LOG%" 2>&1
echo --- status --- >> "%LOG%"
git status --short --branch >> "%LOG%" 2>&1
git log --oneline -3 >> "%LOG%" 2>&1
echo --- push --- >> "%LOG%"
echo  Subiendo a GitHub... (si se abre una ventana, entra como DataSquadOficial)
git push -u origin main >> "%LOG%" 2>&1
if errorlevel 1 (
  echo.
  echo  ** La subida FALLO. Avisale a Claude: el detalle esta en publicar-log.txt **
) else (
  echo.
  echo  Listo. El sitio queda en https://datasquadoficial.github.io/DataSquad/ en un par de minutos.
)
echo.
pause
