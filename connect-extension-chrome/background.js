// Activer le panneau latéral natif de Chrome lors de l'installation de l'extension (pour les sites autres que LinkedIn)
chrome.runtime.onInstalled.addListener(() => {
  if (chrome.sidePanel) {
    chrome.sidePanel.setOptions({
      enabled: true,
      path: 'sidebar.html'
    });
    console.log('FastConnect: Configuration du panneau latéral natif de Chrome');
  }
});

// Gestion des clics sur l'icône de l'extension
chrome.action.onClicked.addListener((tab) => {
  // Sur les sites autres que LinkedIn, on utilise le panneau natif de Chrome
  if (!tab.url || !tab.url.includes('linkedin.com')) {
    if (chrome.sidePanel) {
      chrome.sidePanel.open({ tabId: tab.id });
      console.log('FastConnect: Ouverture du panneau natif sur site non-LinkedIn');
    }
  } else {
    // Sur LinkedIn, ne rien faire car le bouton flottant est déjà en place
    console.log('FastConnect: Clic sur l\'icône pour LinkedIn - utiliser le bouton flottant');
  }
});

// Écouter les messages du content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Répondre au status de l'application
  if (message.action === 'getAppStatus') {
    sendResponse({ status: 'ready' });
    return true;
  }
  
  // Gérer la demande d'ouverture du panneau latéral
  if (message.action === 'openSidePanel') {
    console.log('FastConnect: Demande d\'ouverture du panneau latéral reçue');
    if (chrome.sidePanel && sender.tab) {
      chrome.sidePanel.open({ tabId: sender.tab.id });
      console.log('FastConnect: Panneau latéral ouvert avec succès');
      sendResponse({ success: true });
    } else {
      console.error('FastConnect: Impossible d\'ouvrir le panneau latéral');
      sendResponse({ success: false, error: 'SidePanel API or tab not available' });
    }
    return true;
  }
});