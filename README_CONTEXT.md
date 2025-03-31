# Contexte de l'application Connect Extension

## Description générale

Connect Extension est une solution avancée de découverte de consultants, conçue sous forme d'extension Chrome et d'application web. Elle permet aux recruteurs et aux entreprises de rechercher et d'entrer en contact avec des consultants spécialisés selon leurs compétences, disponibilités et localisations.

## Objectif principal

L'objectif de cette application est de faciliter la mise en relation entre les entreprises à la recherche d'expertise et les consultants disponibles, en proposant une interface intuitive, accessible directement depuis le navigateur Chrome via une extension ou depuis une application web complète.

## Architecture technique

Le projet est structuré en plusieurs composants interconnectés:

1. **Application Angular pour l'extension (connect-extension-app)**
   - Interface utilisateur de l'extension construite avec Angular
   - Utilise des composants autonomes (standalone)
   - Gère l'affichage des consultants et les fonctionnalités de filtrage
   - Techniquement indépendante, pouvant fonctionner comme application web autonome

2. **Extension Chrome (connect-extension-chrome)**
   - Intègre l'application Angular dans une extension Chrome
   - S'affiche comme un panneau latéral dans le navigateur
   - Utilise les API Chrome pour s'intégrer au navigateur
   - Le panneau s'ouvre depuis la droite vers la gauche

3. **Application Web principale (connect-web-app)**
   - Interface complète pour les consultants et les recruteurs
   - Permet aux consultants de mettre à jour leur disponibilité
   - Offre des fonctionnalités de gestion avancées pour les recruteurs

4. **API backend .NET Core (connect-api)**
   - Gère les données des consultants
   - Fournit des endpoints REST pour les applications frontend
   - Implémente la logique de filtrage et de recherche

5. **Script de génération (generate-extension.js et generate-extension-prod.js)**
   - Automatise la création de l'extension Chrome à partir de l'application Angular
   - Offre deux modes : développement (rapide) et production (optimisé)

## Fonctionnalités principales

### Interface de recherche de consultants
- Affichage des consultants sous forme de cartes interactives
- Chaque carte contient:
  - Identifiant unique et indicateur de verrouillage
  - Rôle/poste du consultant
  - Compétences techniques (skills)
  - Localisation géographique
  - Niveau d'expérience représenté par 1 à 3 barres verticales
  - Disponibilité indiquée par un code couleur
  - Message personnalisé du consultant avec hashtags
  - Boutons d'action pour contacter le consultant (LinkedIn, email, téléphone)
  - Section détaillée avec les expériences professionnelles

### Filtrage avancé
- Recherche textuelle globale
- Filtrage par niveau d'expérience (moins de 3 ans, entre 3 et 10 ans, plus de 10 ans)
- Filtrage par disponibilité (disponible maintenant, prochainement, non disponible)
- Filtrage par localisation avec support pour multiple localisations par consultant
- Filtrage par compétences (utilisant une logique AND - tous les critères doivent correspondre)

### Fonctionnalités spécifiques
- Le bouton "Plus de filtres" permet d'afficher/masquer les filtres supplémentaires en vue mobile
- Les hashtags dans les messages des consultants sont mis en évidence et cliquables
- Les messages longs peuvent être tronqués puis développés
- Design responsive avec optimisations pour mobile et desktop
- Infinite scrolling pour charger plus de consultants à la demande

### Intégration avec Chrome
- Affichage du panneau des consultants directement dans le navigateur
- Intégration avec l'API Chrome pour ouvrir des liens LinkedIn dans de nouveaux onglets
- Gestion des événements de clic spécifiques à l'extension

## Conception visuelle

L'interface utilisateur respecte les éléments visuels suivants:
- Utilisation de Tailwind CSS pour le design
- Style moderne avec transitions et effets de survol
- Affichage de la disponibilité par un code couleur:
  - Vert: disponible maintenant
  - Orange: disponible prochainement
  - Rouge: non disponible
- Niveau d'expérience représenté par des barres verticales (1-3) positionnées comme des indicateurs de signal WiFi
- Barre de recherche fixe en haut, avec les filtres supplémentaires en dessous
- Liste des consultants défilante sous la barre de recherche

### Comportement responsive

Le design s'adapte à différentes tailles d'écran:

**Sur écrans larges (desktop)**:
- Boutons d'action affichés directement à droite de la carte
- Trois actions disponibles: "Voir le profil LinkedIn", "Appeler", "Envoyer un email"
- Filtres principaux visibles en permanence

**Sur écrans étroits (mobile)**:
- Un unique bouton à trois points (⋮) remplace les boutons d'action individuels
- Ce bouton ouvre un menu déroulant avec les mêmes actions
- Les actions sont présentées avec des icônes dans des cercles colorés:
  * LinkedIn: cercle bleu avec icône LinkedIn
  * Téléphone: cercle vert avec icône téléphone
  * Email: cercle orange avec icône email
- Filtres avancés masqués par défaut, accessibles via un bouton "Plus de filtres"
- Le menu se ferme automatiquement en cliquant à l'extérieur

### Affichage des messages

