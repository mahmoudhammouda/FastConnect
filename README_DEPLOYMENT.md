# Guide de Déploiement - FastConnect

Ce document décrit les procédures de déploiement de l'application FastConnect dans différents environnements.

## Table des matières
1. [Déploiement en local](#déploiement-en-local)
2. [Déploiement sur Replit](#déploiement-sur-replit)
3. [Génération de l'extension Chrome](#génération-de-lextension-chrome)
   - [Version locale](#version-locale)
   - [Version production](#version-production)

## Déploiement en local

### 1. Lancement de l'API backend

Pour lancer l'API .NET Core en local :

```bash
cd connect-api
dotnet run --urls=http://localhost:8000 --environment Development
```

Cette commande démarre l'API sur `http://localhost:8000` avec la configuration de développement.

### 2. Lancement de l'application Angular

Pour lancer l'application web Angular (sans extension) :

```bash
cd connect-extension-app
npm start
```

Le script `set-environment.js` détecte automatiquement l'environnement d'exécution (local ou Replit) et applique la configuration appropriée :
- Il copie le fichier `environment.local.ts` ou `environment.replit.ts` vers `environment.ts`
- Il lance l'application avec les bons paramètres selon l'environnement

En environnement local, le script appelle `npm run serve:local`, qui lance l'application sur `localhost:5000` avec la configuration de proxy appropriée.

## Déploiement sur Replit

Sur Replit, le processus est similaire mais la configuration est automatiquement adaptée à l'environnement Replit :

1. Lancer l'application avec :
```bash
npm start
```

2. Le script `set-environment.js` détectera automatiquement l'environnement Replit et :
   - Copiera `environment.replit.ts` vers `environment.ts`
   - Lancera `npm run serve:replit` qui configure le serveur pour écouter sur `0.0.0.0:5000` permettant l'accès externe

## Génération de l'extension Chrome

### Version locale

Pour générer l'extension Chrome pointant vers l'API locale :

```bash
cd connect-deployment
.\generate-extension-local.bat
```

Ce script :
1. Nettoie le répertoire de sortie (`connect-extension-dist`)
2. Build l'application Angular avec la configuration `local-extension`
3. Utilise la configuration d'environnement suivante :
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:8000/api',
     isExtension: true,
     envName: 'local-extension'
   };
   ```
4. Copie les fichiers nécessaires dans le répertoire `connect-extension-dist`

Une fois le processus terminé, l'extension est disponible dans le dossier `connect-extension-dist`.

### Version production

Pour générer l'extension Chrome pointant vers l'API de production hébergée :

```bash
cd connect-deployment
.\generate-extension-prod.bat
```

Ce script fonctionne de manière similaire au script local, mais utilise la configuration `prod-extension` qui pointe vers l'API de production (généralement `https://api.fastconnect.io/api`).

## Installation de l'extension Chrome

1. Ouvrir Chrome et accéder à `chrome://extensions/`
2. Activer le "Mode développeur" (coin supérieur droit)
3. Cliquer sur "Charger l'extension non empaquetée"
4. Sélectionner le dossier `connect-extension-dist`

## Dépannage

### Problèmes courants et solutions

1. **Erreur "Port déjà utilisé"** : Si le port 5000 est déjà utilisé lors du lancement de l'application Angular, vous pouvez soit :
   - Répondre "Y" lorsque Angular propose d'utiliser un autre port
   - Ou libérer le port 5000 en fermant l'application qui l'utilise

2. **Problèmes de proxy** : Si l'application ne parvient pas à communiquer avec l'API, vérifiez que :
   - L'API est bien en cours d'exécution sur le port 8000
   - Le fichier `proxy.conf.json` est correctement configuré
   - Les pare-feu n'interfèrent pas avec la communication

3. **Extension Chrome non fonctionnelle** : Assurez-vous que :
   - Tous les fichiers ont été correctement copiés dans le dossier de l'extension
   - Le fichier `manifest.json` est valide
   - L'icône `icon.png` est présente dans le dossier de l'extension
