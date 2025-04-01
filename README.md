# FastConnect

Extension Chrome et application web pour la découverte intelligente de consultants spécialisés.

## Structure du projet

- `connect-extension-app/` : Application Angular pour l'extension Chrome (version navigateur)
- `connect-extension-chrome/` : Fichiers spécifiques à l'extension Chrome (manifest, background, etc.)
- `connect-web-app/` : Application web principale pour les consultants et recruteurs
- `connect-api/` : API backend en .NET Core
- `connect-extension-dist/` : Répertoire de build pour l'extension Chrome (généré automatiquement, non suivi par git)

## Statut du projet

✅ Application Angular fonctionnelle avec composants autonomes (standalone)
✅ API .NET Core opérationnelle
✅ Scripts de génération d'extension pour le développement et la production
✅ Système d'authentification avec modal et JWT
🚧 En cours : Authentification avec Google et LinkedIn OAuth
🚧 En cours : Développement des fonctionnalités de filtrage avancées
🚧 En cours : Optimisation de l'affichage sur mobile

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

### Backend

```
cd connect-api
dotnet run
```

Le serveur backend sera disponible sur `http://localhost:8000`

### Application Angular pour l'extension (version navigateur)

```
cd connect-extension-app
ng serve --host 0.0.0.0 --port 5000 --disable-host-check
```

L'application pour l'extension sera disponible sur `http://localhost:5000`

### Application Web pour les consultants et recruteurs

```
cd connect-web-app
ng serve --host 0.0.0.0 --port 5001 --disable-host-check
```

L'application web principale sera disponible sur `http://localhost:5001`

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
   ./generate-extension
   ```
   
   Ou utilisez le script JavaScript directement :
   ```
   node generate-extension.js
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
   ./generate-extension-prod
   ```
   
   Ou utilisez le script JavaScript directement :
   ```
   node generate-extension-prod.js
   ```

2. Le script :
   - Lancera la compilation Angular en mode production
   - Copiera les fichiers compilés vers le répertoire de l'extension
   - Ajustera automatiquement les références aux fichiers avec hash dans le HTML
   - Générera l'extension prête à la distribution dans le répertoire `connect-extension-dist/`

### Scripts spécifiques à la plateforme

Pour plus de commodité, des scripts spécifiques à chaque plateforme sont également disponibles :

#### Windows
- Mode Développement : `generate-extension.bat`
- Mode Production : `generate-extension-prod.bat`

#### Linux/macOS
- Mode Développement : `./generate-extension.sh`
- Mode Production : `./generate-extension-prod.sh`

#### PowerShell (Windows)
- Mode Développement : `./generate-extension.ps1`
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
2. Générer l'extension avec la commande simple `./generate-extension`
3. Tester l'extension dans Chrome

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
- Régénérer l'extension avec `./generate-extension-prod` pour obtenir une version optimisée

### Problème : API backend non accessible
**Symptôme** : Erreurs CORS ou erreurs de connexion à l'API  
**Solution** :
- Vérifier que l'API backend .NET est en cours d'exécution sur le port 8000
- Vérifier que l'URL de l'API est correctement configurée dans environment.ts
- Configurer CORS correctement dans le backend pour autoriser les requêtes depuis l'extension

## Licence

Tous droits réservés.