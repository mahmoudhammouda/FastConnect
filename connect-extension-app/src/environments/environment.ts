export const environment = {
  production: false,
  // URL complète pour le mode développement
  apiUrl: 'http://127.0.0.1:8000/api',
  // Pour l'extension Chrome, on détecte si on est dans un contexte d'extension
  isExtension: typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id
};
