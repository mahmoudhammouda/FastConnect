export const environment = {
  production: false,
  // Utiliser un chemin relatif pour éviter les problèmes de Mixed Content (HTTP/HTTPS)
  apiUrl: '', // URL vide = utiliser le chemin relatif
  isExtension: false,
  envName: 'replit',
  // Informations de débogage pour vérifier la configuration
  debugInfo: {
    timestamp: new Date().toISOString(),
    buildMode: 'Replit Development'
  }
};