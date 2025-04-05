const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 5000;

console.log('Démarrage du serveur Express pour l\'application FastConnect...');

// Journalisation des requêtes
app.use((req, res, next) => {
  console.log(`Requête reçue: ${req.method} ${req.url}`);
  next();
});

// Configuration du proxy pour l'API
app.use('/api', createProxyMiddleware({
  target: 'http://0.0.0.0:8000',
  changeOrigin: true,
  logLevel: 'debug',
  pathRewrite: {
    '^/api': '/api' // Pour garder le préfixe /api
  }
}));

// Middleware pour les en-têtes CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Créer une page HTML simple pour tester la connexion
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>FastConnect - Test Page</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .container { max-width: 800px; margin: 0 auto; }
        h1 { color: #3b82f6; }
        button { background: #3b82f6; color: white; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; }
        button:hover { background: #2563eb; }
        .result { margin-top: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 4px; }
        .loading { color: #666; }
        .success { color: #15803d; }
        .error { color: #b91c1c; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>FastConnect - Page de Test</h1>
        <p>Cette page permet de tester la connexion à l'API FastConnect.</p>
        
        <div>
          <button id="testApi">Tester la connexion API</button>
          <div id="apiResult" class="result">Cliquez sur le bouton pour tester la connexion...</div>
        </div>

        <script>
          document.getElementById('testApi').addEventListener('click', async () => {
            const resultDiv = document.getElementById('apiResult');
            resultDiv.className = 'result loading';
            resultDiv.textContent = 'Connexion en cours...';
            
            try {
              const response = await fetch('/api/consultants');
              if (response.ok) {
                const data = await response.json();
                resultDiv.className = 'result success';
                resultDiv.innerHTML = '<strong>Connexion réussie!</strong><br>' + 
                  'Nombre de consultants: ' + data.length + '<br>' +
                  'Premier consultant: ' + (data[0]?.role || 'Non disponible');
              } else {
                resultDiv.className = 'result error';
                resultDiv.textContent = 'Erreur: ' + response.status + ' ' + response.statusText;
              }
            } catch (error) {
              resultDiv.className = 'result error';
              resultDiv.textContent = 'Erreur de connexion: ' + error.message;
            }
          });
        </script>
      </div>
    </body>
    </html>
  `);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Serveur FastConnect démarré sur http://0.0.0.0:${port}`);
});