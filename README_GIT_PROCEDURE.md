# FastConnect - Procédures Git

Ce document recense les commandes Git couramment utilisées dans le projet FastConnect, avec des explications et des exemples concrets. Il sert de référence et d'outil d'apprentissage pour l'équipe.

## Table des matières
1. [Commandes basiques](#commandes-basiques)
2. [Navigation entre branches](#navigation-entre-branches)
3. [Synchronisation avec le dépôt distant](#synchronisation-avec-le-dépôt-distant)
4. [Gestion des modifications](#gestion-des-modifications)
5. [Gestion des branches](#gestion-des-branches)
6. [Résolution de conflits](#résolution-de-conflits)
7. [Bonnes pratiques](#bonnes-pratiques)

## Commandes basiques

### Vérifier l'état du dépôt
```bash
git status
```
Cette commande affiche l'état actuel du dépôt, les fichiers modifiés, ajoutés ou supprimés, ainsi que la branche actuelle.

### Voir l'historique des commits
```bash
# Historique simple
git log

# Historique avec graphique des branches
git log --graph --oneline --all
```

### Voir les différences
```bash
# Différences dans les fichiers modifiés non indexés
git diff

# Différences dans les fichiers indexés
git diff --staged
```

## Navigation entre branches

### Vérifier la branche actuelle
```bash
git branch
```
La branche actuelle est marquée d'un astérisque (*).

### Lister toutes les branches (locales et distantes)
```bash
git branch -a
```

Exemple de sortie:
```
* feature/adaptation_chrome
  Develop
  remotes/origin/Develop
  remotes/origin/feature/adaptation_chrome
  remotes/origin/feature/authentification
```

### Changer de branche
```bash
git checkout Develop
```

### Créer et changer vers une nouvelle branche
```bash
git checkout -b feature/nouvelle-fonctionnalite
```

## Synchronisation avec le dépôt distant

### Récupérer les dernières modifications sans fusionner
```bash
git fetch
```

### Récupérer les dernières modifications d'une branche distante
```bash
# Récupérer et fusionner les modifications
git pull

# Récupérer d'une branche spécifique
git pull origin feature/adaptation_chrome
```

### Exemple concret dans FastConnect
Pour mettre à jour la branche locale `feature/adaptation_chrome` avec les modifications distantes:
```bash
git checkout feature/adaptation_chrome
git fetch origin
git pull origin feature/adaptation_chrome
```

### Pousser les modifications vers le dépôt distant
```bash
# Pousser vers la branche actuelle
git push

# Pousser vers une branche spécifique
git push origin feature/adaptation_chrome
```

### Configurer le suivi d'une branche distante
Si vous obtenez une erreur du type "no upstream branch", vous devez configurer le suivi:
```bash
git branch --set-upstream-to=origin/feature/adaptation_chrome feature/adaptation_chrome
```

Exemple utilisé dans FastConnect pour établir le lien avec la branche distante:
```bash
git branch --set-upstream-to=origin/feature/adaptation_chrome feature/adaptation_chrome
```

## Gestion des modifications

### Indexer des modifications
```bash
# Indexer un fichier spécifique
git add README.md

# Indexer tous les fichiers modifiés
git add .

# Indexer des parties spécifiques d'un fichier (mode interactif)
git add -p
```

### Créer un commit
```bash
git commit -m "Refactor: Move deployment scripts to connect-deployment directory"
```

Bonnes pratiques pour les messages de commit:
- Utiliser un préfixe indiquant le type de changement (Fix, Feature, Refactor, Docs, etc.)
- Écrire un message clair et concis (idéalement en anglais)
- Ajouter des détails supplémentaires après une ligne vide si nécessaire

### Modifier le dernier commit
```bash
# Modifier le message
git commit --amend -m "Nouveau message"

# Ajouter des fichiers oubliés au dernier commit
git add fichier_oublie.js
git commit --amend --no-edit
```

### Annuler des modifications
```bash
# Annuler les modifications non indexées
git restore fichier.js

# Désindexer des modifications (sans les perdre)
git restore --staged fichier.js

# Revenir à un commit spécifique (attention: destructif!)
git reset --hard a1b2c3d4
```

## Gestion des branches

### Fusionner une branche
```bash
# Se placer sur la branche de destination
git checkout Develop

# Fusionner la branche source
git merge feature/adaptation_chrome
```

### Supprimer une branche
```bash
# Supprimer une branche locale (après fusion)
git branch -d feature/terminee

# Forcer la suppression (même si non fusionnée)
git branch -D feature/abandonnee

# Supprimer une branche distante
git push origin --delete feature/terminee
```

## Résolution de conflits

Lorsqu'un conflit survient lors d'une fusion ou d'un pull, Git marque les fichiers conflictuels avec des marqueurs spéciaux.

### Étapes de résolution:
1. Identifiez les fichiers en conflit avec `git status`
2. Ouvrez les fichiers et cherchez les marqueurs de conflit (`<<<<<<<`, `=======`, `>>>>>>>`)
3. Modifiez les fichiers pour résoudre les conflits
4. Indexez les fichiers résolus avec `git add`
5. Terminez la fusion avec `git commit`

### Exemple de résolution:
```bash
git pull origin Develop  # Conflit détecté
# Éditer les fichiers pour résoudre les conflits
git add README.md        # Marquer comme résolu
git commit               # Terminer la fusion
```

### Abandonner une fusion conflictuelle
```bash
git merge --abort
```

## Bonnes pratiques

### Structure de branches pour FastConnect
- `main` : Code en production
- `Develop` : Branche de développement principale
- `feature/xxx` : Branches de fonctionnalités (ex: `feature/adaptation_chrome`)
- `fix/xxx` : Branches pour corriger des bugs

### Procédure de travail recommandée
1. Mettre à jour la branche de base
   ```bash
   git checkout Develop
   git pull
   ```
2. Créer une branche de fonctionnalité
   ```bash
   git checkout -b feature/nouvelle-fonctionnalite
   ```
3. Faire des commits réguliers
   ```bash
   # Travailler sur des fichiers...
   git add .
   git commit -m "Feature: Implement consultant card component"
   ```
4. Pousser la branche (pour sauvegarder ou partager)
   ```bash
   git push -u origin feature/nouvelle-fonctionnalite
   ```
5. Créer une Pull Request lorsque la fonctionnalité est terminée

### Commandes utiles pour FastConnect
```bash
# Vérifier rapidement l'état du projet
git status

# Basculer vers la branche de travail extension Chrome
git checkout feature/adaptation_chrome

# Mettre à jour avec les dernières modifications distantes
git pull origin feature/adaptation_chrome

# Commit avec convention de nommage
git commit -m "Fix: Resolve Angular proxy issues with localhost configuration"

# Push vers le dépôt distant
git push origin feature/adaptation_chrome
```

---

Ce guide évolue au fur et à mesure que nous utilisons de nouvelles commandes Git dans le cadre du projet FastConnect.
