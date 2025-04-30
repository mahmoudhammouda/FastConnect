# FastConnect

Extension Chrome et application web pour la découverte intelligente de consultants spécialisés.

## Structure du projet

- `connect-extension-app/` : Application Angular pour l'extension Chrome (version navigateur)
- `connect-extension-chrome/` : Fichiers spécifiques à l'extension Chrome (manifest, background, etc.)
- `connect-web-app/` : Application web principale pour les consultants et recruteurs
- `connect-api/` : API backend en .NET Core
- `connect-extension-dist/` : Répertoire de build pour l'extension Chrome (généré automatiquement, non suivi par git)
- `connect-deployment/` : Scripts et outils de déploiement pour différents environnements

## Statut du projet

✅ Application Angular fonctionnelle avec composants autonomes (standalone)
✅ API .NET Core opérationnelle avec génération de données de test
✅ Communication correcte entre le frontend et l'API via proxy
✅ Scripts de génération d'extension pour le développement et la production
✅ Système d'authentification avec modal et JWT
✅ Authentification OAuth2 via LinkedIn pour une connexion simplifiée
✅ Architecture multi-environnements (locale, Replit, production)
✅ Séparation complète frontend (Angular) / backend (.NET Core)
✅ Configuration automatique adaptable à tous les environnements
✅ Scripts de déploiement et de build simplifiés et robustes
✅ Configuration de proxy pour l'environnement Replit
✅ Service API centralisé pour une gestion cohérente des URL
✅ Logging avancé des requêtes API et des réponses
✅ Composant de débogage pour faciliter le diagnostic
✅ Récupération et affichage de la liste des consultants depuis l'API
✅ Optimisation de l'affichage sur mobile (responsive design, interface améliorée)
✅ Fonctionnalité de tri et filtrage des consultants en mode mobile
✅ Positionnement optimisé des éléments d'interface (dropdown bookmark, expansions de message)
✅ Gestion améliorée des états d'expansion de message avec synchronisation complète
🚧 En cours : Authentification avec Google et LinkedIn OAuth
🚧 En cours : Développement des fonctionnalités de filtrage avancées

## Prérequis

- Node.js v20.18.1 ou supérieur
- NPM v10.8.2 ou supérieur
- Angular CLI v18.x
- .NET Core 7.0 ou supérieur

## Installation

1. Cloner le dépôt
2. Installer les dépendances pour l'application Angular de l'extension :
   ```
   cd connect-extension-app
   npm install
   ```
3. Installer les dépendances pour l'application web principale (quand elle sera créée) :
   ```
   cd connect-web-app
   npm install
   ```

## Exécution de l'application

L'architecture du projet a été conçue pour fonctionner dans différents environnements (développement local, extension Chrome, production, Replit) avec une configuration automatique.

> **NOUVEAU !** Un système de configuration automatique a été implémenté pour faciliter le déploiement dans différents environnements. Pour plus de détails, consultez [README_CONFIG.md](README_CONFIG.md).
>
> ✅ **VALIDATION DÉPLOIEMENT (03/04/2025) :** Le déploiement a été validé et fonctionne correctement à la fois sur Replit et en local. La stabilité des services a été confirmée lors de tests de redémarrage. Pour des instructions détaillées sur le déploiement et les résultats des tests, consultez le [Guide de Déploiement](./README_DEPLOYMENT.md).

### Architecture des environnements

Le projet utilise un système de configurations d'environnement multiples :

| Environnement         | Fichier de configuration              | Usage                                                |
|-----------------------|---------------------------------------|------------------------------------------------------|
| Développement         | environment.ts                        | Développement standard                               |
| Local                 | environment.local.ts                  | Développement local sans extension                   |
| Local Extension       | environment.local-extension.ts        | Développement local avec extension Chrome            |
| Replit                | environment.replit.ts                 | Environnement de développement sur Replit            |
| Production            | environment.prod.ts                   | Application web en production                        |
| Production Extension  | environment.prod-extension.ts         | Extension Chrome en production                       |

### Exécution simplifiée (Nouvelle méthode recommandée)

#### Configuration de l'environnement (sans démarrer l'application)

**Windows**:
```
configure-extension-app.bat
```

**Linux/MacOS/Replit**:
```
node configure-angular-app.js --config-only
```

#### Démarrage de l'application

Dans tous les environnements (détection automatique) :
```
cd connect-extension-app
npm start
```

