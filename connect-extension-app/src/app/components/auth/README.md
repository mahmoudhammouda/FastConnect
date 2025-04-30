# Flux d'Authentification LinkedIn dans FastConnect

## Schéma du Flux d'Authentification LinkedIn

```
┌─────────────────┐                 ┌────────────────┐                ┌──────────────────┐
│                 │                 │                │                │                  │
│  Application    │                 │  Popup         │                │  API LinkedIn    │
│  Principale     │                 │  LinkedIn      │                │                  │
│                 │                 │                │                │                  │
└────────┬────────┘                 └───────┬────────┘                └─────────┬────────┘
         │                                  │                                   │
         │                                  │                                   │
         │  1. Clic sur "Se connecter      │                                   │
         │     avec LinkedIn"               │                                   │
         │ ────────────────────────►        │                                   │
         │                                  │                                   │
         │  2. Ouverture du modal LinkedIn  │                                   │
         │ ◄────────────────────────        │                                   │
         │                                  │                                   │
         │  3. Demande d'URL de redirection │                                   │
         │     à l'API backend              │                                   │
         │ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─       │                                   │
         │                                  │                                   │
         │  4. Récupération de l'URL        │                                   │
         │ ◄─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─       │                                   │
         │                                  │                                   │
         │  5. Ouverture de la popup        │                                   │
         │ ────────────────────────►        │                                   │
         │                                  │  6. Redirection vers              │
         │                                  │     l'authentification LinkedIn   │
         │                                  │ ──────────────────────────────►   │
         │                                  │                                   │
         │                                  │  7. Interface de connexion        │
         │                                  │     LinkedIn                      │
         │                                  │ ◄──────────────────────────────   │
         │                                  │                                   │
         │                                  │  8. Utilisateur se connecte       │
         │                                  │ ──────────────────────────────►   │
         │                                  │                                   │
         │                                  │  9. Code d'autorisation           │
         │                                  │ ◄──────────────────────────────   │
         │                                  │                                   │
         │                                  │                                   │
┌────────┴────────┐                 ┌───────┴────────┐                          │
│                 │                 │                │                          │
│                 │ 10. Redirection vers callback    │                          │
│  Backend API    │ ◄───────────────────────────────                           │
│                 │                 │                │                          │
└────────┬────────┘                 │                │                          │
         │                          │                │                          │
         │ 11. Échange du code      │                │                          │
         │     contre un token      │                │                          │
         │ ─────────────────────────────────────────────────────────────────►   │
         │                          │                │                          │
         │ 12. Token d'accès        │                │                          │
         │ ◄─────────────────────────────────────────────────────────────────   │
         │                          │                │                          │
         │ 13. Stockage du token    │                │                          │
         │     et des infos         │                │                          │
         │     utilisateur dans     │                │                          │
         │     localStorage         │                │                          │
         │                          │                │                          │
         │ 14. Message de succès    │                │                          │
         │ ────────────────────────►                │                          │
         │                          │                │                          │
         │                          │ 15. Fermeture de la popup                 │
         │                          │     et postMessage vers                   │
         │                          │     l'application principale              │
         │                          │ ──────────────────────────────►           │
         │                          │                                           │
┌────────┴────────┐                 │                │                          │
│                 │                 │                │                          │
│  Application    │ 16. Réception du message                                    │
│  Principale     │     et mise à jour de l'UI       │                          │
│                 │                 │                │                          │
└─────────────────┘                 └────────────────┘                          │
                                                                                │
                                                                        ┌───────┴────────┐
                                                                        │                │
                                                                        │  API LinkedIn  │
                                                                        │                │
                                                                        └────────────────┘
```

## Explication du Flux d'Authentification LinkedIn

### 1. Initialisation du Processus
- L'utilisateur clique sur "Se connecter avec LinkedIn" dans l'application principale
- Le modal LinkedIn est initialisé et affiché (`linkedin-modal.component.ts`)

### 2. Configuration de l'Authentification
- Le modal demande une URL de redirection au backend via `apiService.get('auth/linkedin/redirect')`
- Le backend génère un état unique (state) pour la sécurité et renvoie l'URL LinkedIn

### 3. Ouverture de la Popup
- Une nouvelle fenêtre (popup) est ouverte avec l'URL d'authentification LinkedIn
- Un écouteur d'événements `message` est ajouté à la fenêtre principale pour recevoir les communications de la popup

### 4. Authentification LinkedIn
- L'utilisateur se connecte avec ses identifiants LinkedIn dans la popup
- LinkedIn valide les identifiants et redirige vers l'URL de callback spécifiée avec un code d'autorisation

### 5. Traitement du Callback
- La page de callback (`linkedin-callback.component.ts`) reçoit le code d'autorisation
- Elle envoie ce code au backend pour l'échanger contre un token d'accès via `authService.linkedInCallback(code, state)`

### 6. Stockage et Notification
- Le backend échange le code contre un token d'accès auprès de l'API LinkedIn
- Le token et les informations utilisateur sont stockés dans le localStorage
- La popup envoie un message à la fenêtre principale via `window.opener.postMessage()`

### 7. Mise à jour de l'Interface
- L'application principale reçoit le message et met à jour l'état d'authentification
- Le `AuthService` récupère les données depuis localStorage avec `refreshAuthState()`
- L'interface utilisateur est mise à jour pour montrer que l'utilisateur est connecté

### 8. Fermeture et Finalisation
- La popup se ferme automatiquement
- L'utilisateur peut maintenant accéder aux fonctionnalités réservées aux utilisateurs authentifiés

## Modifications Récentes
- Amélioration de la méthode `refreshAuthState()` pour charger directement l'état depuis localStorage sans appel API
- Suppression de l'appel API vers `/api/auth/refresh-token` qui causait une erreur 404
- Ajout de logs détaillés à chaque étape du flux pour faciliter le débogage
