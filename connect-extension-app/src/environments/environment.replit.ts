export const environment = {
  production: false,
  // URL pour l'API en mode Replit avec proxy
  apiUrl: 'http://0.0.0.0:3000', // URL du proxy qui redirige vers l'API
  isExtension: false,
  envName: 'replit',
  // Informations de débogage pour vérifier la configuration
  debugInfo: {
    timestamp: new Date().toISOString(),
    buildMode: 'Replit Development'
  }
};