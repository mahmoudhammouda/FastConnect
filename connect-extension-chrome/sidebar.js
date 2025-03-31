// Ce script n'est plus nécessaire, car nous utilisons directement app-root
// Gardé pour des modifications futures si nécessaire

document.addEventListener('DOMContentLoaded', () => {
  console.log('Extension sidebar chargée');
  
  // Dans cette version, nous utilisons directement la balise app-root dans le HTML
  // ce qui permet à Angular de s'initialiser automatiquement sans notre intervention
  
  // Fonction de vérification périodique pour s'assurer que Angular est bien initialisé
  let checkCount = 0;
  const maxChecks = 10;
  
  function checkAngularInitialized() {
    checkCount++;
    
    // Si nous détectons que le composant app-root a été rendu (a des enfants)
    const appRoot = document.querySelector('app-root');
    
    if (appRoot && appRoot.children.length > 0) {
      console.log('Application Angular correctement initialisée dans l\'extension');
    } else if (checkCount < maxChecks) {
      // Continuer à vérifier pendant un certain temps
      console.log(`Attente de l'initialisation d'Angular... (${checkCount}/${maxChecks})`);
      setTimeout(checkAngularInitialized, 500);
    } else {
      console.warn('L\'application Angular ne semble pas s\'être initialisée correctement après plusieurs tentatives');
      console.warn('Vérifiez que les scripts Angular sont correctement chargés et que la balise app-root est présente dans le HTML');
    }
  }
  
  // Lancer la vérification après un court délai
  setTimeout(checkAngularInitialized, 1000);
});