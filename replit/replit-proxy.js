/**
 * Proxy pour Replit qui redirige le trafic vers Angular ou l'API .NET selon le chemin
 */

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const fs = require('fs');

const app = express();

// Configuration des ports
const ANGULAR_PORT = 5000;
const API_PORT = 8000;
const PROXY_PORT = 3000;

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

function logMessage(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Message de démarrage
logMessage("=== DÉMARRAGE DU PROXY REPLIT ===", 'magenta');
logMessage(`Redirection du trafic vers Angular (port ${ANGULAR_PORT}) et l'API .NET (port ${API_PORT})`, 'cyan');

// Ajouter un en-tête pour le débogage
app.use((req, res, next) => {
  res.setHeader('X_TEST', 'TEST');
  // Ajouter CORS headers pour le développement
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Proxy pour les requêtes API vers le port 8000
app.use('/api', createProxyMiddleware({
  target: `http://0.0.0.0:${API_PORT}`,
  changeOrigin: true,
  // Ne pas modifier le chemin - la route doit rester /api/...
  logLevel: 'debug',
  pathRewrite: {
    '^/api': '/api'  // Conserver le préfixe /api
  },
  onProxyReq: (proxyReq, req, res) => {
    logMessage(`Proxy API request: ${req.method} ${req.url} -> ${proxyReq.path}`, 'blue');
    // Déboggage détaillé des en-têtes de requête
    console.log('Headers de la requête API:', JSON.stringify(proxyReq.getHeaders()));
  },
  onProxyRes: (proxyRes, req, res) => {
    logMessage(`Proxy API response: ${proxyRes.statusCode} ${req.method} ${req.url}`, 'green');
    // Ajout d'un log détaillé pour la réponse
    console.log('Status Code API:', proxyRes.statusCode);
    console.log('Headers de la réponse API:', JSON.stringify(proxyRes.headers));
  }
}));

// Proxy pour toutes les autres requêtes vers Angular sur le port 5000
const angularProxy = createProxyMiddleware({
  target: `http://0.0.0.0:${ANGULAR_PORT}`,
  changeOrigin: true,
  ws: true, // Support WebSockets
  logLevel: 'debug',
  onProxyReq: (proxyReq, req, res) => {
    logMessage(`Proxy Angular request: ${req.method} ${req.url}`, 'blue');
  },
  onProxyRes: (proxyRes, req, res) => {
    logMessage(`Proxy Angular response: ${proxyRes.statusCode} ${req.method} ${req.url}`, 'green');
  }
});

// Redirection des requêtes /consultants vers /api/consultants (fix pour les requêtes API mal formées)
app.use('/consultants', createProxyMiddleware({
  target: `http://0.0.0.0:${API_PORT}`,
  changeOrigin: true,
  pathRewrite: {
    '^/consultants': '/api/consultants'  // Réécriture du chemin pour qu'il inclue le préfixe /api
  },
  logLevel: 'debug',
  onProxyReq: (proxyReq, req, res) => {
    logMessage(`Proxy API request (consultants): ${req.method} ${req.url} -> ${proxyReq.path}`, 'blue');
    // Déboggage détaillé des en-têtes de requête
    console.log('Headers de la requête consultants:', JSON.stringify(proxyReq.getHeaders()));
  },
  onProxyRes: (proxyRes, req, res) => {
    logMessage(`Proxy API response (consultants): ${proxyRes.statusCode} ${req.method} ${req.url}`, 'green');
    // Ajout d'un log détaillé pour la réponse
    console.log('Status Code consultants:', proxyRes.statusCode);
  }
}));

// De même pour les autres endpoints qui pourraient être appelés sans préfixe /api
app.use('/availability', createProxyMiddleware({
  target: `http://0.0.0.0:${API_PORT}`,
  changeOrigin: true,
  pathRewrite: {
    '^/availability': '/api/availability'  // Réécriture du chemin
  },
  logLevel: 'debug'
}));

// Routes Angular - doit être après les routes spécifiques
app.use('/', angularProxy);

// Midleware de gestion d'erreur pour attraper les 404 et rediriger vers index.html
app.use((req, res, next) => {
  if (req.url.startsWith('/api')) {
    // Pour les API, on laisse passer l'erreur
    next();
  } else {
    // Pour Angular, on redirige vers le proxy Angular
    logMessage(`Redirection de ${req.url} vers Angular (fallback)`, 'yellow');
    angularProxy(req, res, next);
  }
});

// Démarrage du serveur proxy
app.listen(PROXY_PORT, '0.0.0.0', () => {
  logMessage(`Proxy server running at http://0.0.0.0:${PROXY_PORT}`, 'cyan');
});