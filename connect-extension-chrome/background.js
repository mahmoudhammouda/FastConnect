// Activer le panneau latéral lors de l'installation de l'extension
chrome.runtime.onInstalled.addListener(() => {
  // Configurer le panneau latéral pour qu'il s'ouvre automatiquement
  chrome.sidePanel.setOptions({
    enabled: true,
    path: 'sidebar.html'
  });
});

// Ouvrir le panneau latéral lorsque l'utilisateur clique sur l'icône de l'extension
chrome.action.onClicked.addListener((tab) => {
  // Ouvrir le panneau latéral
  chrome.sidePanel.open({ tabId: tab.id });
});