Ou avec le script de détection global :
```
node detect-env-and-serve.js
```

### Exécution manuelle (Méthode traditionnelle)

#### Backend

```
cd connect-api
dotnet run --urls=http://localhost:8000 --environment Development
```

Le serveur backend sera disponible sur `http://localhost:8000`

#### Application Angular pour l'extension (version navigateur)

```
cd connect-extension-app
ng serve --host localhost --port 5000 --disable-host-check --proxy-config proxy.conf.json
```

L'application pour l'extension sera disponible sur `http://localhost:5000`

#### Application Web pour les consultants et recruteurs

```
cd connect-web-app
ng serve --configuration=local --host localhost --port 5001 --disable-host-check
```

L'application web principale sera disponible sur `http://localhost:5001`

### ⚠️ Configuration des adresses pour le développement local et Replit ⚠️

> **IMPORTANT**: Il existe une différence critique dans les configurations d'adresses entre le développement local et l'environnement Replit.

#### Développement local

Pour le développement local, toujours utiliser `localhost` comme hôte et dans les URLs d'API:

- **Fichiers d'environnement**: `apiUrl: 'http://localhost:8000/api'`
- **Configuration du proxy**: `"target": "http://localhost:8000"`
- **Scripts Angular**: `--host localhost`
- **API Backend**: `dotnet run --urls=http://localhost:8000`

#### Environnement Replit

Pour l'environnement Replit, toujours utiliser `0.0.0.0` comme hôte et dans les URLs d'API:

- **Fichiers d'environnement**: `apiUrl: 'http://0.0.0.0:8000/api'`
- **Configuration du proxy**: `"target": "http://0.0.0.0:8000"`
- **Scripts Angular**: `--host 0.0.0.0`
- **API Backend**: `dotnet run --urls=http://0.0.0.0:8000`

**Ne modifiez jamais ces configurations sans tester dans les deux environnements pour éviter les régressions.**

### Structure des scripts de déploiement

Pour faciliter le déploiement et la maintenance du projet, les scripts utilitaires ont été organisés dans un répertoire dédié :

```
connect-deployment/
├── generate-extension-local.bat    # Génération de l'extension en mode local (Windows)
├── generate-extension-local.js     # Script Node.js pour la génération locale
├── generate-extension-prod.bat     # Génération de l'extension en mode production (Windows)
├── generate-extension-prod.js      # Script Node.js pour la génération production
├── start-api.bat                   # Démarrage de l'API backend en local
└── test-api.js                     # Script de test de connectivité avec l'API
```

Ces scripts sont conçus pour être utilisés lors des différentes phases de déploiement et de test du projet.

### Génération de l'extension Chrome

#### Génération en mode local

Pour générer l'extension Chrome avec la configuration adaptée au développement local :

```bash
# Méthode recommandée (Windows)
connect-deployment/generate-extension-local.bat

# Alternative avec Node.js directement
node connect-deployment/generate-extension-local.js
```

Cette commande :
1. Compile l'application Angular avec la configuration `local-extension`
2. Copie les fichiers du build dans le répertoire `connect-extension-dist`
3. Ajoute les fichiers spécifiques de l'extension (manifest.json, background.js, etc.)
4. Met à jour les références dans sidebar.html

L'extension générée utilisera les URLs avec `localhost` et est prête à être chargée dans Chrome pour le développement local.

#### Génération en mode production

Pour générer l'extension Chrome avec la configuration de production :

```bash
# Méthode recommandée (Windows)
connect-deployment/generate-extension-prod.bat

# Alternative avec Node.js directement
node connect-deployment/generate-extension-prod.js
```

Cette version de l'extension est optimisée pour la distribution et utilisera les URLs de production.

#### Différentes méthodes de génération d'extension

| Script | Configuration | Environnement | URLs |
|--------|---------------|---------------|------|
| `connect-deployment/generate-extension-local.js` | local-extension | Développement local | http://localhost:8000 |
| `connect-deployment/generate-extension-prod.js` | production | Production | URLs de production |
| `generate-extension.js` | - | Utilise l'application en cours d'exécution | Dépend du contexte |

### Démarrage de l'API backend

Pour démarrer l'API backend avec les paramètres corrects pour le développement local :

```bash
connect-deployment/start-api.bat
```

Cette commande lance l'API avec les paramètres suivants :
```
dotnet run --urls=http://localhost:8000 --environment Development
```

### Test de connectivité avec l'API

