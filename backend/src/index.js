import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuration CORS avancée
const corsOptions = {
  origin: ['https://andriantahiry2024.github.io', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 heures en secondes
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Middleware pour ajouter des en-têtes de sécurité
app.use((req, res, next) => {
  // Désactiver la politique de sécurité du contenu pour les tests
  res.setHeader('Content-Security-Policy', "default-src * 'unsafe-inline' 'unsafe-eval'");
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Route racine
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Portfolio Backend API', 
    status: 'ok',
    endpoints: ['/api/health', '/api/chat']
  });
});

// Route principale qui sera utilisée comme proxy pour OpenRouter
app.post('/api/chat', async (req, res) => {
  try {
    const API_KEY = process.env.OPENROUTER_API_KEY;
    
    if (!API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }
    
    // Récupérer le body de la requête
    const requestBody = req.body;
    
    console.log('Requête reçue:', JSON.stringify(requestBody));
    
    // Appeler OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'HTTP-Referer': 'https://andriantahiry2024.github.io',
        'X-Title': 'Portfolio Chatbot'
      },
      body: JSON.stringify(requestBody)
    });
    
    // Récupérer la réponse
    const data = await response.json();
    
    console.log('Réponse reçue:', response.status);
    
    // Retourner la réponse
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Erreur:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

// Route de test
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Gérer les requêtes OPTIONS (preflight)
app.options('*', cors(corsOptions));

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
}); 