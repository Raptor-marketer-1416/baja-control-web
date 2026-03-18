@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   BAJA CONTROL DE PLAGAS - Publicando...
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] Guardando cambios en Git...
git add .
git commit -m "Actualizacion del sitio web" 2>nul || echo (Sin cambios nuevos en git)
git push origin main 2>nul

echo.
echo [2/3] Subiendo a Cloudflare Pages...
set CLOUDFLARE_API_TOKEN=NLn0L2ooM-Q-ENTapCz-ABycp8S5h-be4MSfMvr5
set CLOUDFLARE_ACCOUNT_ID=598d12c266f77cf364564d086167f79f
npx wrangler pages deploy . --project-name=baja-control-web --commit-dirty=true 2>&1

echo.
echo [3/3] Listo!
echo El sitio esta disponible en: https://bajacontroldeplagas.com
echo.
pause