Pour vérifier rapidement si l'API backend est accessible :

```bash
node connect-deployment/test-api.js
```

Ce script tentera de se connecter à l'API sur l'URL http://localhost:8000/api/consultants et affichera le résultat ou les erreurs rencontrées.

### Exécution dans l'environnement Replit

#### Backend

```
cd connect-api
dotnet run --urls=http://0.0.0.0:8000
```

#### Application Angular (avec proxy)

```
cd connect-extension-app
ng serve --configuration=replit --host 0.0.0.0 --port 5000 --disable-host-check --proxy-config proxy.conf.json
```

### Exécution avec l'extension Chrome en mode développement

```
cd connect-extension-app
ng serve --configuration=local-extension --host 0.0.0.0 --port 5000 --disable-host-check
```

Puis générer l'extension comme décrit dans la section "Génération de l'extension Chrome".

## Génération de l'extension Chrome

Deux méthodes de génération sont disponibles : mode développement (plus rapide) ou mode production (optimisé).

### Méthode 1 : Mode Développement (RECOMMANDÉ POUR LE DÉVELOPPEMENT)

Cette méthode est idéale pendant le développement car elle est rapide et ne nécessite pas de recompiler l'application à chaque changement.

1. Assurez-vous que l'application Angular pour l'extension est en cours d'exécution :
   ```
   cd connect-extension-app
   ng serve --host 0.0.0.0 --port 5000 --disable-host-check
   ```

2. Dans un autre terminal, exécutez simplement la commande suivante à la racine du projet :
   ```
   connect-deployment/generate-extension-local.bat
   ```
   
   Ou utilisez le script JavaScript directement :
   ```
   node connect-deployment/generate-extension-local.js
   ```

3. C'est tout ! Le script :
   - Vérifiera que le serveur Angular est en cours d'exécution
   - Téléchargera les fichiers directement depuis le serveur de développement
   - Générera l'extension dans le répertoire `connect-extension-dist/`
   - Affichera les instructions pour l'installation

### Méthode 2 : Mode Production (RECOMMANDÉ POUR LA DISTRIBUTION)

Cette méthode est idéale pour générer une version optimisée et minimisée de l'extension pour la distribution.

1. Exécutez simplement la commande suivante à la racine du projet :
   ```
   connect-deployment/generate-extension-prod.bat
   ```
   
   Ou utilisez le script JavaScript directement :
   ```
   node connect-deployment/generate-extension-prod.js
   ```

2. Le script :
   - Lancera la compilation Angular en mode production
   - Copiera les fichiers compilés vers le répertoire de l'extension
   - Ajustera automatiquement les références aux fichiers avec hash dans le HTML
   - Générera l'extension prête à la distribution dans le répertoire `connect-extension-dist/`

### Scripts spécifiques à la plateforme

Pour plus de commodité, des scripts spécifiques à chaque plateforme sont également disponibles :

#### Windows
- Mode Développement : `connect-deployment/generate-extension-local.bat`
- Mode Production : `connect-deployment/generate-extension-prod.bat`

#### Linux/macOS
- Mode Développement : `./connect-deployment/generate-extension-local.sh`
- Mode Production : `./connect-deployment/generate-extension-prod.sh`

#### PowerShell (Windows)
- Mode Développement : `./connect-deployment/generate-extension-local.ps1`
- Il existe également une version PowerShell détaillée qui fournit des instructions plus précises.

### Quand utiliser quelle méthode ?

- **Mode Développement** : Pendant le développement, pour des tests rapides et fréquents. Nécessite que le serveur Angular soit en cours d'exécution.
- **Mode Production** : Pour la distribution finale de l'extension. Génère un bundle optimisé et minimisé, sans dépendance à un serveur en cours d'exécution.

## Installation de l'extension dans Chrome

1. Ouvrir Chrome et accéder à `chrome://extensions/`
2. Activer le "Mode développeur" en haut à droite
3. Cliquer sur "Charger l'extension non empaquetée"
4. Sélectionner le répertoire `connect-extension-dist/`

## Utilisation de l'extension

1. Cliquer sur l'icône de l'extension dans la barre d'outils de Chrome
2. Le panneau latéral s'ouvrira, affichant la liste des consultants
3. Utiliser les filtres pour trouver les consultants selon vos critères

## Comptes de test

Les comptes de test suivants sont disponibles pour se connecter à l'application :

