# Portfolio 2025 - Frontend

Portfolio personnel moderne développé avec React, TypeScript et Vite.

## 🚀 Fonctionnalités

- Portfolio interactif avec sections dynamiques
- Blog intégré avec gestion d'articles
- Système de prise de rendez-vous
- Formulaire de contact
- Dashboard administrateur
- Design responsive et moderne

## 📋 Prérequis

- Node.js 18+
- npm ou yarn

## 🔧 Installation

```bash
npm install
```

## ⚙️ Configuration

Créez un fichier `.env` à la racine du projet :

```env
# URL du backend API (si vous utilisez encore le backend)
VITE_BACKEND_URL=http://localhost:3001

# Token d'authentification admin (optionnel)
VITE_ADMIN_TOKEN=ton-token-admin

# URL du webhook Pabbly Connect pour les rendez-vous (optionnel)
# Si non défini, utilise l'URL par défaut
VITE_PABBLY_WEBHOOK_URL=https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjcwNTZkMDYzNjA0Mzc1MjZjNTUzNTUxMzYi_pc
```

## 🏃 Lancer le projet

### Mode développement
```bash
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

### Build pour production
```bash
npm run build
```

### Prévisualiser le build
```bash
npm run preview
```

## 📁 Structure du projet

```
Client/
├── src/
│   ├── components/      # Composants React
│   ├── pages/          # Pages de l'application
│   ├── lib/            # Utilitaires et configuration
│   ├── hooks/          # Hooks React personnalisés
│   ├── types/          # Types TypeScript
│   └── styles/         # Styles globaux
├── public/             # Fichiers statiques
└── dist/               # Build de production (généré)
```

## 🛠️ Technologies utilisées

- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool et dev server
- **Tailwind CSS** - Framework CSS
- **React Router** - Routing
- **Framer Motion** - Animations
- **React Hook Form** - Gestion de formulaires
- **Shadcn/ui** - Composants UI

## 🚢 Déploiement

### GitHub Pages
```bash
npm run deploy
```

### Vercel / Netlify
Connectez votre repo GitHub et configurez :
- Build command: `npm run build`
- Output directory: `dist`

## 📝 Notes

- Le backend est séparé dans un repo distinct (`server/`)
- Assurez-vous que le backend est lancé et accessible pour les fonctionnalités API
