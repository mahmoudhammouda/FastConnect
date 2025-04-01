// Script simple pour tester l'accès à l'API
const http = require('http');

const options = {
  hostname: '127.0.0.1',
  port: 8000,
  path: '/api/consultants',
  method: 'GET'
};

console.log('Test de connexion à l\'API...');
console.log(`URL testée: http://${options.hostname}:${options.port}${options.path}`);

const req = http.request(options, (res) => {
  console.log(`Code de statut: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        console.log('Réponse reçue (premiers éléments) :');
        console.log(JSON.stringify(parsedData.slice(0, 2), null, 2));
      } catch (e) {
        console.log('Réponse reçue (non JSON) :');
        console.log(data.substring(0, 200) + '...');
      }
    } else {
      console.log('Aucune donnée reçue');
    }
  });
});

req.on('error', (e) => {
  console.error(`Erreur : ${e.message}`);
  if (e.code === 'ECONNREFUSED') {
    console.error('Le serveur backend n\'est pas accessible à l\'adresse spécifiée.');
    console.error('Vérifiez que le serveur backend est bien démarré et écoute sur la bonne adresse et le bon port.');
  }
});

req.end();