| Email | Mot de passe | Rôle |
|-------|-------------|------|
| admin@fastconnect.com | admin123 | Administrateur |
| consultant@fastconnect.com | consultant123 | Consultant |
| recruiter@fastconnect.com | recruiter123 | Recruteur |

## Fonctionnalités

- Affichage des consultants disponibles
- Filtrage par compétences, niveau d'expérience, disponibilité et localisation
- Vue détaillée des informations du consultant
- Contact direct via LinkedIn, email ou téléphone (si disponible)
- Système d'authentification complet avec :
  - Modal de connexion intégré (sans navigation vers une page séparée)
  - Possibilité de connexion par email/mot de passe
  - Préparation pour connexion via Google et LinkedIn (en cours)
  - Jetons JWT pour l'authentification sécurisée
  - Protection des routes selon le rôle utilisateur (auth guards)

## Développement

Le projet utilise une architecture modulaire avec trois composants principaux :

### 1. Application Web principale (`connect-web-app/`)
- Application Angular complète pour les consultants et recruteurs
- Interface pour mettre à jour les disponibilités des consultants
- Interface pour les recruteurs pour consulter la liste des consultants disponibles
- Partage les modèles de données et services avec l'application de l'extension

### 2. Application Angular pour l'extension (`connect-extension-app/`)
- Version navigateur de l'extension 
- Contient les composants consultant-list et consultant-card
- Utilise l'architecture de composants autonomes (standalone)
- Fonctionne en mode standalone sans nécessiter l'extension Chrome
- Peut être testée directement dans un navigateur

#### Architecture des composants Angular
L'application utilise des composants Angular autonomes (standalone), une fonctionnalité introduite depuis Angular 14 :
- Les composants sont déclarés avec `standalone: true` dans leur décorateur `@Component`
- Ils importent directement leurs dépendances (CommonModule, FormsModule, etc.)
- Dans le module principal (AppModule), ces composants sont ajoutés à la section `imports` et non à `declarations`
- Cette architecture permet une meilleure modularité et facilite le lazy-loading

### 3. Extension Chrome (`connect-extension-chrome/` et `connect-extension-dist/`)
- Fichiers spécifiques à l'extension Chrome (manifest.json, background.js, etc.)
- Intégration avec l'API Chrome pour afficher le panneau latéral
- Utilise les composants Angular compilés
- Le répertoire `connect-extension-dist/` est généré automatiquement

### Backend commun (`connect-api/`)
- API .NET Core partagée entre l'application web et l'extension
- Gestion des données des consultants
- API REST pour récupérer et filtrer les consultants

Les données des consultants sont gérées par le backend et consommées par les deux applications frontend.

Le workflow de développement typique consiste à :
1. Développer et tester les fonctionnalités dans l'application Angular (`connect-extension-app/`)
2. Générer l'extension avec la commande simple `connect-deployment/generate-extension-local.bat`
3. Tester l'extension dans Chrome

## Architecture des environnements et déploiement

### Configurations d'environnement

Le projet utilise plusieurs fichiers de configuration pour s'adapter aux différents environnements :

#### 1. Fichiers d'environnement Angular

| Fichier | Description | API URL | isExtension | Production |
|---------|-------------|---------|-------------|------------|
| `environment.ts` | Développement par défaut | http://0.0.0.0:8000/api | Auto-détection | Non |
| `environment.local.ts` | Développement local | http://localhost:8000/api | Non | Non |
| `environment.local-extension.ts` | Extension locale | http://localhost:8000/api | Oui | Non |
| `environment.replit.ts` | Environnement Replit | /api (proxy) | Non | Non |
| `environment.prod.ts` | Production | https://api.fastconnect.io/api | Auto-détection | Oui |
| `environment.prod-extension.ts` | Extension en production | https://api.fastconnect.io/api | Oui | Oui |

#### 2. Configuration Angular (angular.json)

Le fichier `angular.json` a été configuré pour supporter différentes configurations de build et de serve :

```json
"configurations": {
  "production": { ... },
  "local": { ... },
  "local-extension": { ... },
  "replit": { ... },
  "prod-extension": { ... }
}
```

Chaque configuration remplace `environment.ts` par le fichier d'environnement approprié et définit les options d'optimisation, de minification et de débogage.

#### 3. Configuration du proxy pour Replit (proxy.conf.json)

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

### Guide de déploiement et lancement

#### Environnement local (développement)

