export const environment = {
  production: false,
  // Utilisation du proxy pour la communication avec l'API
  apiUrl: '/api',  // Utilise le proxy configuré dans proxy.conf.json qui redirige vers 0.0.0.0:8000/api
  // Pour l'extension Chrome, on détecte si on est dans un contexte d'extension
  isExtension: typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id,
  // Nom de l'environnement pour le logging
  envName: 'development',
  // Informations de débogage
  debugInfo: {
    timestamp: new Date().toISOString(),
    buildMode: 'Development with Proxy'
  }
};
