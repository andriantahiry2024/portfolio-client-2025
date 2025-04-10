// Script pour vérifier les utilisateurs existants
const http = require('http');

// Fonction pour se connecter avec un utilisateur existant
function loginAndCheckUsers() {
  // Données de connexion pour l'utilisateur existant
  const loginData = JSON.stringify({
    email: 'user@example.com',
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
        
        if (parsedData.token) {
          console.log('Connexion réussie!');
          console.log('Informations utilisateur:', parsedData.user);
          
          // Utiliser le token pour récupérer la liste des utilisateurs
          const token = parsedData.token;
          checkUsers(token);
        } else {
          console.log('Échec de la connexion:', parsedData.error || 'Aucun token reçu');
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

// Fonction pour vérifier les utilisateurs existants
function checkUsers(token) {
  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/users',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  const req = http.request(options, (res) => {
    console.log(`\nStatut de la réponse (liste des utilisateurs): ${res.statusCode}`);

    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        console.log('Liste des utilisateurs:', parsedData);
      } catch (e) {
        console.error('Erreur lors du parsing de la réponse:', e);
        console.log('Données brutes:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
  });

  req.end();
}

// Démarrer le processus
loginAndCheckUsers();
