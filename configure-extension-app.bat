@echo off
echo ============================================================
echo  Configuration de l'application FastConnect Extension
echo ============================================================
echo.

:: Exécution du script de configuration en mode config-only
node configure-angular-app.js --config-only

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [31mErreur lors de la configuration de l'application.[0m
    echo.
    exit /b %ERRORLEVEL%
)

echo.
echo [32mConfiguration terminée avec succès![0m
echo [32mVous pouvez maintenant lancer l'application avec 'npm start'[0m
echo.