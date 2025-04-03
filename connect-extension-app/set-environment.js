/**
 * Script de détection automatique d'environnement et configuration pour FastConnect
 * Ce script détecte si nous sommes sur Replit ou en local et applique automatiquement la bonne configuration
 */

const fs = require('fs');
const path = require('path');

// Détecter si nous sommes sur Replit
const isReplit = process.env.REPL_ID || process.env.REPL_SLUG;
const environment = isReplit ? 'replit' : 'local';

console.log(`🔍 Détection automatique de l'environnement: ${environment}`);
console.log(`💾 Configuration de l'environnement pour FastConnect...`);

// Chemins des fichiers
const sourceFile = path.join(__dirname, `src/environments/environment.${environment}.ts`);
const targetFile = path.join(__dirname, 'src/environments/environment.ts');

// Vérifier que le fichier source existe
if (!fs.existsSync(sourceFile)) {
    console.error(`❌ Erreur: Le fichier d'environnement ${sourceFile} n'existe pas.`);
    process.exit(1);
}

// Copier le fichier d'environnement approprié
try {
    const envContent = fs.readFileSync(sourceFile, 'utf8');
    fs.writeFileSync(targetFile, envContent);
    console.log(`✅ Environnement '${environment}' appliqué avec succès.`);
    console.log(`📄 Contenu: ${envContent.split('\n')[0]}...`);
} catch (error) {
    console.error(`❌ Erreur lors de la copie du fichier d'environnement:`, error.message);
    process.exit(1);
}

console.log(`🚀 Démarrage de l'application Angular...`);

// Exécuter npm run avec le script approprié selon l'environnement
const { spawnSync } = require('child_process');
const npmCommand = isReplit ? 'serve:replit' : 'serve:local';

console.log(`▶️ Exécution: npm run ${npmCommand}`);

// Lancer Angular avec les bons paramètres
const result = spawnSync('npm', ['run', npmCommand], { 
    stdio: 'inherit',
    shell: true
});

// Gérer le résultat
if (result.error) {
    console.error(`❌ Erreur lors du démarrage d'Angular:`, result.error.message);
    process.exit(1);
}
