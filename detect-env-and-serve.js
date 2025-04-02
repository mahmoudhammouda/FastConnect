/**
 * Script de détection automatique de l'environnement et lancement du serveur Angular
 * Ce script détecte si nous sommes sur Replit ou en local et exécute la commande appropriée
 */

const { execSync } = require('child_process');

// Détecter si nous sommes sur Replit
const isReplit = process.env.REPL_ID || process.env.REPL_SLUG;

console.log(`🔍 Détection de l'environnement: ${isReplit ? 'Replit' : 'Local'}`);

try {
  // Déterminer la commande à exécuter en fonction de l'environnement
  const command = isReplit ? 'npm run start:replit' : 'npm run start:local';
  
  console.log(`▶️ Exécution de la commande: ${command}`);
  execSync(command, { stdio: 'inherit', cwd: './connect-extension-app' });
  
} catch (error) {
  console.error('❌ Erreur lors du démarrage de l\'application Angular:', error.message);
  process.exit(1);
}