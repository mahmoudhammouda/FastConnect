/**
 * Script pour démarrer l'API .NET Core sur Replit
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
logMessage("=== DÉMARRAGE DE L'API .NET CORE SUR REPLIT ===", 'magenta');

// Vérifie si nous sommes sur Replit
const isReplit = process.env.REPL_ID && process.env.REPL_OWNER;

if (isReplit) {
  logMessage("✓ Environnement Replit détecté", 'green');
} else {
  logMessage("⚠️ Vous n'êtes pas sur Replit, mais le script va quand même utiliser la configuration Replit", 'yellow');
}

// Chemin de l'API .NET Core
const apiPath = path.join(__dirname, '..', 'connect-api');

// Vérifie si le répertoire de l'API existe
if (!fs.existsSync(apiPath)) {
  logMessage(`❌ Le répertoire de l'API n'existe pas : ${apiPath}`, 'red');
  process.exit(1);
}

// Commande pour démarrer l'API avec la bonne URL sur Replit
const command = `cd ${apiPath} && dotnet run --urls=http://0.0.0.0:8000`;

logMessage("🚀 Démarrage de l'API .NET Core...", 'cyan');
logMessage(`Commande exécutée : ${command}`, 'blue');

try {
  // Exécution de la commande
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  logMessage(`❌ Erreur lors du démarrage de l'API : ${error.message}`, 'red');
  process.exit(1);
}