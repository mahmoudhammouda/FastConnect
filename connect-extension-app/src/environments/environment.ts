export const environment = {
  production: false,
  // URL complète pour le mode développement
  apiUrl: 'http://0.0.0.0:8000/api',
  // URL spécifique pour l'environnement Replit
  apiUrlReplit: `https://${window.location.hostname.replace('5000', '80')}/api`,
  // Pour l'extension Chrome, on détecte si on est dans un contexte d'extension
  isExtension: typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id
};
