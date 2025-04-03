# Guide de Déploiement - FastConnect

> **STATUT DE DÉPLOIEMENT : ✅ FONCTIONNEL**
>  
> **Dernière validation : 03/04/2025**
>
> Ce guide a été validé et testé. Tous les déploiements fonctionnent correctement à la fois sur Replit et en local.
> Les services sont stables lors des redémarrages et la communication entre le backend et le frontend est confirmée.

Ce document décrit les procédures de déploiement de l'application FastConnect dans différents environnements.

## Documentation liée
- [README principal](./README.md) - Vue d'ensemble du projet
- [Procédure Git](./README_GIT_PROCEDURE.md) - Workflow et procédures Git
- [Contexte du projet](./README_CONTEXT.md) - Contexte et objectifs du projet
- [Configuration](./README_CONFIG.md) - Options de configuration
- [Changelog](./README_CHANGE_LOG.md) - Historique des modifications

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

Sur Replit, le processus est simplifié grâce aux workflows qui gèrent automatiquement le démarrage des différents services.

### Configuration des workflows

Le projet utilise deux workflows principaux :

1. **Connect API** : Lance l'API .NET Core
2. **Angular Frontend** : Lance l'application Angular avec la configuration Replit

Pour démarrer ces workflows, Replit s'occupe automatiquement de l'exécution au démarrage. Si besoin, vous pouvez les (re)démarrer manuellement depuis l'interface Replit.

### Fonctionnement de l'environnement Replit

1. Au démarrage du workflow Angular Frontend, le script `set-environment.js` est exécuté :
   ```bash
   cd connect-extension-app && node set-environment.js
   ```

2. Ce script détecte automatiquement l'environnement Replit grâce à la présence des variables d'environnement `REPL_ID` ou `REPL_SLUG` et :
   - Copie `environment.replit.ts` vers `environment.ts` pour utiliser la bonne configuration
   - Lance `npm run serve:replit` qui démarre Angular avec les paramètres adaptés à Replit :
     ```
     ng serve --host 0.0.0.0 --port 5000 --disable-host-check --proxy-config proxy.conf.json
     ```

3. La configuration de l'environnement Replit utilise un proxy pour communiquer avec l'API :
   ```typescript
   export const environment = {
     production: false,
     apiUrl: '/api',  // Utilise le proxy configuré dans proxy.conf.json
     isExtension: false,
     envName: 'replit',
     debugInfo: {
       timestamp: new Date().toISOString(),
       buildMode: 'Replit Development'
     }
   };
   ```

4. Le fichier `proxy.conf.json` redirige les requêtes `/api` vers l'API .NET Core sur le port 8000 :
   ```json
   {
     "/api": {
       "target": "http://0.0.0.0:8000",
       "secure": false,
       "logLevel": "debug",
       "changeOrigin": true,
       "headers": {
         "Connection": "keep-alive"
       },
       "timeout": 60000
     }
   }
   ```

### Vérification du déploiement

Une fois les workflows démarrés, vous pouvez vérifier que tout fonctionne correctement :

1. L'API .NET Core doit afficher des logs de démarrage et écouter sur le port 8000
2. L'application Angular doit être compilée avec succès et accessible sur le port 5000
3. En accédant à l'URL de l'application Angular (visible dans l'interface Replit), vous devriez voir l'interface utilisateur avec les données de consultants chargées depuis l'API

### Tests de fiabilité et redémarrages

Le système a été testé pour vérifier sa stabilité lors des redémarrages, avec les résultats suivants :

1. **Redémarrage du workflow API** :
   - L'API .NET Core redémarre correctement et est rapidement disponible
   - Les requêtes existantes peuvent être temporairement interrompues pendant le redémarrage (~5 secondes)
   - L'application Angular reconnaît automatiquement la connexion à l'API dès qu'elle est rétablie

2. **Redémarrage du workflow Angular** :
   - L'application Angular redémarre sans problème et recompile tous les assets
   - Le script `set-environment.js` détecte toujours correctement l'environnement Replit
   - La communication avec l'API est rétablie automatiquement après la recompilation

3. **Redémarrage simultané des deux workflows** :
   - Les deux services redémarrent sans conflit
   - La séquence de redémarrage n'a pas d'importance (l'API peut être démarrée avant ou après Angular)
   - Aucune configuration manuelle n'est nécessaire après le redémarrage

Ces tests confirment que l'architecture de déploiement est robuste et tolérante aux redémarrages, ce qui est essentiel pour la maintenance et les mises à jour en production.

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

### Problèmes spécifiques à Replit

1. **Application Angular ne se connecte pas à l'API** : Si dans l'environnement Replit, l'application ne parvient pas à se connecter à l'API, vérifiez que :
   - Le workflow **Connect API** est bien démarré et fonctionne sur le port 8000
   - Le fichier `environment.ts` a bien été mis à jour avec la configuration Replit (apiUrl: '/api')
   - Le proxy est correctement configuré dans `proxy.conf.json` pour rediriger vers `http://0.0.0.0:8000`
   - Les workflows sont redémarrés après toute modification de configuration

2. **Problème de détection d'environnement** : Si le script `set-environment.js` ne détecte pas correctement l'environnement Replit :
   - Vérifiez que les variables d'environnement `REPL_ID` ou `REPL_SLUG` sont bien définies
   - Vous pouvez forcer l'utilisation de la configuration Replit en exécutant manuellement :
     ```bash
     cd connect-extension-app
     cp src/environments/environment.replit.ts src/environments/environment.ts
     npm run serve:replit
     ```

3. **Problèmes de performance** : Si l'application est lente sur Replit :
   - La première compilation Angular peut prendre du temps, soyez patient
   - Utilisez le mode production pour les déploiements à long terme :
     ```bash
     cd connect-extension-app
     ng build --prod
     ```
   - Considérez l'utilisation d'un CDN pour les assets statiques
