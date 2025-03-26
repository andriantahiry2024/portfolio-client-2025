import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ====== MIDDLEWARES ======
app.use((req, res, next) => {
  // Permettre toutes les origines
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Headers essentiels pour CORS
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Gérer les requêtes preflight OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Ne plus utiliser le middleware cors standard qui peut interférer
// app.use(cors(corsOptions));
app.use(express.json());

// ====== BASE DE DONNÉES ======

// ====== ROUTES API ======
// Route racine - Documentation de l'API
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Portfolio Backend API', 
    status: 'ok',
    endpoints: ['/api/health', '/api/chat', '/api/joke']
  });
});

// Route de test - Vérification de l'état du serveur
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    apiKeyConfigured: !!process.env.OPENROUTER_API_KEY,
    timestamp: new Date().toISOString()
  });
});

// Endpoint pour récupérer une blague aléatoire
app.get('/api/joke', async (req, res) => {
  try {
    // Essayer d'abord de générer une blague via OpenRouter
    const API_KEY = process.env.OPENROUTER_API_KEY;
    
    // Si la clé d'API est disponible, essayer de générer une blague avec OpenRouter
    if (API_KEY) {
      try {
        // Préparer la requête pour OpenRouter
        const requestBody = {
          model: "google/gemini-2.5-pro-exp-03-25:free",
          messages: [
            {
              role: 'system',
              content: [
                {
                  type: 'text',
                  text: `Génère une blague de programmation au format JSON. La blague doit être structurée exactement comme ceci:
                  {
                    "setup": "La question de la blague avec un emoji",
                    "options": ["Option A", "Option B", "Option C"],
                    "correctAnswer": 0, 1 ou 2 (index de la bonne réponse),
                    "punchline": "La chute de la blague avec un emoji"
                  }
                  IMPORTANT: Renvoie UNIQUEMENT le JSON sans texte supplémentaire.`
                }
              ]
            }
          ]
        };
        
        // Déterminer l'URL de référence en fonction de l'environnement
        const isLocalDevelopment = process.env.NODE_ENV !== 'production';
        const refererUrl = isLocalDevelopment 
          ? 'http://localhost:5173' 
          : 'https://portfolio-2025-a2414w4wl-andriantahiry2024s-projects.vercel.app';
        
        // Appeler OpenRouter API
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
            'HTTP-Referer': refererUrl,
            'X-Title': 'Portfolio Joke Generator'
          },
          body: JSON.stringify(requestBody)
        });
        
        if (response.ok) {
          const data = await response.json();
          
          // Extraire le contenu du message
          const choice = data.choices?.[0];
          let messageContent = '';
          
          if (choice?.message?.content) {
            messageContent = choice.message.content;
          } else if (choice?.message?.content?.[0]?.text) {
            messageContent = choice.message.content[0].text;
          } else if (choice?.text) {
            messageContent = choice.text;
          } else if (typeof choice?.message === 'string') {
            messageContent = choice.message;
          }
          
          // Chercher une structure JSON dans la réponse
          const jsonMatch = messageContent.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            try {
              const jokeJson = JSON.parse(jsonMatch[0]);
              
              // Vérifier que la structure est correcte
              if (jokeJson.setup && 
                  Array.isArray(jokeJson.options) && 
                  jokeJson.options.length > 0 &&
                  typeof jokeJson.correctAnswer === 'number' &&
                  jokeJson.punchline) {
                return res.json(jokeJson);
              }
            } catch (parseError) {
              console.error('Erreur lors de l\'analyse JSON:', parseError);
            }
          }
        }
      } catch (openRouterError) {
        console.error('Erreur lors de l\'appel à OpenRouter:', openRouterError);
      }
    }
    
    // Fallback: utiliser une blague prédéfinie si la génération a échoué
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    res.json(randomJoke);
  } catch (error) {
    console.error('Erreur lors de la récupération de la blague:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Route principale qui sera utilisée comme proxy pour OpenRouter
app.post('/api/chat', async (req, res) => {
  try {
    const API_KEY = process.env.OPENROUTER_API_KEY;
    
    if (!API_KEY) {
      console.error('Erreur: Clé API manquante');
      return res.status(500).json({ error: 'API key not configured' });
    }
    
    // Récupérer le body de la requête
    const requestBody = req.body;
    
    console.log('Requête reçue:', JSON.stringify(requestBody));
    
    // Vérifier si le modèle est spécifié
    if (!requestBody.model) {
      console.warn('Attention: Modèle non spécifié dans la requête');
      // Ajouter le modèle si absent
      requestBody.model = "google/gemini-2.5-pro-exp-03-25:free";
    }
    
    // Déterminer l'URL de référence en fonction de l'environnement
    const isLocalDevelopment = process.env.NODE_ENV !== 'production';
    const refererUrl = isLocalDevelopment 
      ? 'http://localhost:5173' // URL de développement local (port standard de Vite)
      : 'https://portfolio-2025-a2414w4wl-andriantahiry2024s-projects.vercel.app'; // URL de production
    
    console.log(`Environnement: ${isLocalDevelopment ? 'Développement local' : 'Production'}`);
    console.log(`URL de référence: ${refererUrl}`);
    
    // Appeler OpenRouter API
    console.log('Envoi de la requête à OpenRouter avec la clé API:', API_KEY.substring(0, 10) + '...');
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'HTTP-Referer': refererUrl,
        'X-Title': 'Portfolio Chatbot'
      },
      body: JSON.stringify(requestBody)
    });
    
    // Récupérer la réponse
    const data = await response.json();
    
    console.log('Réponse reçue:', response.status);
    console.log('Données reçues:', JSON.stringify(data).substring(0, 200) + '...');
    
    if (!response.ok) {
      console.error('Erreur OpenRouter:', data.error || data);
    }
    
    // Retourner la réponse
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Erreur complète:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// ====== DÉMARRAGE DU SERVEUR ======
// Pour le développement local
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
  });
}

// Export pour Vercel
export default app; 