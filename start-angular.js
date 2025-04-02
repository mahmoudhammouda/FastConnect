/**
 * Script pour démarrer l'application Angular sur Replit
 * Ce script utilise fix-angular-config.js pour adapter automatiquement
 * la configuration selon la version d'Angular CLI
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Détecter si nous sommes sur Replit
const isReplit = process.env.REPL_ID || process.env.REPL_SLUG;

console.log(`🔍 Détection de l'environnement: ${isReplit ? 'Replit' : 'Local'}`);

try {
  // Exécuter le script de correction de configuration Angular
  console.log('🔧 Exécution du script de correction de configuration Angular...');
  execSync('node fix-angular-config.js', { stdio: 'inherit' });
  
  // Obtenir la version d'Angular CLI
  const ngVersionOutput = execSync('cd connect-extension-app && ng version', { encoding: 'utf8' });
  const versionMatch = ngVersionOutput.match(/Angular CLI: (\d+\.\d+\.\d+)/);
  const angularVersion = versionMatch ? versionMatch[1] : null;
  
  console.log(`📊 Version d'Angular CLI: ${angularVersion}`);
  
  // Détermination du paramètre à utiliser (browserTarget ou buildTarget)
  // À partir d'Angular 15+, buildTarget est utilisé au lieu de browserTarget
  const majorVersion = angularVersion ? parseInt(angularVersion.split('.')[0], 10) : 0;
  
  // Déterminer la commande à exécuter en fonction de l'environnement
  let command;
  
  if (isReplit) {
    // Sur Replit, on utilise toujours la configuration replit
    command = 'cd connect-extension-app && ng serve --configuration=replit --host 0.0.0.0 --port 5000 --disable-host-check --proxy-config proxy.conf.json';
  } else {
    // En local, on utilise la configuration par défaut
    command = 'cd connect-extension-app && ng serve';
  }
  
  console.log(`▶️ Exécution de la commande: ${command}`);
  execSync(command, { stdio: 'inherit' });
  
} catch (error) {
  console.error('❌ Erreur lors du démarrage de l\'application Angular:', error.message);
  process.exit(1);
}