/**
 * Script pour démarrer tous les services sur Replit
 * Ce script utilise PM2 pour gérer les processus
 */

const { execSync, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Couleurs pour les messages console
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
};

/**
 * Affiche un message coloré dans la console
 * @param {string} message - Le message à afficher
 * @param {string} color - La couleur à utiliser (clé de l'objet colors)
 */
function logMessage(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Message de démarrage
logMessage("=== DÉMARRAGE DE TOUS LES SERVICES SUR REPLIT ===", 'magenta');

// Vérifie si nous sommes sur Replit
const isReplit = process.env.REPL_ID && process.env.REPL_OWNER;

if (isReplit) {
  logMessage("✓ Environnement Replit détecté", 'green');
} else {
  logMessage("⚠️ Vous n'êtes pas sur Replit, mais le script va quand même utiliser la configuration Replit", 'yellow');
}

// Chemins des scripts
const apiScript = path.join(__dirname, 'start-api.js');
const angularScript = path.join(__dirname, 'start-angular.js');

// Vérifie si les scripts existent
if (!fs.existsSync(apiScript)) {
  logMessage(`❌ Le script de l'API n'existe pas : ${apiScript}`, 'red');
  process.exit(1);
}

if (!fs.existsSync(angularScript)) {
  logMessage(`❌ Le script de l'application Angular n'existe pas : ${angularScript}`, 'red');
  process.exit(1);
}

// Fonction pour démarrer un script en arrière-plan
function startScript(scriptPath, name) {
  logMessage(`🚀 Démarrage de ${name}...`, 'cyan');
  
  const process = spawn('node', [scriptPath], {
    detached: true,
    stdio: 'inherit'
  });
  
  process.unref();
  return process;
}

// Démarrage de l'API
logMessage("🌐 Démarrage de l'API .NET Core", 'blue');
const apiProcess = startScript(apiScript, "l'API .NET Core");

// Délai avant de démarrer Angular (pour laisser le temps à l'API de démarrer)
logMessage("⏳ Attente de 5 secondes avant de démarrer l'application Angular...", 'yellow');
setTimeout(() => {
  // Démarrage de l'application Angular
  logMessage("🌐 Démarrage de l'application Angular", 'blue');
  const angularProcess = startScript(angularScript, "l'application Angular");
  
  logMessage("✅ Tous les services ont été démarrés avec succès !", 'green');
  logMessage("📌 API disponible sur : http://0.0.0.0:8000", 'cyan');
  logMessage("📌 Application Angular disponible sur : http://0.0.0.0:5000", 'cyan');
}, 5000);

// Gestion des signaux pour arrêter proprement les processus
process.on('SIGINT', () => {
  logMessage("🛑 Arrêt des services...", 'yellow');
  process.exit();
});