**Préparation initiale :**
1. Assurez-vous que .NET Core 7.0 est installé : `dotnet --version`
2. Vérifiez que Node.js est installé (v20+) : `node --version`
3. Installez Angular CLI globalement : `npm install -g @angular/cli`
4. Installez les dépendances du projet :
   ```bash
   cd connect-extension-app && npm install
   cd connect-web-app && npm install
   ```

**Lancement de l'application :**
1. Démarrer le backend :
   ```bash
   cd connect-api
   dotnet run --urls=http://0.0.0.0:8000
   ```
2. Démarrer le frontend (dans un autre terminal) :
   ```bash
   cd connect-extension-app
   ng serve --configuration=local --host 0.0.0.0 --port 5000 --disable-host-check
   ```
3. Pour tester l'extension Chrome :
   ```bash
   # À la racine du projet
   connect-deployment/generate-extension-local.bat
   ```
   Puis installez l'extension dans Chrome depuis le dossier `connect-extension-dist`

**Accès à l'application :**
- Frontend principal : http://localhost:5000
- API backend : http://localhost:8000/api
- Web app pour consultants/recruteurs : http://localhost:5001 (quand implémentée)

#### Environnement Replit

**Préparation initiale :**
1. Assurez-vous que tous les fichiers sont synchronisés avec le dépôt Git
2. Configurez les workflows pour le backend et le frontend

**Configuration des workflows :**
1. Workflow Backend API :
   - Nom : "Connect API"
   - Commande : `cd connect-api && dotnet run --urls=http://0.0.0.0:8000`
   - Port : 8000

2. Workflow Frontend Angular :
   - Nom : "Angular Frontend"
   - Commande : `cd connect-extension-app && ng serve --host 0.0.0.0 --port 5000 --disable-host-check --proxy-config proxy.conf.json --configuration=replit`
   - Port : 5000

**Lancement de l'application :**
1. Démarrez le workflow Backend API
2. Démarrez le workflow Angular Frontend
3. L'application sera accessible via l'URL de prévisualisation Replit

**Points importants :**
- Le proxy est crucial dans l'environnement Replit pour contourner les restrictions CORS
- L'URL de l'API dans `environment.replit.ts` doit être configurée comme `/api` pour utiliser le proxy
- Les workflows doivent être relancés après modification des fichiers de configuration

#### Environnement de production

**Préparation du build :**
1. Configurez les variables d'environnement de production :
   - Vérifiez `environment.prod.ts` et `environment.prod-extension.ts`
   - Mettez à jour les URLs de l'API avec votre domaine de production

**Build et déploiement :**
1. Build du backend :
   ```bash
   cd connect-api
   dotnet publish -c Release -o ./publish
   ```

2. Build du frontend web :
   ```bash
   cd connect-extension-app
   ng build --configuration=production
   ```

3. Build de l'extension Chrome :
   ```bash
   # À la racine du projet
   connect-deployment/generate-extension-prod.bat
   ```

**Déploiement sur serveur :**
1. Déployez le dossier `connect-api/publish` sur votre serveur web (.NET)
2. Déployez le dossier `connect-extension-app/dist` sur votre serveur web statique
3. Configurez le serveur web pour rediriger les requêtes `/api/*` vers le backend
4. Soumettez le dossier `connect-extension-dist` au Chrome Web Store Developer Dashboard

