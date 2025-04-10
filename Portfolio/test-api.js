// Script pour tester la communication entre le frontend et le backend
const http = require('http');

function testBackendConnection() {
  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    console.log(`Statut de la réponse: ${res.statusCode}`);

    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        console.log('Réponse du backend:', parsedData);
      } catch (e) {
        console.error('Erreur lors du parsing de la réponse:', e);
        console.log('Données brutes:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Erreur lors de la connexion au backend:', error);
  });

  req.end();
}

testBackendConnection();
