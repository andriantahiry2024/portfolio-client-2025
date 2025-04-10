// Script pour se connecter en tant qu'admin
const http = require('http');

function adminLogin() {
  // Données de connexion pour l'admin
  const loginData = JSON.stringify({
    email: 'admin@example.com',
    password: 'password123'
  });

  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(loginData)
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

        if (parsedData.token) {
          console.log('Connexion admin réussie! Token JWT reçu.');
          console.log('Informations utilisateur:', parsedData.user);
          
          // Sauvegarder le token pour une utilisation ultérieure
          console.log('\nUtilisez ce token pour les requêtes authentifiées:');
          console.log(parsedData.token);
        } else {
          console.log('Échec de la connexion. Aucun token reçu.');
        }
      } catch (e) {
        console.error('Erreur lors du parsing de la réponse:', e);
        console.log('Données brutes:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Erreur lors de la connexion au backend:', error);
  });

  req.write(loginData);
  req.end();
}

adminLogin();
