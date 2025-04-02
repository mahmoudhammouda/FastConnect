/**
 * Script pour corriger la configuration Angular
 * Ce script crée une copie temporaire du fichier angular.json avec le nom du projet
 * renommé pour qu'il corresponde au nom du répertoire
 */

const fs = require('fs');
const path = require('path');

console.log('Correction de la configuration Angular...');

// Chemins des fichiers
const angularAppDir = path.join(__dirname, 'connect-extension-app');
const angularJsonPath = path.join(angularAppDir, 'angular.json');
const angularJsonBackupPath = path.join(angularAppDir, 'angular.json.bak');

// Vérification de l'existence du fichier angular.json
if (!fs.existsSync(angularJsonPath)) {
  console.error(`Erreur: Le fichier ${angularJsonPath} n'existe pas.`);
  process.exit(1);
}

try {
  // Lecture du fichier angular.json
  const angularJsonContent = fs.readFileSync(angularJsonPath, 'utf8');
  const angularJson = JSON.parse(angularJsonContent);
  
  // Récupération du nom du premier projet dans angular.json
  const oldProjectName = Object.keys(angularJson.projects)[0];
  const newProjectName = 'connect-extension-app';
  
  console.log(`Renommage du projet de "${oldProjectName}" à "${newProjectName}"...`);
  
  // Création d'une sauvegarde
  fs.writeFileSync(angularJsonBackupPath, angularJsonContent);
  console.log(`Sauvegarde créée: ${angularJsonBackupPath}`);
  
  // Renommer le projet
  angularJson.projects[newProjectName] = angularJson.projects[oldProjectName];
  delete angularJson.projects[oldProjectName];
  
  // Mettre à jour toutes les références au nom du projet
  if (angularJson.defaultProject === oldProjectName) {
    angularJson.defaultProject = newProjectName;
  }
  
  // Mise à jour des références dans les configurations serve et build
  Object.values(angularJson.projects).forEach(project => {
    if (project.architect && project.architect.serve) {
      const serve = project.architect.serve;
      if (serve.options && serve.options.browserTarget) {
        serve.options.browserTarget = serve.options.browserTarget.replace(
          oldProjectName, newProjectName
        );
      }
      
      if (serve.configurations) {
        Object.values(serve.configurations).forEach(config => {
          if (config.browserTarget) {
            config.browserTarget = config.browserTarget.replace(
              oldProjectName, newProjectName
            );
          }
        });
      }
    }
  });
  
  // Écriture du fichier mis à jour
  fs.writeFileSync(angularJsonPath, JSON.stringify(angularJson, null, 2));
  console.log(`Configuration Angular mise à jour avec succès.`);
  
  console.log(`Pour restaurer la configuration d'origine, exécutez:`);
  console.log(`cp ${angularJsonBackupPath} ${angularJsonPath}`);
  
} catch (error) {
  console.error(`Erreur lors du traitement de angular.json: ${error.message}`);
  process.exit(1);
}