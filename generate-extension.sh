#!/bin/bash
# Script Bash pour générer l'extension Chrome
# Ce script automatise entièrement la génération de l'extension Chrome

# Définition des chemins
ANGULAR_APP_DIR="connect-extension-app"
EXTENSION_DIR="connect-extension-chrome"
OUTPUT_DIR="connect-extension-dist"
SERVER_URL="http://localhost:5000"
MAX_RETRIES=30  # Nombre maximal de tentatives pour vérifier si Angular est en cours d'exécution

# Fonction pour afficher des messages avec couleur
print_message() {
    case $2 in
        "info") echo -e "\e[1;36m$1\e[0m" ;;
        "success") echo -e "\e[1;32m$1\e[0m" ;;
        "error") echo -e "\e[1;31m$1\e[0m" ;;
        "warning") echo -e "\e[1;33m$1\e[0m" ;;
        *) echo "$1" ;;
    esac
}

# Vérifier si Angular est en cours d'exécution, sinon le démarrer
check_angular_running() {
    print_message "Vérification si le serveur Angular est en cours d'exécution..." "info"
    
    # Vérifions si le serveur Angular répond
    local retries=0
    local server_ready=false
    
    while [ $retries -lt $MAX_RETRIES ] && [ "$server_ready" = false ]; do
        if curl -s --head "$SERVER_URL" > /dev/null; then
            server_ready=true
            print_message "✓ Serveur Angular détecté sur $SERVER_URL" "success"
        else
            retries=$((retries + 1))
            print_message "Tentative $retries/$MAX_RETRIES - Serveur Angular non détecté, nouvelle vérification dans 2 secondes..." "warning"
            sleep 2
        fi
    done
    
    if [ "$server_ready" = false ]; then
        print_message "Le serveur Angular n'est pas accessible après $MAX_RETRIES tentatives." "error"
        print_message "Assurez-vous que le workflow 'Angular Frontend' est démarré et fonctionne correctement." "info"
        exit 1
    fi
    
    return 0
}

# Fonction principale pour générer l'extension
generate_extension() {
    print_message "Génération de l'extension Chrome..." "info"
    
    # Créer le répertoire de sortie s'il n'existe pas
    if [ ! -d "$OUTPUT_DIR" ]; then
        mkdir -p "$OUTPUT_DIR"
        print_message "Répertoire de sortie créé: $OUTPUT_DIR" "info"
    fi
    
    # Nettoyer le répertoire de sortie
    rm -rf "$OUTPUT_DIR"/*
    print_message "Répertoire de sortie nettoyé: $OUTPUT_DIR" "info"
    
    # Copier les fichiers de l'extension
    cp -r "$EXTENSION_DIR"/* "$OUTPUT_DIR"/
    print_message "Fichiers de l'extension copiés vers $OUTPUT_DIR" "info"
    
    # Télécharger les fichiers directement depuis le serveur de développement
    print_message "Téléchargement des fichiers depuis le serveur de développement..." "info"
    
    # Array des fichiers à télécharger
    files=("runtime.js" "polyfills.js" "main.js" "vendor.js" "styles.css" "styles.js")
    
    for file in "${files[@]}"; do
        if curl -s "$SERVER_URL/$file" > "$OUTPUT_DIR/$file"; then
            print_message "✓ Fichier $file téléchargé avec succès" "success"
        else
            print_message "⚠ Erreur lors du téléchargement de $file" "error"
        fi
    done
    
    # Créer le répertoire assets
    mkdir -p "$OUTPUT_DIR/assets"
    
    # Télécharger les assets nécessaires (icônes, images, etc.)
    if curl -s "$SERVER_URL/favicon.ico" > "$OUTPUT_DIR/assets/favicon.ico" 2>/dev/null; then
        print_message "✓ Fichier favicon.ico téléchargé avec succès" "success"
    fi
    
    print_message "Extension générée avec succès dans le répertoire: $OUTPUT_DIR" "success"
    print_message "Pour installer l'extension dans Chrome:" "info"
    print_message "1. Ouvrez chrome://extensions/" "info"
    print_message "2. Activez le 'Mode développeur'" "info"
    print_message "3. Cliquez sur 'Charger l'extension non empaquetée'" "info"
    print_message "4. Sélectionnez le répertoire $OUTPUT_DIR" "info"
}

# Exécution principale
check_angular_running
generate_extension