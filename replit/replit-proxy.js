/**
 * Proxy pour Replit qui redirige le trafic vers Angular ou l'API .NET selon le chemin
 */

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

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

// Proxy pour les requêtes API vers le port 8000
app.use('/api', createProxyMiddleware({
  target: `http://0.0.0.0:${API_PORT}`,
  changeOrigin: true,
  logLevel: 'debug',
  onProxyReq: (proxyReq, req, res) => {
    logMessage(`Proxy API request: ${req.method} ${req.url}`, 'blue');
  },
  onProxyRes: (proxyRes, req, res) => {
    logMessage(`Proxy API response: ${proxyRes.statusCode} ${req.method} ${req.url}`, 'green');
  }
}));

// Proxy pour toutes les autres requêtes vers Angular sur le port 5000
app.use('/', createProxyMiddleware({
  target: `http://0.0.0.0:${ANGULAR_PORT}`,
  changeOrigin: true,
  logLevel: 'debug',
  onProxyReq: (proxyReq, req, res) => {
    logMessage(`Proxy Angular request: ${req.method} ${req.url}`, 'blue');
  },
  onProxyRes: (proxyRes, req, res) => {
    logMessage(`Proxy Angular response: ${proxyRes.statusCode} ${req.method} ${req.url}`, 'green');
  }
}));

// Démarrage du serveur proxy
app.listen(PROXY_PORT, '0.0.0.0', () => {
  logMessage(`Proxy server running at http://0.0.0.0:${PROXY_PORT}`, 'cyan');
});