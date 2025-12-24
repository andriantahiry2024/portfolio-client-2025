# Portfolio Teckforgeek

Portfolio professionnel déployé sur Coolify avec le domaine `teckforgeek.com`.

## Architecture

Ce projet est un monorepo contenant :
- **Frontend** : Application React/TypeScript dans le dossier `Client/`
- **Backend** : API Node.js Express dans le dossier `server/`

## Déploiement sur Coolify

### Configuration initiale

1. **Créer un nouveau projet** dans Coolify
2. Sélectionner **"Docker Compose"** comme type de déploiement
3. Connecter le dépôt GitHub : `https://github.com/andriantahiry2024/portfolio-client-2025.git`

### Variables d'environnement requises

#### Backend (`backend` service)
```env
ADMIN_TOKEN=votre_token_admin_secret
PABBLY_WEBHOOK_URL=https://votre-webhook-pabbly.com
WHATSAPP_TOKEN=votre_token_whatsapp
WHATSAPP_PHONE_NUMBER_ID=votre_phone_id
WHATSAPP_ADMIN_NUMBER=261349671222
```

#### Frontend (`frontend` service)
```env
VITE_BACKEND_URL=/api
```

> **Note** : Utilisez `/api` comme valeur pour `VITE_BACKEND_URL` car Nginx proxy les requêtes `/api/*` vers le backend automatiquement.

### Configuration du domaine

Dans Coolify, mappez `teckforgeek.com` sur le service **`frontend`** (port 80).

Le frontend proxifiera automatiquement les appels `/api/*` vers le backend grâce à la configuration Nginx.

## Développement local

### Installation

```bash
# Installer toutes les dépendances
npm run install:all
```

### Lancement

```bash
# Depuis la racine, lancer frontend et backend simultanément
npm run dev
```

Ou manuellement :

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd Client
npm run dev
```

### Accès local

- **Frontend** : http://localhost:5173
- **Backend** : http://localhost:3001

## Variables d'environnement locales

Créez les fichiers suivants :

### `Client/.env`
```env
VITE_BACKEND_URL=http://localhost:3001
```

### `server/.env`
```env
PORT=3001
ADMIN_TOKEN=dev_token
PABBLY_WEBHOOK_URL=https://connect.pabbly.com/workflow/...
WHATSAPP_TOKEN=EAA...
WHATSAPP_PHONE_NUMBER_ID=123...
WHATSAPP_ADMIN_NUMBER=261...
```

## Structure du projet

```
Portfolio-2025/
├── Client/              # Frontend React
│   ├── src/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── server/              # Backend Node.js
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml   # Orchestration Coolify
└── package.json         # Scripts racine
```

## Technologies

- **Frontend** : React, TypeScript, Tailwind CSS, Framer Motion
- **Backend** : Node.js, Express
- **Déploiement** : Docker, Nginx, Coolify
- **Domaine** : teckforgeek.com

## Licence

Tous droits réservés © 2025 Teckforgeek
