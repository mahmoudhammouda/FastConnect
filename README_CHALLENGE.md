# Processus et défis rencontrés lors du développement

Ce document présente les principaux défis rencontrés lors du développement de l'extension Chrome Connect (FastConnect), ainsi que les solutions mises en œuvre. Il sert de journal d'apprentissage et de référence pour les problèmes techniques résolus.

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

## Problème de rendu côté serveur (SSR) versus application complètement séparée

### Problème
Initialement, l'architecture envisagée utilisait le rendu côté serveur (SSR) où le backend .NET servait également les fichiers statiques Angular. Cette approche posait plusieurs problèmes, notamment :
1. Complexité accrue pour le déploiement de l'extension Chrome
2. Difficultés pour l'environnement Replit où les ports sont restreints
3. Confusion entre les chemins d'API et les routes de l'application frontend
4. Problèmes de CORS lorsque l'application fonctionnait en mode extension

### Solution
Réarchitecture complète pour séparer clairement frontend et backend :
1. Backend .NET Core comme pure API REST sur le port 8000
2. Frontend Angular comme application standalone sur le port 5000
3. Utilisation d'un proxy en environnement Replit pour faciliter la communication
4. Configuration de fichiers d'environnement distincts pour chaque contexte d'exécution

## Problèmes de CORS dans l'environnement Replit

### Problème
Les restrictions de sécurité dans l'environnement Replit causaient des erreurs CORS lors des appels API entre le frontend et le backend, même avec la configuration CORS côté serveur.

### Solution
1. Implémentation d'un proxy Angular qui redirige les requêtes `/api` vers le backend
2. Configuration du fichier `proxy.conf.json` :
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
3. Lancement de l'application Angular avec l'option `--proxy-config proxy.conf.json`
4. Adaptation du service ApiService pour utiliser des chemins relatifs dans Replit

## Problèmes d'initialisation des workflows Replit

### Problème
Les workflows Replit ne démarraient pas toujours correctement ou s'arrêtaient inopinément, rendant l'application inaccessible.

### Solution
1. Configuration de commandes de démarrage complètes et explicites :
```
cd connect-api && dotnet run --urls=http://0.0.0.0:8000
cd connect-extension-app && ng serve --host 0.0.0.0 --port 5000 --disable-host-check --proxy-config proxy.conf.json --configuration=replit
```
2. Ajout du flag `--disable-host-check` pour permettre les connexions externes
3. Utilisation de `0.0.0.0` au lieu de `localhost` pour écouter sur toutes les interfaces
4. Documentation détaillée du processus de démarrage et des ports utilisés

## Problèmes de mémoire lors du build en mode production

### Problème
Le build Angular en mode production sur Replit échouait avec des erreurs de mémoire, en particulier lors de la génération de l'extension Chrome.

### Solution
1. Création d'un script de génération spécifique pour l'environnement Replit (`generate-extension-replit.js`)
2. Ajout des options Node.js pour augmenter la limite de mémoire : `--max_old_space_size=4096`
3. Optimisation des configurations de build pour réduire l'empreinte mémoire
4. Utilisation de la compilation AOT (Ahead-of-Time) pour optimiser le processus

## Problèmes de détection d'environnement automatique

### Problème
L'application devait détecter automatiquement l'environnement d'exécution (extension Chrome, application web, Replit) pour adapter son comportement, mais les méthodes de détection n'étaient pas fiables à 100%.

### Solution
1. Création d'un service d'environnement centralisé avec plusieurs méthodes de détection :
```typescript
@Injectable({
  providedIn: 'root'
})
export class EnvironmentDetectionService {
  readonly isExtension: boolean;
  readonly isReplit: boolean;
  readonly isProduction: boolean;

  constructor() {
    // Détection de l'extension Chrome
    this.isExtension = !!window.chrome && !!chrome.runtime && !!chrome.runtime.id;
    
    // Détection de l'environnement Replit
    this.isReplit = window.location.hostname.includes('.replit.dev') || 
                    window.location.hostname.includes('.replit.app');
    
    // Détection mode production
    this.isProduction = environment.production;
    
    console.log('Environnement détecté:', {
      isExtension: this.isExtension,
      isReplit: this.isReplit,
      isProduction: this.isProduction
    });
  }
}
```
2. Utilisation des fichiers d'environnement avec option de forçage manuel
3. Ajout d'un paramètre de configuration pour surcharger la détection automatique

