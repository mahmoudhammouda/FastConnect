# FastConnect - Change Log

Ce document recense les modifications significatives apportées au projet FastConnect, avec les détails des commits, branches, et explications des changements.

## 2025-04-06

### Commits: "Amélioration du design mobile avec optimisation de l'UI/UX des cartes consultant et correction du tri mobile" et "Amélioration des couleurs en mode mobile pour correspondre au mode desktop"

**Branche**: `feature/enhance_consultant_page`

**Description**: Refonte complète de l'interface mobile pour améliorer l'expérience utilisateur et assurer la cohérence visuelle avec la version desktop.

**Modifications**:
1. **Consultant Card Component (Mobile Design)**:
   - Refonte de la mise en page mobile pour ressembler davantage à la version desktop
   - Ajout d'un effet d'overlay pour les messages tronqués (similaire à la version desktop)
   - Optimisation de la disposition pour afficher l'indicateur de séniorité et les mots-clés associés ensemble
   - Suppression des sections redondantes pour les compétences afin d'éviter les doublons
   - Implémentation d'un bouton "Voir plus" pour développer le contenu du message, remplaçant l'ancien bouton "Lire message"
   - Harmonisation des couleurs avec la version desktop pour une meilleure cohérence visuelle

2. **Consultant List Component**:
   - Correction de la fonctionnalité du menu déroulant de tri en vue mobile
   - Ajout de méthodes pour gérer les interactions avec le menu déroulant (basculer et sélectionner les options de tri)
   - Mise en place d'une fermeture automatique du menu déroulant lors d'un clic à l'extérieur

**Problèmes résolus**:
- Incohérence visuelle entre les versions mobile et desktop
- Menu de tri non fonctionnel en mode mobile
- Duplication des fonctions dans le composant consultant-list
- Mauvaise gestion de l'affichage des messages longs sur mobile
- Contraste insuffisant et problèmes d'accessibilité sur certains éléments

**Implications techniques**:
- Utilisation optimisée des classes Tailwind CSS pour le responsive design
- Correction de la duplication de code dans les méthodes Javascript
- Harmonisation des schémas de couleurs entre les différentes vues
- Amélioration de l'accessibilité par un meilleur contraste des textes

## 2025-04-03

### Validation: "Test de stabilité des workflows Replit et communication API"

**Description**: Vérification complète de la stabilité et fiabilité du déploiement sur Replit, avec tests de redémarrage des services.

**Modifications**:
1. **Tests approfondis de redémarrage**:
   - Validation du redémarrage individuel du workflow Connect API
   - Validation du redémarrage individuel du workflow Angular Frontend
   - Validation du redémarrage simultané des deux workflows
   - Confirmation de la détection automatique de l'environnement Replit par le script set-environment.js

2. **Améliorations de la documentation**:
   - Mise à jour du README_DEPLOYMENT.md avec les résultats des tests
   - Ajout d'une section détaillée sur les tests de fiabilité et redémarrages
   - Ajout d'une date de dernière validation du déploiement

3. **Vérification de la communication API**:
   - Confirmation du fonctionnement du proxy Angular vers l'API backend
   - Vérification de la récupération des données consultants via l'API
   - Tests de performance des appels API après redémarrage

**Résultats des tests**:
- Temps moyen de redémarrage de l'API .NET Core: ~5 secondes
- Temps moyen de redémarrage et compilation Angular: ~7-10 secondes
- Stabilité du processus de détection d'environnement: 100% (aucune erreur)
- Communication API après redémarrage: Fonctionnelle, sans intervention manuelle

**Implications techniques**:
- La configuration actuelle est robuste et tolérante aux redémarrages
- Le système de détection d'environnement automatique fonctionne parfaitement
- La stratégie de proxy pour la communication API est fiable et sans défaillance
- L'architecture globale est validée pour un déploiement en production

## 2025-04-02 (Suite)

### Modification: "Fix: Corrected Angular environment configuration to properly communicate with API"

**Description**: Correction des problèmes de communication entre l'application Angular frontend et l'API backend sur Replit.

**Modifications**:
1. **Mise à jour du fichier d'environnement par défaut**:
   - Modification de `environment.ts` pour utiliser le proxy Angular avec `/api` au lieu de l'URL complète
   - Ajout d'informations de débogage dans l'objet `debugInfo`

2. **Amélioration du composant de liste des consultants**:
   - Ajout de logs détaillés dans `consultant-list.component.ts` pour faciliter le diagnostic
   - Mise à jour du format des messages de log pour une meilleure traçabilité

3. **Mise à jour de la configuration des workflows Replit**:
   - Amélioration de la configuration pour garantir le redémarrage correct des services

**Problèmes résolus**:
- Communication défaillante entre le frontend Angular et l'API backend sur Replit
- Manque de logs pour diagnostiquer les problèmes de rendu du composant consultant-list
- Utilisateur maintenant capable de se connecter avec les identifiants de test et d'accéder aux données de consultants

**Détails techniques**:
- L'application Angular utilise désormais le proxy configuré dans `proxy.conf.json` pour communiquer avec l'API
- Le proxy redirige les requêtes `/api/*` vers le serveur backend sans exposer l'URL complète
- La configuration d'environnement a été standardisée avec le modèle de Replit pour une meilleure compatibilité

