/**
 * Script pour démarrer l'application Angular sur Replit
 * Ce script utilise fix-angular-config.js pour adapter automatiquement
 * la configuration selon la version d'Angular CLI
 */

const { execSync, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Démarrage de l\'application Angular...');

// Chemin vers le répertoire de l'application Angular
const angularAppDir = path.join(__dirname, 'connect-extension-app');

// Vérification que le répertoire existe
if (!fs.existsSync(angularAppDir)) {
  console.error(`❌ Erreur: Le répertoire ${angularAppDir} n'existe pas.`);
  process.exit(1);
}

try {
  // Exécution du script de correction de configuration
  console.log('🔧 Application des corrections automatiques de configuration...');
  execSync('node fix-angular-config.js', { stdio: 'inherit' });
  
  console.log('🚀 Lancement du serveur Angular...');
  
  const args = [
    'serve',
    '--host', '0.0.0.0',
    '--port', '5000',
    '--disable-host-check',
    '--proxy-config', 'proxy.conf.json',
    '--configuration', 'replit'
  ];
  
  console.log(`📋 Commande: ng ${args.join(' ')}`);
  
  // Lancement du processus Angular CLI
  const ngProcess = spawn('ng', args, {
    cwd: angularAppDir,
    stdio: 'inherit',
    shell: true
  });
  
  // Gestion des événements du processus
  ngProcess.on('error', (error) => {
    console.error(`❌ Erreur lors du démarrage d'Angular CLI: ${error.message}`);
    process.exit(1);
  });
  
  ngProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`❌ Angular CLI s'est terminé avec le code: ${code}`);
      process.exit(code);
    }
  });

  // Gestion des signaux pour arrêter proprement le processus
  ['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => {
      ngProcess.kill(signal);
    });
  });
  
} catch (error) {
  console.error(`❌ Erreur: ${error.message}`);
  console.error(error.stack);
  process.exit(1);
}