## Architecture multi-environnements avec configurations spécifiques

### Problème
Le déploiement sur différents environnements (local, Replit, production) nécessitait des configurations différentes mais la gestion était complexe et sujette aux erreurs.

### Solution
1. Création de multiples fichiers d'environnement spécifiques :
   - `environment.ts` - Configuration par défaut
   - `environment.local.ts` - Configuration locale sans extension
   - `environment.local-extension.ts` - Configuration locale avec extension
   - `environment.replit.ts` - Configuration spécifique à Replit
   - `environment.prod.ts` - Configuration de production
   - `environment.prod-extension.ts` - Configuration de production pour l'extension

2. Configuration de plusieurs modes de build dans angular.json pour adapter les options de compilation à chaque environnement :
```json
"configurations": {
  "production": {
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.prod.ts"
      }
    ],
    "optimization": true,
    "outputHashing": "all",
    "sourceMap": false,
    "namedChunks": false,
    "extractLicenses": true,
    "vendorChunk": false,
    "buildOptimizer": true
  },
  "local": {
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.local.ts"
      }
    ]
  },
  "local-extension": {
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.local-extension.ts"
      }
    ]
  },
  "replit": {
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.replit.ts"
      }
    ]
  },
  "prod-extension": {
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.prod-extension.ts"
      }
    ],
    "optimization": true,
    "outputHashing": "all",
    "sourceMap": false,
    "namedChunks": false,
    "extractLicenses": true,
    "vendorChunk": false,
    "buildOptimizer": true
  }
}
```

3. Documentation exhaustive du workflow de déploiement pour chaque environnement
4. Scripts automatisés pour adapter le déploiement selon le contexte

## Problèmes avec NgModule et les composants "standalone"

### Problème
L'utilisation de composants Angular en mode "standalone" (introduit dans Angular 14+) a provoqué des erreurs d'intégration dans certains modules, notamment des erreurs du type "Component is standalone, and cannot be declared in an NgModule".

### Solution
1. Adaptation de l'organisation modulaire pour respecter les règles des composants standalone :
   - Les composants standalone doivent être importés et non déclarés dans NgModule
   - Utilisation du tableau `imports` plutôt que `declarations` dans le module principal
   - Assurer que chaque composant standalone importe ses propres dépendances

2. Configuration correcte d'AppModule pour les composants mixtes :
```typescript
@NgModule({
  declarations: [
    // Composants non-standalone uniquement
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
    // Composants standalone à importer ici
    ConsultantListComponent,
    ConsultantCardComponent,
    // ...
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Leçons apprises et meilleures pratiques

### Architecture et organisation
1. **Séparation claire frontend/backend** : Permet d'éviter les problèmes de CORS, facilite le déploiement, et simplifie la gestion de l'extension Chrome
2. **Configuration multi-environnements** : Essentielle pour gérer les différents contextes d'exécution
3. **Centralisation des services d'API** : Évite la duplication de code et unifie le comportement des appels réseau

### Outils et pratiques de développement
1. **Automatisation des builds** : Scripts personnalisés pour la génération de l'extension Chrome
2. **Documentation exhaustive** : Cruciale pour comprendre le fonctionnement dans différents environnements
3. **Logging détaillé** : Déterminant pour identifier rapidement la source des problèmes

### Considérations pour l'extension Chrome
1. **Permissions explicites** : Toujours déclarer les permissions réseau requises
2. **Isolation de l'API** : Utiliser des URL absolues ou un service central pour construire les URLs
3. **Tests croisés** : Toujours tester l'extension dans différents contextes (local, production)