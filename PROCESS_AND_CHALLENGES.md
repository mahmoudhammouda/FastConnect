# Processus et défis rencontrés lors du développement

Ce document présente les principaux défis rencontrés lors du développement de l'extension Chrome Connect, ainsi que les solutions mises en œuvre.

## Problèmes d'URL relatives dans l'extension Chrome

### Problème
L'extension Chrome utilise un protocole spécifique (`chrome-extension://ID_EXTENSION/...`) qui provoque des problèmes avec les URL relatives. En effet, lorsque l'application Angular tente d'accéder à une URL relative comme `/api/consultants`, le navigateur interprète cette URL comme `chrome-extension://ID_EXTENSION/api/consultants` au lieu de l'URL du serveur d'API.

### Solution
1. Création d'un service `ApiService` centralisé qui gère la construction des URL complètes pour tous les appels API
2. Utilisation d'URL absolues dans les fichiers d'environnement
3. Modification du manifest.json pour ajouter les permissions nécessaires d'accès aux domaines d'API
4. Implémentation d'une détection intelligente du contexte d'exécution (application web vs extension vs environnement Replit)

```typescript
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_URL = environment.apiUrl;
  private readonly IS_EXTENSION = environment.isExtension;
  private readonly IS_REPLIT = window.location.hostname.includes('.replit.dev') || 
                               window.location.hostname.includes('.replit.app');

  constructor(private http: HttpClient) {
    // Si nous sommes sur Replit, utilisez l'URL Replit
    if (this.IS_REPLIT && environment.apiUrlReplit) {
      this.API_URL = environment.apiUrlReplit;
    }
    
    console.log('API Service initialisé avec URL:', this.API_URL);
  }

  /**
   * Crée une URL complète pour une route API
   */
  buildApiUrl(endpoint: string): string {
    // Si l'endpoint est déjà une URL complète, la retourner telle quelle
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
      return endpoint;
    }
    
    // S'assurer que endpoint commence par "/" si ce n'est pas déjà le cas
    if (!endpoint.startsWith('/')) {
      endpoint = '/' + endpoint;
    }
    
    return `${this.API_URL}${endpoint}`;
  }
}
```

## Compatibilité dans différents environnements

### Problème
L'application doit fonctionner dans trois contextes différents :
1. Application web standard
2. Extension Chrome
3. Environnement Replit

Chaque contexte a des spécificités concernant les URLs et la manière d'accéder aux ressources.

### Solution
1. Configuration d'URLs conditionnelles selon l'environnement détecté
2. Architecture permettant de détecter automatiquement le contexte d'exécution
3. Mécanisme de fallback vers les données mockées en cas d'échec d'accès à l'API

## Permissions réseau de l'extension Chrome

### Problème
Par défaut, les extensions Chrome n'ont pas l'autorisation d'effectuer des requêtes réseau vers des domaines externes.

### Solution
Ajout des permissions nécessaires dans le fichier manifest.json :

```json
"host_permissions": [
  "http://0.0.0.0:8000/",
  "https://api.fastconnect.io/",
  "https://*.replit.dev/",
  "https://*.replit.app/"
]
```

## Migration vers .NET 7.0

### Problème
Le projet API était initialement configuré pour .NET 6.0, mais certaines fonctionnalités et packages nécessitent .NET 7.0.

### Solution
Mise à jour du fichier de projet pour cibler .NET 7.0 :

```xml
<PropertyGroup>
  <TargetFramework>net7.0</TargetFramework>
  <Nullable>enable</Nullable>
  <ImplicitUsings>disable</ImplicitUsings>
</PropertyGroup>
```

## Configuration du service ApiService

### Problème
Chaque service appelant l'API utilisait sa propre logique pour construire les URLs, ce qui créait des incohérences et rendait difficile la gestion des différents contextes d'exécution.

### Solution
1. Centralisation de la logique d'appel API dans un seul service
2. Remplacement des appels HTTP directs par des appels via le service ApiService
3. Ajout de logs pour faciliter le débogage
4. Gestion unifiée des erreurs HTTP

## Sécurité et authentification

### Problème
L'authentification dans un contexte d'extension Chrome présente des défis spécifiques, notamment pour la conservation sécurisée des tokens et la gestion des sessions.

### Solution
1. Stockage des tokens dans le stockage local du navigateur avec chiffrement
2. Implémentation d'un intercepteur HTTP pour ajouter automatiquement les tokens JWT aux requêtes
3. Mécanisme de rafraîchissement automatique du token lorsqu'il expire
4. Déconnexion automatique lorsque le token est invalide