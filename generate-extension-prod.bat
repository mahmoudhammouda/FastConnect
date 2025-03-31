@echo off
REM Script pour générer l'extension Chrome Connect en mode production
REM Compatible avec Windows

echo Génération de l'extension Chrome Connect en mode production...
node generate-extension-prod.js
if %ERRORLEVEL% NEQ 0 (
    echo Une erreur s'est produite lors de la génération de l'extension.
    pause
    exit /b 1
)

echo.
echo L'extension a été générée avec succès !
echo.

pause