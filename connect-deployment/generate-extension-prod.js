#!/usr/bin/env node

/**
 * Script de génération de l'extension Chrome Connect (Version Production)
 * Ce script utilise le build production standard d'Angular
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const config = {
    angularAppDir: path.join(__dirname, '..', 'connect-extension-app'),
    extensionDir: path.join(__dirname, '..', 'connect-extension-chrome'),
    outputDir: path.join(__dirname, '..', 'connect-extension-dist'),
    buildCommand: 'npx ng build --configuration prod-extension',
    buildOutputDir: path.join(__dirname, '..', 'connect-extension-app', 'dist')
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
    logMessage('Extension Connect - Outil de génération d\'extension (Mode Production)', 'bright');
    logMessage('==================================================================', 'bright');
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
 * Build l'application Angular en mode production
 */
function buildAngularApp() {
    logMessage('Construction de l\'application Angular en mode production...', 'cyan');
    
    try {
        // Exécute le build Angular
        execSync(config.buildCommand, { 
            cwd: config.angularAppDir,
            stdio: 'inherit' 
        });
        
        logMessage('✓ Application Angular compilée avec succès', 'green');
        return true;
    } catch (error) {
        logMessage(`⚠ Erreur lors de la compilation Angular: ${error.message}`, 'red');
        logMessage('La compilation a échoué, vérifiez les erreurs ci-dessus.', 'yellow');
        return false;
    }
}

/**
 * Trouve les fichiers générés avec hash dans le répertoire de build
 * @param {string} prefix - Préfixe du fichier (ex: 'main', 'runtime', etc.)
 * @param {string} extension - Extension du fichier (ex: 'js', 'css')
 * @returns {string|null} - Nom du fichier avec hash ou null si non trouvé
 */
function findHashedFile(prefix, extension) {
    try {
        const files = fs.readdirSync(config.buildOutputDir);
        const pattern = new RegExp(`^${prefix}\\.[a-f0-9]+\\.${extension}$`);
        const matchingFile = files.find(file => pattern.test(file));
        return matchingFile || null;
    } catch (error) {
        logMessage(`⚠ Erreur lors de la recherche de fichiers avec hash: ${error.message}`, 'yellow');
        return null;
    }
}

/**
 * Met à jour le HTML de la sidebar pour référencer les fichiers avec hash
 */
function updateSidebarHtml() {
    const sidebarHtmlPath = path.join(config.outputDir, 'sidebar.html');
    
    if (!fs.existsSync(sidebarHtmlPath)) {
        logMessage('⚠ Le fichier sidebar.html n\'existe pas dans le répertoire de sortie', 'yellow');
        return;
    }
    
    try {
        let content = fs.readFileSync(sidebarHtmlPath, 'utf8');
        
        // Trouver les fichiers avec hash générés par Angular
        const runtimeFile = findHashedFile('runtime', 'js');
        const polyfillsFile = findHashedFile('polyfills', 'js');
        const mainFile = findHashedFile('main', 'js');
        const stylesFile = findHashedFile('styles', 'css');
        
        // Remplacer les références dans le HTML
        if (runtimeFile && polyfillsFile && mainFile) {
            content = content.replace(
                /<script src="runtime\.js"><\/script>\s*<script src="polyfills\.js"><\/script>\s*<script src="vendor\.js"><\/script>\s*<script src="main\.js"><\/script>/,
                `<script src="${runtimeFile}"></script>\n  <script src="${polyfillsFile}"></script>\n  <script src="${mainFile}"></script>`
            );
            
            // Mettre à jour la référence au CSS si nécessaire
            if (stylesFile && content.includes('href="styles.css"')) {
                content = content.replace(
                    'href="styles.css"',
                    `href="${stylesFile}"`
                );
            }
            
            fs.writeFileSync(sidebarHtmlPath, content);
            logMessage('✓ Références aux fichiers mis à jour dans sidebar.html', 'green');
        } else {
            logMessage('⚠ Impossible de trouver tous les fichiers avec hash nécessaires', 'yellow');
        }
    } catch (error) {
        logMessage(`⚠ Erreur lors de la mise à jour de sidebar.html: ${error.message}`, 'red');
    }
}

/**
 * Génère l'extension Chrome
 */
