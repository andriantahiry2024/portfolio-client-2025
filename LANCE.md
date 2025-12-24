# 🚀 Guide de lancement - Portfolio 2025

## Installation (première fois uniquement)

### 1. Installer les dépendances du Frontend

```bash
cd Client
npm install
```

### 2. Installer les dépendances du Backend

```bash
cd ../server
npm install
```

## Lancer les serveurs

### Méthode 1 : Deux terminaux séparés (⭐ Recommandé)

Cette méthode est la plus simple et vous permet de voir les logs de chaque serveur séparément.

#### Terminal 1 - Backend
```bash
cd server
npm run dev
```

Vous devriez voir :
```
Serveur API démarré sur http://localhost:3001
```

#### Terminal 2 - Frontend
```bash
cd Client
npm run dev
```

Vous devriez voir :
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Méthode 2 : Script npm à la racine

Si vous avez installé `concurrently`, vous pouvez utiliser :

```bash
# À la racine du projet
npm install -g concurrently
npm run dev
```

Ou créez un script personnalisé dans `package.json` à la racine.

## Vérification

Une fois les deux serveurs lancés :

- ✅ **Frontend** : Ouvrez `http://localhost:5173` dans votre navigateur
- ✅ **Backend** : Ouvrez `http://localhost:3001` dans votre navigateur (vous devriez voir "API Portfolio Appointments en fonctionnement.")

## Configuration requise

Avant de lancer, assurez-vous d'avoir créé les fichiers `.env` :

### `Client/.env`
```env
VITE_BACKEND_URL=http://localhost:3001
```

### `server/.env`
```env
PORT=3001
ADMIN_TOKEN=ton-token-admin-super-secret
WHATSAPP_TOKEN=ton_access_token_meta
WHATSAPP_PHONE_NUMBER_ID=ton_phone_number_id
WHATSAPP_ADMIN_NUMBER=261349671222
```

## Arrêter les serveurs

Dans chaque terminal, appuyez sur `Ctrl + C` pour arrêter le serveur.

## Dépannage

### Le frontend ne peut pas communiquer avec le backend

1. Vérifiez que le backend est bien lancé sur le port 3001
2. Vérifiez que `VITE_BACKEND_URL` dans `Client/.env` pointe vers `http://localhost:3001`
3. Vérifiez la console du navigateur pour les erreurs CORS

### Port déjà utilisé

Si le port 3001 ou 5173 est déjà utilisé :

- **Backend** : Changez `PORT` dans `server/.env`
- **Frontend** : Vite utilisera automatiquement le prochain port disponible, ou modifiez `vite.config.ts`

