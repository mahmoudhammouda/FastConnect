export const environment = {
  production: false,
  // URL pour l'API en mode Replit avec proxy
  apiUrl: '/api',  // Utilise le proxy configuré dans proxy.conf.json qui redirige vers 0.0.0.0:8000/api
  isExtension: false,
  envName: 'replit',
  // Informations de débogage pour vérifier la configuration
  debugInfo: {
    timestamp: new Date().toISOString(),
    buildMode: 'Replit Development'
  }
};