## 2025-04-02

### Commit: "Refactor: Move deployment scripts to connect-deployment directory for better organization"

**Branche**: `feature/adaptation_chrome`

**Description**: Réorganisation des scripts de déploiement dans un répertoire dédié pour améliorer la structure du projet et la maintenance.

**Modifications**:
- Création du répertoire `connect-deployment` pour centraliser tous les scripts de déploiement et utilitaires
- Déplacement des scripts suivants dans le nouveau répertoire:
  - `generate-extension-local.bat` -> `connect-deployment/generate-extension-local.bat`
  - `generate-extension-local.js` -> `connect-deployment/generate-extension-local.js`
  - `generate-extension-prod.bat` -> `connect-deployment/generate-extension-prod.bat`
  - `generate-extension-prod.js` -> `connect-deployment/generate-extension-prod.js`
  - `start-api.bat` -> `connect-deployment/start-api.bat`
  - `test-api.js` -> `connect-deployment/test-api.js`
- Suppression des scripts obsolètes:
  - `generate-extension-prod` (sans extension)
  - `generate-extension-prod.sh`
- Mise à jour complète du README pour refléter la nouvelle structure avec les chemins corrects
- Ajout d'une section dans le README décrivant l'organisation des scripts de déploiement

**Justification**:
Cette réorganisation s'aligne sur la convention de nommage du projet (connect-extension-app, connect-api, etc.) et améliore la lisibilité de la racine du projet en isolant les scripts de déploiement dans un répertoire dédié.

### Commit: "Fix: Chrome extension configuration for local development and proxy issues"

**Branche**: `feature/adaptation_chrome`

**Description**: Correction des problèmes de communication entre l'application Angular et l'API backend, particulièrement lors du développement local.

**Modifications**:
1. **Correction des problèmes de proxy Angular**:
   - Modification du fichier `proxy.conf.json` pour utiliser `localhost` au lieu de `0.0.0.0`
   - Mise à jour du script de démarrage dans `package.json` pour utiliser l'hôte `localhost`
   - Correction de l'URL de l'API dans `environment.ts` pour utiliser `localhost:8000` au lieu de `0.0.0.0:8000`

2. **Correction des problèmes d'Angular**:
   - Modification du fichier `angular.json` pour utiliser `browserTarget` au lieu de `buildTarget` pour résoudre une erreur de schéma
   - Ajustement des configurations d'hôte et d'adresse dans les scripts Angular

3. **Nouveaux scripts de génération d'extension**:
   - Création de `generate-extension-local.js` pour la génération locale avec URLs localhost
   - Création de `start-api.bat` pour démarrer l'API backend avec les bons paramètres

4. **Améliorations de la documentation**:
   - Mise à jour du fichier `PROCESS_AND_CHALLENGES.md` avec documentation des problèmes et solutions
   - Ajout d'une section d'avertissement dans le README concernant les différences de configuration entre développement local et Replit
   - Documentation détaillée des différentes méthodes de génération d'extension

**Problèmes résolus**:
- Erreur de connexion ECONNREFUSED lors des appels API depuis Angular
- Erreur de schéma Angular "Data path must have required property 'browserTarget'"
- Incompatibilité de version .NET SDK (migré vers .NET 7.0)
- Configuration du certificat HTTPS pour le développement
- Accès à l'API par l'extension Chrome impossible (erreur ERR_FILE_NOT_FOUND)

**Détails techniques**:
- L'application Angular doit utiliser `localhost` pour le développement local
- L'environnement Replit doit continuer à utiliser `0.0.0.0`
- Les scripts de génération d'extension doivent utiliser la bonne configuration selon l'environnement

### Commit: "Docs: Improve project documentation with README files and rename PROCESS_AND_CHALLENGES.md"

**Branche**: `feature/adaptation_chrome`

**Description**: Enhancement of project documentation with new README files for better organization and knowledge sharing.

**Modifications**:
1. **File Renaming**:
   - Renamed `PROCESS_AND_CHALLENGES.md` to `README_CHALLENGE.md` for better consistency with other documentation files

2. **New Documentation Files**:
   - Created `README_CHANGE_LOG.md` to track all significant modifications with detailed explanations
   - Created `README_GIT_PROCEDURE.md` as a comprehensive guide for Git commands used in the project

3. **Documentation Improvements**:
   - Added detailed sections about Git workflow in the project
   - Documented common Git commands with specific examples for FastConnect
   - Created a complete history of project changes in the change log

**Justification**:
These documentation improvements are essential for:
- Better onboarding of new team members
- Knowledge retention about project decisions and challenges
- Ensuring consistent use of Git commands and workflows across the team
- Creating a historical record of all significant project changes

The standardized naming convention for README files makes it easier to locate specific documentation and maintains a clean organization of the project's documentation.

### À propos du système de déploiement

Le nouveau système de déploiement est organisé comme suit:

```
connect-deployment/
├── generate-extension-local.bat    # Génération extension en mode local (Windows)
├── generate-extension-local.js     # Script Node.js pour génération locale
├── generate-extension-prod.bat     # Génération extension en production (Windows)
├── generate-extension-prod.js      # Script Node.js pour génération production
├── start-api.bat                   # Démarrage API backend local
└── test-api.js                     # Test connectivité API
```