Les messages des consultants sont présentés avec ces caractéristiques:
- Affichage immédiat sous la carte du consultant (sans clic nécessaire)
- Présentation compacte (pas d'espace entre la carte et le message)
- Cohérence visuelle avec la carte du consultant
- Extraction et mise en évidence des hashtags en bleu
- Style léger avec ombres réduites
- Messages longs automatiquement tronqués avec possibilité d'expansion

## Modèle de données

Le modèle de données central est le **Consultant** avec les propriétés suivantes:
- `id`: Identifiant unique du consultant
- `role`: Poste/rôle du consultant
- `linkedinUrl`: URL du profil LinkedIn
- `phone`: Numéro de téléphone (peut être null)
- `email`: Adresse email (peut être null)
- `locked`: État de verrouillage (disponible ou non)
- `type`: Type de consultant
- `skills`: Liste des compétences techniques
- `location`: Localisations géographiques (séparées par des virgules)
- `experience`: Niveau d'expérience (less_than_3, between_3_and_10, more_than_10)
- `phoneValidated`: Validation du téléphone
- `emailValidated`: Validation de l'email
- `linkedinValidated`: Validation du profil LinkedIn
- `availability`: Disponibilité (0: disponible, 1: bientôt, 2: non disponible)
- `message`: Message personnalisé du consultant
- `experiences`: Dernières expériences professionnelles
- `expertises`: Expertises spécifiques (différentes des skills techniques)
- `sectors`: Secteurs d'activité dans lesquels le consultant évolue

## Flux utilisateur typiques

### Pour un recruteur utilisant l'extension Chrome
1. Clic sur l'icône de l'extension dans la barre d'outils de Chrome
2. Ouverture du panneau latéral avec la liste des consultants
3. Utilisation des filtres pour affiner la recherche selon les besoins
4. Consultation des profils détaillés des consultants correspondants
5. Contact direct via LinkedIn, email ou téléphone

### Pour un consultant utilisant l'application web
1. Connexion à l'application web principale
2. Mise à jour de son profil et de sa disponibilité
3. Personnalisation de son message avec des hashtags pertinents
4. Ajout/modification de ses expériences professionnelles

## Considérations techniques spécifiques

1. **Composants Angular autonomes (standalone)**
   - Les composants principaux (consultant-card, consultant-list) sont configurés comme autonomes
   - Ils doivent être importés dans le module principal et non déclarés

2. **Génération de l'extension**
   - Deux approches: développement (rapide) et production (optimisé)
   - Le mode développement télécharge les fichiers depuis le serveur Angular en cours d'exécution
   - Le mode production utilise le build standard d'Angular et ajuste automatiquement les références aux fichiers

3. **Gestion des données et fonctionnalités clés**
   - L'application utilise des données simulées pour le développement
   - **Extraction des hashtags**: Une fonctionnalité importante qui analyse les messages des consultants pour extraire et mettre en évidence les hashtags
   ```typescript
   // Exemple d'implémentation de l'extraction des hashtags
   extractTags(message: string): string[] {
     const tags: string[] = [];
     const regex = /#(\w+)/g;
     let match;
     
     while ((match = regex.exec(message)) !== null) {
       tags.push(match[1]);
     }
     
     return tags;
   }
   ```
   
   - **Gestion des menus déroulants**: Implémentation permettant l'affichage/masquage des menus d'actions sur mobile
   ```typescript
   // État du menu déroulant pour chaque consultant
   dropdownOpen: { [id: string]: boolean } = {};
   
   // Affiche ou masque le menu déroulant pour un consultant spécifique
   toggleDropdown(id: string, event: MouseEvent) {
     event.stopPropagation();  // Empêche la propagation du clic
     this.dropdownOpen[id] = !this.dropdownOpen[id];  // Inverse l'état actuel
   }
   
   // Ferme tous les menus déroulants ouverts
   closeDropdown() {
     Object.keys(this.dropdownOpen).forEach(id => {
       this.dropdownOpen[id] = false;
     });
   }
   ```
   
   - **Actions sur les contacts**: Fonctions permettant d'interagir avec les consultants
   ```typescript
   // Ouvre le profil LinkedIn du consultant
   openLinkedIn(url: string) {
     // Si nous sommes dans une extension Chrome, utiliser l'API chrome.tabs
     if (typeof chrome !== 'undefined' && chrome.tabs) {
       chrome.tabs.create({ url });
     } else {
       // Sinon, ouvrir dans un nouvel onglet
       window.open(url, '_blank');
     }
   }
   
   // Affiche le numéro de téléphone du consultant
   showPhone(phone: string | null) {
     if (phone) {
       // Pour un numéro de téléphone, nous pourrions ouvrir un lien tel: ou afficher une alerte
       alert(`Téléphone: ${phone}`);
     } else {
       alert('Numéro de téléphone non disponible');
     }
   }
   
   // Envoie un email au consultant
   sendEmail(email: string | null) {
     if (email) {
       // Ouvrir le client de messagerie par défaut
       window.location.href = `mailto:${email}`;
     } else {
       alert('Adresse email non disponible');
     }
   }
   ```

4. **CORS et sécurité**
   - La politique de sécurité du contenu (CSP) du manifest.json est configurée pour permettre les scripts inline et les connexions externes
   - CORS doit être configuré dans le backend pour permettre les requêtes depuis l'extension

5. **Développement cross-platform**
   - Scripts de génération d'extension compatibles avec Windows, Linux et macOS
   - Solutions pour différents environnements de shell (PowerShell, bash, etc.)

## État actuel du développement

- Application Angular fonctionnelle avec composants autonomes
- API .NET Core opérationnelle
- Scripts de génération d'extension pour le développement et la production
- Développement des fonctionnalités de filtrage avancées en cours
- Optimisation de l'affichage sur mobile en cours

Ce document fournit un aperçu complet du contexte de l'application Connect Extension, de son architecture, de ses fonctionnalités, et des considérations techniques importantes pour comprendre pleinement le projet.