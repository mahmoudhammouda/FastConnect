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
        position: absolute;
        left: -44px;
        top: 110px;
        z-index: 9998;
        display: flex;
        justify-content: center;
        cursor: pointer;
        background: #0d223a;
        border-radius: 15px 0px 0px 15px;
        padding: 10px 12px;
        align-items: center;
        opacity: 1;
        color: white;
        font-weight: bold;
        font-size: 18px;
        transition: opacity 0.3s ease;
        box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
      }
      
      .fc-toggle-button:hover {
        opacity: 0.9;
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
        min-width: 300px;
        max-width: 800px;
        height: 100vh;
        background-color: white;
        box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        transform: translateX(100%);
        transition: transform 0.5s ease-in-out;
      }
      
      .fc-resize-handle {
        position: absolute;
        left: 0;
        top: 0;
        width: 6px;
        height: 100%;
        cursor: ew-resize;
        background-color: transparent;
        z-index: 10000;
      }
      
      .fc-resize-handle:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
      
      .fc-sidebar.visible {
        transform: translateX(0) !important;
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
    toggleButton.textContent = 'FC';
    
    // Créer le panneau latéral
    const sidebar = document.createElement('div');
    sidebar.className = 'fc-sidebar';
    
    // Créer la poignée de redimensionnement
    const resizeHandle = document.createElement('div');
    resizeHandle.className = 'fc-resize-handle';
    
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
    
    // Plus besoin du bouton de fermeture car le bouton FC sert maintenant à ouvrir/fermer
    header.appendChild(title);
    
    // Créer l'iframe
    const iframe = document.createElement('iframe');
    iframe.className = 'fc-iframe';
    iframe.src = chrome.runtime.getURL('sidebar.html');
    iframe.style.width = '100%'; // S'assurer que l'iframe s'adapte au redimensionnement
    
    // Ajouter le bouton toggle au panneau latéral
    sidebar.appendChild(toggleButton);
    
    // Ajouter la poignée de redimensionnement
    sidebar.appendChild(resizeHandle);
    
    // Assembler tous les éléments
    sidebar.appendChild(header);
    sidebar.appendChild(iframe);
    
    // Restaurer la largeur sauvegardée si elle existe
    const savedWidth = localStorage.getItem('fcSidebarWidth');
    if (savedWidth) {
      sidebar.style.width = savedWidth + 'px';
    }
    
    shadowRoot.appendChild(sidebar);
    
    return { toggleButton, sidebar };
  }
  
  // Configuration des gestionnaires d'événements
  function setupEvents(elements) {
    const { toggleButton, sidebar } = elements;
    const resizeHandle = sidebar.querySelector('.fc-resize-handle');
    
    // Fonction pour basculer l'état du panneau (ouvrir/fermer)
    function toggleSidebar() {
      if (sidebar.classList.contains('visible')) {
        // Fermer le panneau
        sidebar.style.transform = `translateX(100%)`;
        sidebar.classList.remove('visible');
      } else {
        // Ouvrir le panneau
        sidebar.style.transform = 'translateX(0)';
        sidebar.classList.add('visible');
      }
    }
    
    // Ajouter les écouteurs d'événements
    toggleButton.addEventListener('click', toggleSidebar);
    
    // Gestion du redimensionnement du panneau
    let isResizing = false;
    let startX, startWidth;
    
    resizeHandle.addEventListener('mousedown', function(e) {
      isResizing = true;
      startX = e.clientX;
      startWidth = parseInt(getComputedStyle(sidebar).width, 10);
      
      document.addEventListener('mousemove', resizePanel);
      document.addEventListener('mouseup', stopResize);
      e.preventDefault();
    });
    
    function resizePanel(e) {
      if (!isResizing) return;
      
      // Calculer la nouvelle largeur (noter que nous déplaçons dans la direction opposée, donc on soustrait)
      const newWidth = startWidth - (e.clientX - startX);
      
      // Appliquer des limites min/max
      if (newWidth >= 300 && newWidth <= 800) {
        sidebar.style.width = newWidth + 'px';
        // Sauvegarder la largeur pour qu'elle persiste
        localStorage.setItem('fcSidebarWidth', newWidth);
      }
    }
    
    function stopResize() {
      isResizing = false;
      document.removeEventListener('mousemove', resizePanel);
      document.removeEventListener('mouseup', stopResize);
    }
    
    // Gestionnaire d'événement pour la touche Échap
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && sidebar.classList.contains('visible')) {
        toggleSidebar();
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
