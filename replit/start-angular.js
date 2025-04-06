/**
 * Script pour démarrer l'application Angular sur Replit
 * Ce script utilise la configuration spécifique à Replit
 */

const { execSync } = require('child_process');
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
logMessage("=== DÉMARRAGE DE L'APPLICATION ANGULAR SUR REPLIT ===", 'magenta');

// Vérifie si nous sommes sur Replit
const isReplit = process.env.REPL_ID && process.env.REPL_OWNER;

if (isReplit) {
  logMessage("✓ Environnement Replit détecté", 'green');
} else {
  logMessage("⚠️ Vous n'êtes pas sur Replit, mais le script va quand même utiliser la configuration Replit", 'yellow');
}

// Chemin de l'application Angular
const angularAppPath = path.join(__dirname, '..', 'connect-extension-app');

// Vérifie si le répertoire de l'application Angular existe
if (!fs.existsSync(angularAppPath)) {
  logMessage(`❌ Le répertoire de l'application Angular n'existe pas : ${angularAppPath}`, 'red');
  process.exit(1);
}

// Chemin du fichier de configuration proxy spécifique à Replit
const proxyConfigPath = path.join(__dirname, 'proxy.conf.replit.json');

// Commande pour démarrer l'application Angular avec la configuration Replit
const command = `cd ${angularAppPath} && npx ng serve --configuration=replit --host 0.0.0.0 --port 5000 --disable-host-check --proxy-config ${proxyConfigPath}`;

logMessage("🚀 Démarrage de l'application Angular avec configuration Replit...", 'cyan');
logMessage(`Commande exécutée : ${command}`, 'blue');

try {
  // Exécution de la commande
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  logMessage(`❌ Erreur lors du démarrage de l'application Angular : ${error.message}`, 'red');
  process.exit(1);
}