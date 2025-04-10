// Script pour tenter de se connecter en tant qu'admin avec différentes combinaisons
const http = require('http');

// Liste des combinaisons email/mot de passe à essayer
const credentials = [
  { email: 'admin@example.com', password: 'admin123' },
  { email: 'admin@example.com', password: 'password123' },
  { email: 'admin@admin.com', password: 'admin123' },
  { email: 'admin@admin.com', password: 'password123' },
  { email: 'superadmin@example.com', password: 'admin123' },
  { email: 'superadmin@example.com', password: 'password123' }
];

// Fonction pour tenter une connexion
function attemptLogin(creds, index) {
  if (index >= credentials.length) {
    console.log('Toutes les tentatives ont échoué.');
    return;
  }

  const loginData = JSON.stringify({
    email: creds[index].email,
    password: creds[index].password
  });

  console.log(`\nTentative ${index + 1}/${credentials.length}: ${creds[index].email} / ${creds[index].password}`);

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
          console.log('\nToken JWT:');
          console.log(parsedData.token);
        } else {
          console.log('Échec de la connexion:', parsedData.error || 'Aucun token reçu');
          // Essayer la prochaine combinaison
          attemptLogin(creds, index + 1);
        }
      } catch (e) {
        console.error('Erreur lors du parsing de la réponse:', e);
        console.log('Données brutes:', data);
        // Essayer la prochaine combinaison
        attemptLogin(creds, index + 1);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Erreur lors de la connexion au backend:', error);
    // Essayer la prochaine combinaison
    attemptLogin(creds, index + 1);
  });

  req.write(loginData);
  req.end();
}

// Commencer les tentatives
attemptLogin(credentials, 0);
