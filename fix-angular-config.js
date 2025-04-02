/**
 * Script pour corriger la configuration Angular
 * Ce script détecte automatiquement la version d'Angular CLI et 
 * ajuste la configuration en conséquence (browserTarget vs buildTarget)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Détecter si nous sommes sur Replit
const isReplit = process.env.REPL_ID || process.env.REPL_SLUG;

console.log('🔧 Correction automatique de la configuration Angular...');
console.log(`🔍 Environnement détecté: ${isReplit ? 'Replit' : 'Local'}`);

// Chemins des fichiers
const angularAppDir = path.join(__dirname, 'connect-extension-app');
const angularJsonPath = path.join(angularAppDir, 'angular.json');
const angularJsonBackupPath = path.join(angularAppDir, 'angular.json.bak');

// Vérification de l'existence du fichier angular.json
if (!fs.existsSync(angularJsonPath)) {
  console.error("❌ Erreur: Le fichier " + angularJsonPath + " n'existe pas.");
  process.exit(1);
}

try {
  // Détection de la version d'Angular CLI
  console.log("🔍 Détection de la version d'Angular CLI...");
  let angularVersion;
  try {
    const versionOutput = execSync('cd connect-extension-app && ng version', { encoding: 'utf8' });
    const versionMatch = versionOutput.match(/Angular CLI: (\d+\.\d+\.\d+)/);
    if (versionMatch && versionMatch[1]) {
      angularVersion = versionMatch[1];
      console.log("✅ Version d'Angular CLI détectée: " + angularVersion);
    } else {
      console.warn("⚠️ Impossible de détecter la version précise, utilisation des paramètres par défaut");
      angularVersion = '0.0.0'; // Version fictive pour le traitement par défaut
    }
  } catch (error) {
    console.warn("⚠️ Erreur lors de la détection de version: " + error.message);
    console.warn("⚠️ Utilisation des paramètres par défaut");
    angularVersion = '0.0.0'; // Version fictive pour le traitement par défaut
  }

  // Détermination du paramètre à utiliser (browserTarget ou buildTarget)
  // À partir d'Angular 15+, buildTarget est utilisé au lieu de browserTarget
  const majorVersion = parseInt(angularVersion.split('.')[0], 10) || 0;
  
  // Le comportement est différent selon l'environnement
  let usesBuildTarget;
  let targetParamName;
  
  if (isReplit) {
    // Sur Replit, Angular 19 utilise forcément buildTarget
    usesBuildTarget = true;
    targetParamName = 'buildTarget';
  } else {
    // En local, on respecte la version de Angular
    usesBuildTarget = majorVersion >= 15;
    targetParamName = usesBuildTarget ? 'buildTarget' : 'browserTarget';
  }
  
  console.log("🔧 Utilisation du paramètre \"" + targetParamName + "\" pour cette version d'Angular (v" + majorVersion + "+) en environnement " + (isReplit ? 'Replit' : 'local'));

  // Création d'une sauvegarde si elle n'existe pas déjà
  if (!fs.existsSync(angularJsonBackupPath)) {
    console.log("💾 Création d'une sauvegarde du fichier angular.json...");
    fs.copyFileSync(angularJsonPath, angularJsonBackupPath);
  } else {
    console.log("💾 Une sauvegarde du fichier angular.json existe déjà.");
  }
  
  // Lecture et analyse du fichier angular.json
  console.log("📂 Lecture du fichier de configuration...");
  const angularJsonContent = fs.readFileSync(angularJsonPath, 'utf8');
  const angularJson = JSON.parse(angularJsonContent);
  
  // Récupération du nom du premier projet dans angular.json
  const oldProjectName = Object.keys(angularJson.projects)[0];
  const newProjectName = 'connect-extension-app';
  
  console.log("🔄 Renommage du projet de \"" + oldProjectName + "\" à \"" + newProjectName + "\"...");
  
  // Renommer le projet si nécessaire
  if (oldProjectName !== newProjectName) {
    angularJson.projects[newProjectName] = angularJson.projects[oldProjectName];
    delete angularJson.projects[oldProjectName];
    
    // Mettre à jour le projet par défaut si nécessaire
    if (angularJson.defaultProject === oldProjectName) {
      angularJson.defaultProject = newProjectName;
    }
  }
  
  // Mise à jour des configurations serve
  console.log("🔧 Mise à jour des configurations...");
  if (angularJson.projects[newProjectName].architect && 
      angularJson.projects[newProjectName].architect.serve) {
    
    const serve = angularJson.projects[newProjectName].architect.serve;
    
    // Mise à jour des options principales
    if (serve.options) {
      // Suppression des deux paramètres pour éviter les doublons
      if (serve.options.browserTarget) delete serve.options.browserTarget;
      if (serve.options.buildTarget) delete serve.options.buildTarget;
      
      // Ajout du paramètre correct
      serve.options[targetParamName] = newProjectName + ":build";
    }
    
    // Mise à jour des configurations spécifiques
    if (serve.configurations) {
      Object.keys(serve.configurations).forEach(configName => {
        const config = serve.configurations[configName];
        
        // Suppression des deux paramètres pour éviter les doublons
        if (config.browserTarget) delete config.browserTarget;
        if (config.buildTarget) delete config.buildTarget;
        
        // Ajout du paramètre correct
        config[targetParamName] = newProjectName + ":build:" + configName;
      });
    }
  }
  
  // Écriture du fichier mis à jour
  console.log("💾 Enregistrement des modifications...");
  fs.writeFileSync(angularJsonPath, JSON.stringify(angularJson, null, 2));
  
  console.log("✅ Configuration Angular mise à jour avec succès!");
  console.log("🔄 Pour restaurer la configuration d'origine: cp " + angularJsonBackupPath + " " + angularJsonPath);
  
} catch (error) {
  console.error("❌ Erreur lors du traitement de angular.json: " + error.message);
  console.error(error.stack);
  process.exit(1);
}