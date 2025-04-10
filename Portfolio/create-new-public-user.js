// Script pour créer un nouvel utilisateur public
const http = require('http');

function createNewPublicUser() {
  // Données du nouvel utilisateur
  const userData = JSON.stringify({
    email: 'newuser@example.com',
    firstName: 'New',
    lastName: 'User',
    password: 'newpassword123'
  });

  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/users',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(userData)
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
  
  req.write(userData);
  req.end();
}

createNewPublicUser();
