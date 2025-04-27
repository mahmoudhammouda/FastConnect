// FastConnect LinkedIn Sidebar Integration avec Shadow DOM

(function() {
  // Si nous ne sommes pas sur LinkedIn, ne rien faire
  if (!window.location.hostname.includes('linkedin.com')) {
    return;
  }

  // Création du conteneur pour le Shadow DOM
  function createShadowContainer() {
    if (document.getElementById('fc-shadow-host')) {
      return document.getElementById('fc-shadow-host').shadowRoot;
    }
    
    // Créer un conteneur qui hébergera notre shadow DOM
    const shadowHost = document.createElement('div');
    shadowHost.id = 'fc-shadow-host';
    document.body.appendChild(shadowHost);
    
    // Créer le shadow DOM en mode 'closed' pour un meilleur isolement
    const shadowRoot = shadowHost.attachShadow({ mode: 'open' });
    
    // Créer la feuille de style
    const style = document.createElement('style');
    style.textContent = `
      /* Styles du bouton toggle */
      .fc-toggle-button {
        position: fixed;
        right: 20px;
        top: 100px;
        width: 40px;
        height: 40px;
        background-color: white;
        border-radius: 50%;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        z-index: 9998;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .fc-toggle-button:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      }
      
      .fc-toggle-button.hidden {
        opacity: 0;
        transform: translateX(100px);
        pointer-events: none;
      }
      
      .fc-toggle-button img {
        width: 24px;
        height: 24px;
      }
      
      /* Styles du panneau latéral */
      .fc-sidebar {
        position: fixed;
        top: 0;
        right: 0;
        width: 400px;
        height: 100vh;
        background-color: white;
        box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        transform: translateX(420px);
        transition: transform 0.3s ease;
      }
      
      .fc-sidebar.visible {
        transform: translateX(0);
      }
      
      /* Styles de l'en-tête */
      .fc-sidebar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 16px;
        background-color: #f8f9fa;
        border-bottom: 1px solid #e5e7eb;
      }
      
      .fc-sidebar-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: bold;
      }
      
      .fc-sidebar-title img {
        width: 20px;
        height: 20px;
      }
      
      .fc-close-button {
        background: none;
        border: none;
        font-size: 24px;
        font-weight: bold;
        cursor: pointer;
        color: #666;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      /* Styles de l'iframe */
      .fc-iframe {
        width: 100%;
        height: calc(100% - 44px);
        border: none;
      }
    `;
    
    shadowRoot.appendChild(style);
    return shadowRoot;
  }
  
  // Création de l'interface utilisateur dans le Shadow DOM
  function createUI(shadowRoot) {
    // Créer le bouton toggle
    const toggleButton = document.createElement('div');
    toggleButton.className = 'fc-toggle-button';
    
    const toggleImg = document.createElement('img');
    toggleImg.src = chrome.runtime.getURL('icon.png');
    toggleImg.alt = 'FastConnect';
    toggleButton.appendChild(toggleImg);
    
    // Créer le panneau latéral
    const sidebar = document.createElement('div');
    sidebar.className = 'fc-sidebar';
    
    // Créer l'en-tête
    const header = document.createElement('div');
    header.className = 'fc-sidebar-header';
    
    const title = document.createElement('div');
    title.className = 'fc-sidebar-title';
    
    const titleImg = document.createElement('img');
    titleImg.src = chrome.runtime.getURL('icon.png');
    titleImg.alt = 'FastConnect';
    
    const titleText = document.createElement('span');
    titleText.textContent = 'FastConnect';
    
    title.appendChild(titleImg);
    title.appendChild(titleText);
    
    const closeButton = document.createElement('button');
    closeButton.className = 'fc-close-button';
    closeButton.textContent = '×';
    
    header.appendChild(title);
    header.appendChild(closeButton);
    
    // Créer l'iframe
    const iframe = document.createElement('iframe');
    iframe.className = 'fc-iframe';
    iframe.src = chrome.runtime.getURL('sidebar.html');
    
    // Assembler tous les éléments
    sidebar.appendChild(header);
    sidebar.appendChild(iframe);
    
    shadowRoot.appendChild(toggleButton);
    shadowRoot.appendChild(sidebar);
    
    return { toggleButton, sidebar, closeButton };
  }
  
  // Configuration des gestionnaires d'événements
  function setupEvents(elements) {
    const { toggleButton, sidebar, closeButton } = elements;
    
    // Fonction pour ouvrir le panneau
    function openSidebar() {
      sidebar.classList.add('visible');
      toggleButton.classList.add('hidden');
    }
    
    // Fonction pour fermer le panneau
    function closeSidebar() {
      sidebar.classList.remove('visible');
      toggleButton.classList.remove('hidden');
    }
    
    // Ajouter les écouteurs d'événements
    toggleButton.addEventListener('click', openSidebar);
    closeButton.addEventListener('click', closeSidebar);
    
    // Gestionnaire d'événement pour la touche Échap
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && sidebar.classList.contains('visible')) {
        closeSidebar();
      }
    });
  }
  
  // Initialisation de l'extension
  function initialize() {
    console.log('FastConnect: Initialisation de l\'extension...');
    
    // Créer le shadow DOM
    const shadowRoot = createShadowContainer();
    
    // Créer l'interface utilisateur
    const elements = createUI(shadowRoot);
    
    // Configurer les événements
    setupEvents(elements);
    
    console.log('FastConnect: Extension initialisée avec succès');
  }
  
  // Démarrer l'initialisation lorsque le DOM est prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
  
  // Sécurité supplémentaire pour s'assurer que l'extension est initialisée
  setTimeout(initialize, 2000);
})();
