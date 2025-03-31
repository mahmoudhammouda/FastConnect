#!/usr/bin/env node

/**
 * Script de génération de l'extension Chrome Connect
 * Ce script utilise Node.js pour générer l'extension à partir de l'application Angular
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const { execSync } = require('child_process');

// Configuration
const config = {
    serverUrl: 'http://localhost:5000',
    extensionDir: path.join(__dirname, 'connect-extension-chrome'),
    outputDir: path.join(__dirname, 'connect-extension-dist'),
    maxRetries: 5,
    retryDelay: 2000 // 2 secondes
};

// Couleurs pour les messages de console
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

/**
 * Affiche un message coloré dans la console
 * @param {string} message - Le message à afficher
 * @param {string} color - La couleur à utiliser (clé de l'objet colors)
 */
function logMessage(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Affiche le titre de l'application
 */
function displayTitle() {
    console.log('\n');
    logMessage('Extension Connect - Outil de génération d\'extension', 'bright');
    logMessage('==================================================', 'bright');
}

/**
 * Vérifie si le serveur Angular est en cours d'exécution
 * @returns {Promise<boolean>} - true si le serveur est accessible
 */
async function checkAngularRunning() {
    logMessage('Vérification si le serveur Angular est en cours d\'exécution...', 'cyan');
    
    let retries = 0;
    
    while (retries < config.maxRetries) {
        try {
            const response = await new Promise((resolve, reject) => {
                http.get(config.serverUrl, (res) => {
                    if (res.statusCode === 200) {
                        resolve(res);
                    } else {
                        reject(new Error(`Statut HTTP: ${res.statusCode}`));
                    }
                }).on('error', reject);
            });
            
            logMessage(`✓ Serveur Angular détecté sur ${config.serverUrl}`, 'green');
            return true;
        } catch (error) {
            retries++;
            logMessage(`Tentative ${retries}/${config.maxRetries} - Serveur Angular non détecté, nouvelle vérification dans ${config.retryDelay/1000} secondes...`, 'yellow');
            await new Promise(resolve => setTimeout(resolve, config.retryDelay));
        }
    }
    
    logMessage(`Le serveur Angular n'est pas accessible après ${config.maxRetries} tentatives.`, 'red');
    logMessage("Assurez-vous que le workflow 'Angular Frontend' est démarré et fonctionne correctement.", 'cyan');
    process.exit(1);
}

/**
 * Télécharge un fichier depuis le serveur de développement
 * @param {string} filename - Le nom du fichier à télécharger
 * @param {string} outputPath - Le chemin où sauvegarder le fichier
 * @returns {Promise<void>}
 */
function downloadFile(filename, outputPath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(outputPath);
        const url = `${config.serverUrl}/${filename}`;
        
        http.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Échec du téléchargement: ${response.statusCode}`));
                return;
            }
            
            response.pipe(file);
            
            file.on('finish', () => {
                file.close();
                logMessage(`✓ Fichier ${filename} téléchargé avec succès`, 'green');
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(outputPath, () => {}); // Suppression du fichier en cas d'erreur
            logMessage(`⚠ Erreur lors du téléchargement de ${filename}: ${err.message}`, 'red');
            reject(err);
        });
    });
}

/**
 * Crée un répertoire s'il n'existe pas déjà
 * @param {string} dirPath - Le chemin du répertoire
 */
function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        logMessage(`Répertoire créé: ${dirPath}`, 'cyan');
    }
}

/**
 * Copie un fichier ou un répertoire
 * @param {string} src - Chemin source
 * @param {string} dest - Chemin de destination
 */
function copyFileOrDirectory(src, dest) {
    try {
        if (fs.statSync(src).isDirectory()) {
            ensureDirectoryExists(dest);
            
            fs.readdirSync(src).forEach(file => {
                const srcPath = path.join(src, file);
                const destPath = path.join(dest, file);
                copyFileOrDirectory(srcPath, destPath);
            });
        } else {
            fs.copyFileSync(src, dest);
        }
    } catch (error) {
        logMessage(`⚠ Erreur lors de la copie de ${src} vers ${dest}: ${error.message}`, 'red');
    }
}

/**
 * Nettoie le répertoire de sortie
 */
function cleanOutputDirectory() {
    if (fs.existsSync(config.outputDir)) {
        try {
            // Supprime le contenu du répertoire
            fs.readdirSync(config.outputDir).forEach(file => {
                const filePath = path.join(config.outputDir, file);
                if (fs.statSync(filePath).isDirectory()) {
                    fs.rmSync(filePath, { recursive: true, force: true });
                } else {
                    fs.unlinkSync(filePath);
                }
            });
            logMessage(`Répertoire de sortie nettoyé: ${config.outputDir}`, 'cyan');
        } catch (error) {
            logMessage(`⚠ Erreur lors du nettoyage du répertoire: ${error.message}`, 'red');
        }
    } else {
        ensureDirectoryExists(config.outputDir);
    }
}

/**
 * Génère l'extension Chrome
 */
async function generateExtension() {
    logMessage('Génération de l\'extension Chrome...', 'cyan');
    
    // Nettoyer le répertoire de sortie
    cleanOutputDirectory();
    
    // Copier les fichiers de l'extension chrome
    try {
        fs.readdirSync(config.extensionDir).forEach(file => {
            const srcPath = path.join(config.extensionDir, file);
            const destPath = path.join(config.outputDir, file);
            copyFileOrDirectory(srcPath, destPath);
        });
        logMessage(`Fichiers de l'extension copiés vers ${config.outputDir}`, 'cyan');
    } catch (error) {
        logMessage(`⚠ Erreur lors de la copie des fichiers: ${error.message}`, 'red');
        process.exit(1);
    }
    
    // Télécharger les fichiers Angular
    logMessage('Téléchargement des fichiers depuis le serveur de développement...', 'cyan');
    
    const files = ['runtime.js', 'polyfills.js', 'main.js', 'vendor.js', 'styles.css', 'styles.js'];
    
    // Créer un répertoire assets pour l'extension
    ensureDirectoryExists(path.join(config.outputDir, 'assets'));
    
    try {
        // Télécharger tous les fichiers en parallèle
        await Promise.all([
            ...files.map(file => downloadFile(file, path.join(config.outputDir, file))),
            downloadFile('favicon.ico', path.join(config.outputDir, 'assets', 'favicon.ico'))
        ]);
    } catch (error) {
        logMessage(`⚠ Des erreurs se sont produites pendant le téléchargement des fichiers: ${error.message}`, 'yellow');
    }
    
    // Tenter de convertir SVG en PNG pour l'icône si nécessaire
    try {
        const iconSvgPath = path.join(config.extensionDir, 'icon.svg');
        const iconPngPath = path.join(config.outputDir, 'icon.png');
        
        if (fs.existsSync(iconSvgPath) && !fs.existsSync(iconPngPath)) {
            // Pour l'instant, on se contente de copier le SVG
            // La conversion nécessiterait des dépendances externes
            logMessage('⚠ Conversion SVG vers PNG non disponible en JavaScript pur', 'yellow');
            logMessage('✓ Utilisation du fichier SVG existant', 'green');
        }
    } catch (error) {
        logMessage(`⚠ Erreur lors de la gestion de l'icône: ${error.message}`, 'yellow');
    }
    
    logMessage(`Extension générée avec succès dans le répertoire: ${config.outputDir}`, 'green');
    logMessage('Pour installer l\'extension dans Chrome:', 'cyan');
    logMessage('1. Ouvrez chrome://extensions/', 'cyan');
    logMessage('2. Activez le \'Mode développeur\'', 'cyan');
    logMessage('3. Cliquez sur \'Charger l\'extension non empaquetée\'', 'cyan');
    logMessage(`4. Sélectionnez le répertoire ${config.outputDir}`, 'cyan');
}

/**
 * Fonction principale
 */
async function main() {
    displayTitle();
    
    // Vérifier que le serveur Angular est en cours d'exécution
    await checkAngularRunning();
    
    // Générer l'extension
    await generateExtension();
}

// Exécuter la fonction principale
main().catch(error => {
    logMessage(`⚠ Erreur fatale: ${error.message}`, 'red');
    process.exit(1);
});