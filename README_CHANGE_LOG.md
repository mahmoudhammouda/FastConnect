# FastConnect - Change Log

Ce document recense les modifications significatives apportées au projet FastConnect, avec les détails des commits, branches, et explications des changements.

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
