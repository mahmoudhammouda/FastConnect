# Configuration de l'Environnement FastConnect

Ce document explique en détail la nouvelle architecture de configuration du projet FastConnect qui permet une configuration automatique adaptée à chaque environnement.

## Scripts de Configuration Automatique

### `configure-angular-app.js` (anciennement start-angular.js)

Script Node.js qui détecte automatiquement l'environnement (Replit ou local) et adapte la configuration d'Angular en conséquence. Ce script offre maintenant deux modes de fonctionnement :

1. **Mode configuration uniquement** : Prépare l'environnement sans démarrer l'application
    ```
    node configure-angular-app.js --config-only
    ```

2. **Mode complet** : Configure et démarre l'application
    ```
    node configure-angular-app.js
    ```

#### Fonctionnalités

- Détection automatique de l'environnement (Replit vs Local)
- Adaptation de la configuration Angular selon la version détectée
- Correction automatique du fichier `angular.json` pour gérer le passage de `browserTarget` à `buildTarget` dans Angular 15+
- Sauvegarde automatique de la configuration d'origine
- Paramètres optimisés pour Replit (host: 0.0.0.0, disable-host-check, etc.)

### `configure-extension-app.bat` (Windows)

Script batch pour Windows qui exécute la configuration sans démarrer l'application, idéal pour préparer l'environnement avant un build ou un déploiement.

```batch
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
```

### `detect-env-and-serve.js`

Nouveau script qui détecte l'environnement et exécute la commande Angular appropriée. Il est principalement utilisé par la commande `npm start`.

```javascript
/**
 * Script de détection automatique de l'environnement et lancement du serveur Angular
 * Ce script détecte si nous sommes sur Replit ou en local et exécute la commande appropriée
 */

const { execSync } = require('child_process');

// Détecter si nous sommes sur Replit
const isReplit = process.env.REPL_ID || process.env.REPL_SLUG;

console.log(`🔍 Détection de l'environnement: ${isReplit ? 'Replit' : 'Local'}`);

try {
  // Déterminer la commande à exécuter en fonction de l'environnement
  const command = isReplit ? 'npm run start:replit' : 'npm run start:local';
  
  console.log(`▶️ Exécution de la commande: ${command}`);
  execSync(command, { stdio: 'inherit', cwd: './connect-extension-app' });
  
} catch (error) {
  console.error('❌ Erreur lors du démarrage de l\'application Angular:', error.message);
  process.exit(1);
}
```

## Configuration NPM

Les scripts NPM dans `connect-extension-app/package.json` ont été mis à jour pour utiliser notre nouvelle architecture de configuration :

```json
"scripts": {
  "ng": "ng",
  "start": "node ../detect-env-and-serve.js",
  "start:local": "ng serve --configuration=local --host localhost --port 5000 --disable-host-check --proxy-config proxy.conf.json",
  "start:replit": "ng serve --configuration=replit --host 0.0.0.0 --port 5000 --disable-host-check --proxy-config proxy.conf.json",
  ...
}
```

## Configuration du Workflow Replit

Le workflow Replit pour l'application Angular a été modifié pour utiliser notre nouveau système de détection :

```
node detect-env-and-serve.js
```

## Procédure d'utilisation

### En Environnement de Développement Local

1. **Configuration de l'environnement uniquement**
   ```
   configure-extension-app.bat
   ```

2. **Démarrage de l'application après configuration**
   ```
   cd connect-extension-app
   npm start
   ```

### Sur Replit

1. **Configuration de l'environnement uniquement**
   ```
   node configure-angular-app.js --config-only
   ```

2. **Démarrage de l'application après configuration**
   ```
   node detect-env-and-serve.js
   ```
   ou
   ```
   cd connect-extension-app
   npm start
   ```

### Génération de l'Extension Chrome

Si vous souhaitez générer l'extension Chrome après la configuration :

1. Configurez l'environnement sans démarrer l'application
   ```
   configure-extension-app.bat
   ```
   ou
   ```
   node configure-angular-app.js --config-only
   ```

2. Générez l'extension
   ```
   node connect-deployment/generate-extension-local.js
   ```
   ou pour la production
   ```
   node connect-deployment/generate-extension-prod.js
   ```

## Avantages de cette Architecture

1. **Séparation claire** entre configuration et démarrage
2. **Détection automatique de l'environnement** pour une expérience unifiée
3. **Scripts spécifiques optimisés** pour chaque environnement
4. **Meilleure organisation du code** avec des responsabilités bien définies
5. **Facilité d'utilisation** avec une seule commande `npm start` qui fonctionne partout
6. **Robustesse accrue** face aux changements dans les versions d'Angular
7. **Support multi-plateforme** avec des scripts adaptés