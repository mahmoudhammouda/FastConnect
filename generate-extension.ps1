# Script PowerShell pour générer l'extension Chrome
# Ce script automatise entièrement la génération de l'extension Chrome

# Définition des chemins
$AngularAppDir = "connect-extension-app"
$ExtensionDir = "connect-extension-chrome"
$OutputDir = "connect-extension-dist"
$ServerUrl = "http://localhost:5000"
$MaxRetries = 30  # Nombre maximal de tentatives pour vérifier si Angular est en cours d'exécution

# Fonction pour afficher des messages avec couleur
function Write-ColorMessage {
    param (
        [string]$Message,
        [string]$Color = "White"
    )
    
    Write-Host $Message -ForegroundColor $Color
}

# Vérifier si Angular est en cours d'exécution, sinon le démarrer
function Check-AngularRunning {
    Write-ColorMessage "Vérification si le serveur Angular est en cours d'exécution..." "Cyan"
    
    # Vérifions si le serveur Angular répond
    $retries = 0
    $serverReady = $false
    
    while ($retries -lt $MaxRetries -and -not $serverReady) {
        try {
            $response = Invoke-WebRequest -Uri $ServerUrl -Method Head -ErrorAction SilentlyContinue
            if ($response.StatusCode -eq 200) {
                $serverReady = $true
                Write-ColorMessage "✓ Serveur Angular détecté sur $ServerUrl" "Green"
            }
        } catch {
            $retries++
            Write-ColorMessage "Tentative $retries/$MaxRetries - Serveur Angular non détecté, nouvelle vérification dans 2 secondes..." "Yellow"
            Start-Sleep -Seconds 2
        }
    }
    
    if (-not $serverReady) {
        Write-ColorMessage "Le serveur Angular n'est pas accessible après $MaxRetries tentatives." "Red"
        Write-ColorMessage "Assurez-vous que le workflow 'Angular Frontend' est démarré et fonctionne correctement." "Cyan"
        exit 1
    }
    
    return $true
}

# Fonction principale pour générer l'extension
function Generate-Extension {
    Write-ColorMessage "Génération de l'extension Chrome..." "Cyan"
    
    # Créer le répertoire de sortie s'il n'existe pas
    if (-not (Test-Path -Path $OutputDir)) {
        New-Item -ItemType Directory -Path $OutputDir | Out-Null
        Write-ColorMessage "Répertoire de sortie créé: $OutputDir" "Cyan"
    }
    
    # Nettoyer le répertoire de sortie
    if (Test-Path -Path $OutputDir) {
        Get-ChildItem -Path $OutputDir -Recurse | Remove-Item -Force -Recurse -ErrorAction SilentlyContinue
        Write-ColorMessage "Répertoire de sortie nettoyé: $OutputDir" "Cyan"
    }
    
    # Copier les fichiers de l'extension
    Copy-Item -Path "$ExtensionDir\*" -Destination $OutputDir -Recurse
    Write-ColorMessage "Fichiers de l'extension copiés vers $OutputDir" "Cyan"
    
    # Télécharger les fichiers directement depuis le serveur de développement
    Write-ColorMessage "Téléchargement des fichiers depuis le serveur de développement..." "Cyan"
    
    # Array des fichiers à télécharger
    $files = @("runtime.js", "polyfills.js", "main.js", "vendor.js", "styles.css", "styles.js")
    
    foreach ($file in $files) {
        try {
            Invoke-WebRequest -Uri "$ServerUrl/$file" -OutFile "$OutputDir/$file" -ErrorAction SilentlyContinue
            Write-ColorMessage "✓ Fichier $file téléchargé avec succès" "Green"
        } catch {
            Write-ColorMessage "⚠ Erreur lors du téléchargement de $file" "Red"
        }
    }
    
    # Créer le répertoire assets pour l'extension
    if (-not (Test-Path -Path "$OutputDir\assets")) {
        New-Item -ItemType Directory -Path "$OutputDir\assets" | Out-Null
        Write-ColorMessage "Répertoire assets créé pour l'extension" "Cyan"
    }
    
    # Télécharger les assets nécessaires
    try {
        Invoke-WebRequest -Uri "$ServerUrl/favicon.ico" -OutFile "$OutputDir\assets\favicon.ico" -ErrorAction SilentlyContinue
        Write-ColorMessage "✓ Fichier favicon.ico téléchargé avec succès" "Green"
    } catch {
        Write-ColorMessage "⚠ Erreur lors du téléchargement de favicon.ico" "Yellow"
    }
    
    # Convertir SVG en PNG pour l'icône si nécessaire
    try {
        $iconSvgPath = "$ExtensionDir\icon.svg"
        $iconPngPath = "$OutputDir\icon.png"
        
        if (Test-Path -Path $iconSvgPath) {
            if (Get-Command "inkscape" -ErrorAction SilentlyContinue) {
                # Si Inkscape est disponible
                inkscape --export-filename=$iconPngPath $iconSvgPath
                Write-ColorMessage "✓ Icône SVG convertie en PNG avec Inkscape" "Green"
            } elseif (Get-Command "magick" -ErrorAction SilentlyContinue) {
                # Si ImageMagick est disponible
                magick convert $iconSvgPath $iconPngPath
                Write-ColorMessage "✓ Icône SVG convertie en PNG avec ImageMagick" "Green"
            }
        }
    } catch {
        Write-ColorMessage "⚠ Erreur lors de la conversion de l'icône SVG en PNG" "Yellow"
    }
    
    Write-ColorMessage "Extension générée avec succès dans le répertoire: $OutputDir" "Green"
    Write-ColorMessage "Pour installer l'extension dans Chrome:" "Cyan"
    Write-ColorMessage "1. Ouvrez chrome://extensions/" "Cyan"
    Write-ColorMessage "2. Activez le 'Mode développeur'" "Cyan"
    Write-ColorMessage "3. Cliquez sur 'Charger l'extension non empaquetée'" "Cyan"
    Write-ColorMessage "4. Sélectionnez le répertoire $OutputDir" "Cyan"
}

# Exécution principale
Check-AngularRunning
Generate-Extension