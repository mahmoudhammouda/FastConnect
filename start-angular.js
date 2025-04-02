/**
 * Script pour démarrer l'application Angular sur Replit
 * Ce script permet de faire fonctionner l'application avec la configuration actuelle de angular.json
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Démarrage de l\'application Angular...');

// Chemin vers le répertoire de l'application Angular
const angularAppDir = path.join(__dirname, 'connect-extension-app');

// Vérification que le répertoire existe
if (!fs.existsSync(angularAppDir)) {
  console.error(`Erreur: Le répertoire ${angularAppDir} n'existe pas.`);
  process.exit(1);
}

// Lecture du fichier angular.json pour déterminer le nom du projet
try {
  const angularJsonPath = path.join(angularAppDir, 'angular.json');
  const angularJsonContent = fs.readFileSync(angularJsonPath, 'utf8');
  const angularJson = JSON.parse(angularJsonContent);
  
  // Récupération du nom du premier projet dans angular.json
  const projectName = Object.keys(angularJson.projects)[0];
  
  console.log(`Nom du projet détecté dans angular.json: ${projectName}`);
  
  // Construction de la commande avec le nom de projet correct
  const args = [
    'serve',
    '--project', projectName,
    '--host', '0.0.0.0',
    '--port', '5000',
    '--disable-host-check',
    '--proxy-config', 'proxy.conf.json',
    '--configuration', 'replit'
  ];
  
  console.log(`Exécution de la commande: ng ${args.join(' ')}`);
  
  // Lancement du processus Angular CLI
  const ngProcess = spawn('ng', args, {
    cwd: angularAppDir,
    stdio: 'inherit',
    shell: true
  });
  
  // Gestion des événements du processus
  ngProcess.on('error', (error) => {
    console.error(`Erreur lors du démarrage d'Angular CLI: ${error.message}`);
    process.exit(1);
  });
  
  ngProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`Angular CLI s'est terminé avec le code: ${code}`);
      process.exit(code);
    }
  });
  
} catch (error) {
  console.error(`Erreur lors de la lecture de angular.json: ${error.message}`);
  process.exit(1);
}