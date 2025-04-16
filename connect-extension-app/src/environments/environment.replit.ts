export const environment = {
  production: false,
  // URL pour l'API en mode Replit - Pointer directement vers l'API backend
  apiUrl: 'http://0.0.0.0:8000', // URL directe de l'API sans proxy
  isExtension: false,
  envName: 'replit',
  // Informations de débogage pour vérifier la configuration
  debugInfo: {
    timestamp: new Date().toISOString(),
    buildMode: 'Replit Development'
  }
};