function generateExtension() {
    displayTitle();
    
    // Nettoyer le répertoire de sortie
    cleanOutputDirectory();
    
    // Build l'application Angular
    const buildSuccess = buildAngularApp();
    if (!buildSuccess) {
        logMessage('La génération de l\'extension ne peut pas continuer en raison d\'erreurs de compilation.', 'red');
        process.exit(1);
    }
    
    // Copier les fichiers générés par le build
    logMessage(`Copie des fichiers compilés vers ${config.outputDir}...`, 'cyan');
    
    try {
        // Vérifier que le répertoire de build existe
        if (!fs.existsSync(config.buildOutputDir)) {
            logMessage(`⚠ Le répertoire de build n'existe pas: ${config.buildOutputDir}`, 'red');
            process.exit(1);
        }
        
        // Copier les fichiers du build Angular
        fs.readdirSync(config.buildOutputDir).forEach(file => {
            const srcPath = path.join(config.buildOutputDir, file);
            const destPath = path.join(config.outputDir, file);
            copyFileOrDirectory(srcPath, destPath);
        });
        
        // Copier les icônes depuis le dossier icons (si existe)
        const iconsSrc = path.join(config.extensionDir, 'icons');
        if (fs.existsSync(iconsSrc)) {
            const iconsDest = path.join(config.outputDir, 'icons');
            copyFileOrDirectory(iconsSrc, iconsDest);
            logMessage('✅ Icônes du dossier copiées', 'green');
        }
        
        // Copier l'icône principale icon.png si elle existe
        const iconSrc = path.join(config.extensionDir, 'icon.png');
        if (fs.existsSync(iconSrc)) {
            const iconDest = path.join(config.outputDir, 'icon.png');
            fs.copyFileSync(iconSrc, iconDest);
            logMessage('✅ icon.png copié', 'green');
        } else {
            logMessage('⚠ Attention: icon.png n\'existe pas dans le répertoire source', 'yellow');
        }
        
        logMessage('✓ Fichiers de build copiés avec succès', 'green');
    } catch (error) {
        logMessage(`⚠ Erreur lors de la copie des fichiers de build: ${error.message}`, 'red');
        process.exit(1);
    }
    
    // Copier les fichiers de l'extension Chrome
    logMessage(`Copie des fichiers de l'extension Chrome vers ${config.outputDir}...`, 'cyan');
    
    try {
        fs.readdirSync(config.extensionDir).forEach(file => {
            const srcPath = path.join(config.extensionDir, file);
            const destPath = path.join(config.outputDir, file);
            
            // Ne pas écraser les fichiers existants de Angular (comme index.html)
            if (!fs.existsSync(destPath)) {
                copyFileOrDirectory(srcPath, destPath);
            } else {
                // Pour les fichiers qui existent à la fois dans le build et l'extension,
                // nous choisissons de conserver ceux de l'extension
                if (file === 'manifest.json' || file === 'background.js' || file === 'sidebar.js' || file === 'sidebar.html') {
                    copyFileOrDirectory(srcPath, destPath);
                }
            }
        });
        
        logMessage('✓ Fichiers de l\'extension copiés avec succès', 'green');
    } catch (error) {
        logMessage(`⚠ Erreur lors de la copie des fichiers de l'extension: ${error.message}`, 'red');
    }
    
    // Mettre à jour le HTML pour référencer les fichiers avec hash
    updateSidebarHtml();
    
    // Copier les icônes si nécessaire
    try {
        const iconSvgPath = path.join(config.extensionDir, 'icon.svg');
        const iconPngPath = path.join(config.outputDir, 'icon.png');
        
        if (fs.existsSync(iconSvgPath) && !fs.existsSync(iconPngPath)) {
            copyFileOrDirectory(iconSvgPath, path.join(config.outputDir, 'icon.svg'));
            logMessage('✓ Icône SVG copiée', 'green');
        }
    } catch (error) {
        logMessage(`⚠ Erreur lors de la copie de l'icône: ${error.message}`, 'yellow');
    }
    
    // Création réussie
    logMessage(`Extension générée avec succès dans le répertoire: ${config.outputDir}`, 'green');
    logMessage('Pour installer l\'extension dans Chrome:', 'cyan');
    logMessage('1. Ouvrez chrome://extensions/', 'cyan');
    logMessage('2. Activez le \'Mode développeur\'', 'cyan');
    logMessage('3. Cliquez sur \'Charger l\'extension non empaquetée\'', 'cyan');
    logMessage(`4. Sélectionnez le répertoire ${config.outputDir}`, 'cyan');
}

// Exécuter la fonction principale
generateExtension();