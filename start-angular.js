/**
 * Script pour configurer et démarrer l'application Angular sur Replit ou en local
 * Ce script utilise fix-angular-config.js pour adapter automatiquement
 * la configuration selon la version d'Angular CLI
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Détecter si nous sommes sur Replit
const isReplit = process.env.REPL_ID || process.env.REPL_SLUG;

// Vérifier si nous devons uniquement configurer sans démarrer
const configOnly = process.argv.includes('--config-only');

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
  const usesBuildTarget = majorVersion >= 15;
  
  // Si nous sommes en mode configuration uniquement, pas besoin de démarrer l'application
  if (configOnly) {
    console.log('🔧 Configuration terminée en mode config-only. L\'application n\'a pas été démarrée.');
    process.exit(0);
  }
  
  // Déterminer la commande à exécuter en fonction de l'environnement
  let command;
  
  if (isReplit) {
    // Sur Replit, on utilise toujours la configuration replit
    command = 'cd connect-extension-app && ng serve --configuration=replit --host 0.0.0.0 --port 5000 --disable-host-check --proxy-config proxy.conf.json';
  } else {
    // En local, on utilise la configuration par défaut mais on doit restaurer le angular.json original
    // car la configuration locale peut nécessiter browserTarget au lieu de buildTarget selon la version
    
    console.log('🔄 Restauration de la configuration Angular d\'origine pour l\'environnement local...');
    const angularJsonBackupPath = path.join(__dirname, 'connect-extension-app', 'angular.json.bak');
    const angularJsonPath = path.join(__dirname, 'connect-extension-app', 'angular.json');
    
    if (fs.existsSync(angularJsonBackupPath)) {
      fs.copyFileSync(angularJsonBackupPath, angularJsonPath);
      console.log('✅ Configuration originale restaurée!');
    } else {
      console.warn('⚠️ Aucune sauvegarde trouvée, utilisation de la configuration actuelle');
    }
    
    command = 'cd connect-extension-app && ng serve';
  }
  
  console.log(`▶️ Exécution de la commande: ${command}`);
  execSync(command, { stdio: 'inherit' });
  
} catch (error) {
  console.error('❌ Erreur lors du démarrage de l\'application Angular:', error.message);
  process.exit(1);
}