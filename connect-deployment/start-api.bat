@echo off
echo Démarrage de l'API FastConnect en mode développement...
cd connect-api
dotnet run --urls=http://localhost:8000 --environment Development
