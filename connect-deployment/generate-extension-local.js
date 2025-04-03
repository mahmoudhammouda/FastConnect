#!/usr/bin/env node

/**
 * Script de génération de l'extension Chrome Connect (Version Locale)
 * Ce script utilise le build local-extension d'Angular
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const config = {
    angularAppDir: path.join(__dirname, '..', 'connect-extension-app'),
    extensionDir: path.join(__dirname, '..', 'connect-extension-chrome'),
    outputDir: path.join(__dirname, '..', 'connect-extension-dist'),
    buildCommand: 'npx ng build --configuration local-extension',
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
    logMessage('Extension Connect - Outil de génération d\'extension (Mode Local)', 'bright');
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
 * Build l'application Angular
 */
function buildAngularApp() {
    try {
        logMessage('Construction de l\'application Angular (configuration local-extension)...', 'yellow');
        process.chdir(config.angularAppDir);
        execSync(config.buildCommand, { stdio: 'inherit' });
        logMessage('✅ Application Angular construite avec succès!', 'green');
    } catch (error) {
        logMessage(`❌ Erreur lors de la construction de l'application: ${error.message}`, 'red');
        process.exit(1);
    }
}

/**
 * Trouve les fichiers générés avec hash dans le répertoire de build
 * @param {string} prefix - Préfixe du fichier (ex: 'main', 'runtime', etc.)
 * @param {string} extension - Extension du fichier (ex: 'js', 'css')
 * @returns {string|null} - Nom du fichier avec hash ou null si non trouvé
 */
function findHashedFile(prefix, extension) {
    const buildDir = config.buildOutputDir;
    const files = fs.readdirSync(buildDir);
    
    const regex = new RegExp(`^${prefix}\.?([a-zA-Z0-9]+)?\.${extension}$`);
    for (const file of files) {
        if (regex.test(file)) {
            return file;
        }
    }
    
    return null;
}

/**
 * Met à jour le HTML de la sidebar pour référencer les fichiers avec hash
 */
function updateSidebarHtml() {
    const sidebarPath = path.join(config.extensionDir, 'sidebar.html');
    const outputSidebarPath = path.join(config.outputDir, 'sidebar.html');
    
    try {
        // Lire le contenu HTML
        let html = fs.readFileSync(sidebarPath, 'utf8');
        
        // Trouver les fichiers hachés
        const runtimeJs = findHashedFile('runtime', 'js');
        const polyfillsJs = findHashedFile('polyfills', 'js');
        const mainJs = findHashedFile('main', 'js');
        const stylesCSS = findHashedFile('styles', 'css');
        
        // Remplacer les références
        if (runtimeJs) html = html.replace(/runtime\.[a-zA-Z0-9]+\.js|runtime\.js/, runtimeJs);
        if (polyfillsJs) html = html.replace(/polyfills\.[a-zA-Z0-9]+\.js|polyfills\.js/, polyfillsJs);
        if (mainJs) html = html.replace(/main\.[a-zA-Z0-9]+\.js|main\.js/, mainJs);
        if (stylesCSS) html = html.replace(/styles\.[a-zA-Z0-9]+\.css|styles\.css/, stylesCSS);
        
        // Écrire le fichier mis à jour
        fs.writeFileSync(outputSidebarPath, html);
        logMessage('✅ HTML de la sidebar mis à jour avec les noms de fichiers hachés', 'green');
    } catch (error) {
        logMessage(`❌ Erreur lors de la mise à jour du HTML: ${error.message}`, 'red');
    }
}

/**
 * Génère l'extension Chrome
 */
function generateExtension() {
    try {
        displayTitle();
        
        // 1. Nettoyage du répertoire de sortie
        logMessage('Étape 1: Nettoyage du répertoire de sortie...', 'yellow');
        cleanOutputDirectory();
        
        // 2. Build de l'application Angular
        logMessage('Étape 2: Build de l\'application Angular...', 'yellow');
        buildAngularApp();
        
        // 3. Copie des fichiers spécifiques de l'extension
        logMessage('Étape 3: Copie des fichiers de l\'extension...', 'yellow');
        
        // Copier le manifest.json
        const manifestSrc = path.join(config.extensionDir, 'manifest.json');
        const manifestDest = path.join(config.outputDir, 'manifest.json');
        fs.copyFileSync(manifestSrc, manifestDest);
        logMessage('✅ manifest.json copié', 'green');
        
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
        
        // Copier les scripts de background et autres fichiers JS
        const backgroundSrc = path.join(config.extensionDir, 'background.js');
        if (fs.existsSync(backgroundSrc)) {
            const backgroundDest = path.join(config.outputDir, 'background.js');
            fs.copyFileSync(backgroundSrc, backgroundDest);
            logMessage('✅ background.js copié', 'green');
        }
        
        // 4. Copier les fichiers de build Angular
        logMessage('Étape 4: Copie des fichiers de build...', 'yellow');
        copyFileOrDirectory(config.buildOutputDir, config.outputDir);
        logMessage('✅ Fichiers de build copiés', 'green');
        
        // 5. Mettre à jour le HTML de sidebar
        logMessage('Étape 5: Mise à jour des références dans sidebar.html...', 'yellow');
        updateSidebarHtml();
        
        logMessage('\n✅ Extension générée avec succès!', 'bright');
        logMessage(`📁 L'extension est disponible dans: ${config.outputDir}`, 'bright');
        logMessage('\nPour installer l\'extension dans Chrome:');
        logMessage('1. Ouvrez chrome://extensions/', 'cyan');
        logMessage('2. Activez le "Mode développeur"', 'cyan');
        logMessage('3. Cliquez sur "Charger l\'extension non empaquetée"', 'cyan');
        logMessage(`4. Sélectionnez le dossier: ${config.outputDir}`, 'cyan');
        
    } catch (error) {
        logMessage(`\n❌ Erreur lors de la génération de l'extension: ${error.message}`, 'red');
        process.exit(1);
    }
}

// Exécuter la fonction principale
generateExtension();
