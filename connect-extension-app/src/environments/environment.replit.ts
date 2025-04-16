export const environment = {
  production: false,
  // URL pour l'API en mode Replit avec proxy
  apiUrl: '', // Modifié pour éviter la duplication du préfixe /api
  isExtension: false,
  envName: 'replit',
  // Informations de débogage pour vérifier la configuration
  debugInfo: {
    timestamp: new Date().toISOString(),
    buildMode: 'Replit Development'
  }
};