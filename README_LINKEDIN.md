# Implémentation de l'authentification LinkedIn dans FastConnect

Ce document détaille l'implémentation de l'authentification OAuth2 avec LinkedIn dans l'application FastConnect, les défis rencontrés et les solutions mises en place.

## Mise à jour (30/04/2025) - Authentification LinkedIn en modal

L'authentification LinkedIn a été améliorée pour s'intégrer directement dans la modal d'authentification existante, évitant ainsi les redirections vers d'autres pages et offrant une expérience utilisateur plus fluide.

## Architecture de l'authentification

L'authentification LinkedIn a été implémentée en suivant le flux standard OAuth2 avec une architecture client-serveur :

### Composants backend (.NET Core)

1. **LinkedInAuthService** : Service principal qui gère l'ensemble du processus OAuth2
   - Génération de l'URL d'autorisation
   - Échange du code contre un token d'accès
   - Récupération des informations de profil

2. **Contrôleur AuthController** : Endpoints d'API pour l'authentification
   - `/api/auth/linkedin/redirect` : Génère l'URL d'autorisation LinkedIn
   - `/api/auth/linkedin/callback` : Traite le callback après authentification
   - Intégration avec le système d'authentification JWT existant

3. **Configuration** : Paramètres dans appsettings.json
   ```json
   "LinkedIn": {
     "ClientId": "your-client-id",
     "ClientSecret": "your-client-secret",
     "RedirectUri": "http://localhost:5000/auth/linkedin/callback"
   }
   ```

### Composants frontend (Angular)

1. **LinkedInModalComponent** : Composant standalone intégré dans la modal d'authentification
   - Gestion de l'authentification LinkedIn via fenêtre popup
   - Écoute des messages de la fenêtre popup
   - Vérification périodique de l'état d'authentification

2. **LinkedInCallbackComponent** : Composant standalone pour intercepter et traiter le callback
   - Récupération du code et state depuis l'URL
   - Communication avec la fenêtre parente via postMessage
   - Appel au backend pour échanger le code contre un token
   - Gestion des notifications utilisateur

2. **Configuration du routage** : Prise en charge des routes OAuth
   - Routing sans hash pour compatibilité avec les redirections OAuth
   - Route spécifique pour le callback LinkedIn

3. **Service de notification** : Affichage de toasts informatifs
   - Notifications personnalisées pour les connexions LinkedIn
   - Gestion des erreurs avec informations détaillées

## Défis et solutions

### 1. Erreur RESOURCE_NOT_FOUND (404) avec l'API LinkedIn

**Problème** : Lors de la récupération du profil utilisateur, l'appel à l'API `https://api.linkedin.com/v2/positions` retournait une erreur 404 car elle nécessite des permissions supplémentaires non incluses dans nos scopes.

**Solution** :
- Suppression de l'appel à l'API positions problématique
- Utilisation exclusive des endpoints compatibles avec les scopes de base
- Initialisation du champ `Title` à une valeur vide par défaut

### 2. Problèmes de routage et redirection

**Problème** : Angular était configuré en mode hash (`/#/`), mais LinkedIn redirige vers des URLs sans hash.

**Solution** :
- Désactivation du mode hash pour le routeur Angular
- Modification de la base href pour assurer le chargement correct des ressources
- Configuration des routes avec le bon composant de callback

### 3. Dépendance circulaire avec les intercepteurs HTTP

**Problème** : L'utilisation d'un iframe pour intégrer l'authentification LinkedIn dans la modal créait une dépendance circulaire avec les intercepteurs HTTP, provoquant l'erreur `NG0200: Circular dependency in DI detected for InjectionToken HTTP_INTERCEPTORS`.

**Solution** :
- Remplacement de l'iframe par une fenêtre popup dédiée
- Mise en place d'un système de communication entre fenêtres via l'API postMessage
- Vérification périodique du localStorage pour détecter une authentification réussie

### 3. Affichage des erreurs et feedback utilisateur

**Problème** : Manque de visibilité sur l'état du processus d'authentification.

**Solution** :
- Implémentation d'un service de notification personnalisé
- Affichage de toasts avec des icônes spécifiques pour LinkedIn
- Ajout de logs détaillés pour faciliter le débogage

### 4. Format complexe des réponses API LinkedIn

**Problème** : Les données renvoyées par LinkedIn utilisent un format complexe avec localisation et structures imbriquées.

**Solution** :
- Création de méthodes helpers pour extraire les données pertinentes
- Gestion de la localisation des chaînes (préférence en_US)
- Mise en place de gestionnaires d'erreurs robustes

## Installation et configuration

Pour configurer l'authentification LinkedIn dans votre propre instance de FastConnect :

1. Créez une application sur [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
2. Configurez les permissions OAuth (scopes requis : `r_liteprofile`, `r_emailaddress`)
3. Ajoutez l'URL de redirection autorisée
4. Mettez à jour les identifiants dans `appsettings.json`

## Limitations connues

1. **Mode développement LinkedIn** : L'application est limitée à 25 utilisateurs de test tant qu'elle n'est pas validée par LinkedIn
2. **Accès limité aux données** : Sans scopes avancés, certaines informations comme le titre professionnel ne sont pas accessibles
3. **Délai de validation** : Le passage en production nécessite une validation par LinkedIn qui peut prendre plusieurs jours

## Authentification en modal (nouvelle approche)

La nouvelle implémentation offre une expérience utilisateur améliorée :

1. **Flux intégré dans la modal** :
   - L'utilisateur reste dans la modal d'authentification tout au long du processus
   - Expérience visuellement cohérente sans changement de contexte

2. **Approche par fenêtre popup** :
   - LinkedIn s'ouvre dans une fenêtre popup au lieu d'un iframe
   - Évite les problèmes de cookies tiers et de dépendance circulaire
   - Communication entre fenêtres via l'API postMessage

3. **Retour visuel amélioré** :
   - Message d'attente pendant l'authentification
   - Notifications de succès/erreur dans l'interface principale

## Schéma de fonctionnement

```
+----------------------------------+     +----------------------------------+
|                                  |     |                                  |
|  Modal d'authentification        |     |  Fenêtre popup LinkedIn          |
|                                  |     |                                  |
|  +----------------------------+  |     |  +----------------------------+  |
|  |                            |  |     |  |                            |  |
|  |  Bouton LinkedIn           |  |     |  |  Interface LinkedIn        |  |
|  |                            |  |     |  |                            |  |
|  +----------------------------+  |     |  +----------------------------+  |
|           |                      |     |             |                     |
|           | Clic                 |     |             | Authentification    |
|           v                      |     |             v                     |
|  +----------------------------+  |     |  +----------------------------+  |
|  |                            |  |     |  |                            |  |
|  |  LinkedInModalComponent    |  |     |  |  LinkedInCallbackComponent|  |
|  |  (Affiche message         |<-------->|  (Traite le code et envoie  |  |
|  |   d'attente)               |  |     |  |   message à la fenêtre     |  |
|  |                            |  |     |  |   principale)              |  |
|  +----------------------------+  |     |  +----------------------------+  |
|                                  |     |                                  |
+----------------------------------+     +----------------------------------+
```

## Suggestions d'amélioration

1. **Authentification dynamique** : Prise en charge dynamique d'autres fournisseurs OAuth (Google, GitHub)
2. **Permissions étendues** : Demande de scopes supplémentaires pour accéder à plus de données LinkedIn
3. **Rafraîchissement de token** : Mise en place d'un mécanisme de refresh token pour prolonger les sessions
4. **Fallback sans popup** : Ajouter une option de repli si les fenêtres popup sont bloquées par le navigateur
