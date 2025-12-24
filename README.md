# Portfolio Teckforgeek

Portfolio professionnel déployé sur Coolify avec le domaine `teckforgeek.com`.

## Déploiement sur Coolify avec Nixpacks (Recommandé)

Coolify détecte automatiquement les projets Vite/React et configure tout pour toi !

### Configuration dans Coolify :

1. **Repository URL** : `https://github.com/andriantahiry2024/portfolio-client-2025`
2. **Branch** : `main`
3. **Build Pack** : `Nixpacks` (détection automatique)
4. **Base Directory** : `/Client`
5. **Port** : `3000` (port par défaut Nixpacks pour Vite)

### Variables d'environnement (optionnel) :

Si tu as besoin de configurations spécifiques :
```env
# Aucune variable nécessaire car tout est géré côté frontend avec Telegram
```

### Configuration du domaine :

Dans Coolify, mappe simplement `teckforgeek.com` sur ton application.

C'est tout ! Coolify s'occupe de :
- ✅ Détecter que c'est un projet Vite
- ✅ Construire avec `npm run build`
- ✅ Configurer Nginx automatiquement
- ✅ Gérer le routing SPA (Single Page Application)
- ✅ Activer la compression et la mise en cache

## Développement local

### Installation

```bash
cd Client
npm install
```

### Lancement

```bash
npm run dev
```

### Accès local

- **Frontend** : http://localhost:5173

## Structure du projet

```
Portfolio-2025/
└── Client/              # Frontend React
    ├── src/
    ├── public/
    └── package.json
```

## Technologies

- **Frontend** : React, TypeScript, Tailwind CSS, Framer Motion
- **Notifications** : Telegram API (directement depuis le frontend)
- **Déploiement** : Coolify avec Nixpacks
- **Domaine** : teckforgeek.com

## Licence

Tous droits réservés © 2025 Teckforgeek
