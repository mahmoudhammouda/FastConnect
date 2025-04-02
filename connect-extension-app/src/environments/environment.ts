export const environment = {
  production: false,
  // URL complète pour le mode développement
  apiUrl: 'http://localhost:8000/api',
  // Pour l'extension Chrome, on détecte si on est dans un contexte d'extension
  isExtension: typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id,
  // Nom de l'environnement pour le logging
  envName: 'development'
};
