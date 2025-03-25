# Backend Proxy pour OpenRouter API

Ce serveur backend sert de proxy pour les appels à l'API OpenRouter, permettant de sécuriser la clé API et d'éviter les problèmes CORS.

## Installation

```bash
# Installer les dépendances
npm install

# Copier le fichier d'exemple de variables d'environnement
cp .env.example .env
```

Puis modifiez le fichier `.env` pour y ajouter votre clé API OpenRouter.

## Utilisation

### Développement

```bash
npm run dev
```

Le serveur démarrera sur http://localhost:3001.

### Production

```bash
npm start
```

## Endpoints API

### GET /api/health

Endpoint de santé pour vérifier que le serveur fonctionne.

### POST /api/chat

Endpoint principal qui proxy les requêtes vers OpenRouter API.

#### Format de requête

```json
{
  "model": "google/gemini-2.0-flash-thinking-exp:free",
  "messages": [
    {
      "role": "system",
      "content": [
        {
          "type": "text",
          "text": "Instructions système ici"
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Message utilisateur ici"
        }
      ]
    }
  ]
}
```

## Déploiement

Ce serveur peut être déployé sur des plateformes comme Vercel, Netlify, ou Heroku. 