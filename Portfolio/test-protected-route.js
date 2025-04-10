// Script pour tester l'accès à une route protégée
const http = require('http');

// Remplacez ce token par celui que vous avez reçu lors de la connexion
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsInJvbGUiOiJWSVNJVE9SIiwiaWF0IjoxNzQ0MTk1MjAzLCJleHAiOjE3NDQxOTg4MDN9.wonewVf_9WqqqxejtjPVgzYom53Vbz_V8kMT_gZHE_w';

function testProtectedRoute() {
  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/auth/me',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
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

testProtectedRoute();
