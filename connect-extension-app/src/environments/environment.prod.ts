export const environment = {
  production: true,
  // URL complète pour le mode production
  apiUrl: 'https://api.fastconnect.io/api',
  // Pour l'extension Chrome, on détecte si on est dans un contexte d'extension
  isExtension: typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id
};