**Configuration serveur nginx (exemple) :**
```nginx
server {
    listen 80;
    server_name votredomaine.com;

    location / {
        root /chemin/vers/connect-extension-app/dist;
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Automatisation CI/CD (suggestions) :**
- Utilisez GitHub Actions pour automatiser les builds et déploiements
- Configurez des workflows séparés pour le backend et le frontend
- Incluez des tests automatisés avant le déploiement

### Architecture client-serveur

Le projet a été restructuré pour utiliser une architecture complètement séparée entre frontend et backend :

1. **Frontend** (Angular)
   - Serveur de développement sur le port 5000
   - Utilise les appels API via HttpClient
   - S'adapte automatiquement à différents environnements
   - Service ApiService pour gérer les URL d'API de manière centralisée

2. **Backend** (.NET Core)
   - API RESTful sur le port 8000
   - CORS configuré pour accepter les requêtes du frontend
   - Logging avancé des requêtes/réponses avec RequestResponseLoggingMiddleware
   - Authentification JWT

3. **Communication**
   - En développement : Communication directe ou via proxy
   - En production : Communication via API RESTful sécurisée

## Nouvelles fonctionnalités de l'extension Chrome (28/04/2025)

### Interface Utilisateur Améliorée
- **Poignée de redimensionnement optimisée** : Visuellement distincte avec des transitions fluides et retour visuel amélioré
- **Badge de notifications** : Affichage animé du nombre de notifications sur le bouton FC
- **Animation interactive** : Effet subtil d'agrandissement au survol du bouton FC

### Optimisations Techniques
- **Résolution des conflits de défilement** : Isolation complète du défilement entre LinkedIn et le panneau FastConnect
- **Initialisation unique garantie** : Système multi-couches empêchant les initialisations multiples
- **Support des transitions AJAX** : Maintien de l'extension active pendant la navigation LinkedIn sans rechargement
- **Persistence des préférences** : Mémorisation de la largeur du panneau entre les sessions

Pour plus de détails, consultez le [README de l'extension Chrome](./connect-extension-chrome/README.md).

## Problèmes courants et solutions

### Problème : Composants Angular standalone non affichés
**Symptôme** : L'application Angular ne montre rien ou génère des erreurs du type "Component is standalone, and cannot be declared in an NgModule"  
**Solution** : 
- Vérifier que les composants standalone sont correctement importés (et non déclarés) dans app.module.ts
- Les composants standalone doivent être dans le tableau "imports" et non dans "declarations"

### Problème : Extension non visible dans Chrome
**Symptôme** : Après l'installation, l'extension n'apparaît pas ou ne fonctionne pas correctement  
**Solution** :
- Vérifier que le manifest.json est correctement configuré avec les bonnes permissions
- Vérifier la console du développeur dans Chrome pour identifier les erreurs potentielles
- Régénérer l'extension avec `connect-deployment/generate-extension-prod.bat` pour obtenir une version optimisée

### Problème : API backend non accessible
**Symptôme** : Erreurs CORS ou erreurs de connexion à l'API  
**Solution** :
- Vérifier que l'API backend .NET est en cours d'exécution sur le port 8000
- Vérifier que l'URL de l'API est correctement configurée dans le fichier d'environnement utilisé
- S'assurer que le proxy est correctement configuré pour l'environnement Replit

### Problème : Erreurs dans l'environnement Replit
**Symptôme** : Erreurs de connexion ou problèmes CORS spécifiques à Replit  
**Solution** :
- Vérifier que les deux workflows sont en cours d'exécution (Backend API et Angular Frontend)
- S'assurer que le backend utilise `--urls=http://0.0.0.0:8000` pour être accessible
- Utiliser la configuration Replit avec `--proxy-config proxy.conf.json`
- Redémarrer les workflows si des modifications ont été apportées aux fichiers de configuration

### Problème : Interface mobile non optimisée ou incohérente
**Symptôme** : Affichage incorrect sur mobile, tri non fonctionnel ou incohérence de design avec la version desktop  
**Solution** :
- Vérifier les classes CSS responsives dans les templates HTML (`md:hidden`, `block md:hidden`, etc.)
- S'assurer que les méthodes de tri dans le composant consultant-list sont correctement liées aux événements
- Utiliser les mêmes schémas de couleurs et styles que la version desktop pour la cohérence visuelle

### Problème : Application blanche ou erreurs 404 au démarrage
**Symptôme** : L'application affiche une page blanche ou les requêtes API retournent 404  
**Solution** :
- Vérifier que les deux services (frontend et backend) sont bien en cours d'exécution
- Dans la console du navigateur, vérifier qu'il n'y a pas d'erreurs JavaScript
- Attendre la fin complète du build Angular (peut prendre jusqu'à 30 secondes)
- Si le problème persiste, redémarrer les workflows dans Replit

### Problème : Erreurs de build extension
**Symptôme** : Erreurs lors de la génération de l'extension Chrome avec les scripts  
**Solution** :
- Si vous utilisez `connect-deployment/generate-extension-local.js`, vérifiez que l'application Angular est en cours d'exécution
- Si vous utilisez `connect-deployment/generate-extension-prod.js`, vérifiez que Node.js dispose de suffisamment de mémoire
- En cas d'erreur "Memory allocation failed", exécutez `export NODE_OPTIONS=--max_old_space_size=4096`
- Sur Replit, utilisez `connect-deployment/generate-extension-prod.js` car il ne nécessite pas le serveur de développement

## Licence

Tous droits réservés.