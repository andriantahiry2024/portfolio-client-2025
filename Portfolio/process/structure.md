# Structure du projet Portfolio

Ce document décrit la structure du projet Portfolio, une application de portfolio personnel.

## Structure des dossiers

```
Portfolio/
├── portfolio-client-2025/     # Frontend de l'application
│   ├── node_modules/          # Dépendances
│   ├── public/                # Fichiers statiques
│   │   └── vite.svg           # Logo Vite
│   ├── src/                   # Code source principal
│   │   ├── components/        # Composants réutilisables
│   │   ├── data/              # Données statiques
│   │   ├── hooks/             # Hooks personnalisés
│   │   ├── lib/               # Bibliothèques et utilitaires
│   │   ├── pages/             # Pages de l'application
│   │   ├── stories/           # Storybook stories
│   │   ├── styles/            # Styles globaux
│   │   ├── types/             # Types TypeScript
│   │   ├── App.tsx            # Composant principal de l'application
│   │   ├── env.d.ts           # Types pour les variables d'environnement
│   │   ├── index.css          # Styles CSS globaux
│   │   ├── main.tsx           # Point d'entrée de l'application
│   │   └── vite-env.d.ts      # Types pour Vite
│   ├── .env.example           # Exemple de variables d'environnement
│   ├── .gitignore             # Fichiers ignorés par Git
│   ├── .node-version          # Version de Node.js
│   ├── .npmrc                 # Configuration NPM
│   ├── .nvmrc                 # Version de Node.js pour NVM
│   ├── .vercelignore          # Fichiers ignorés par Vercel
│   ├── components.json        # Configuration des composants
│   ├── Dockerfile             # Configuration Docker
│   ├── index.html             # Page HTML principale
│   ├── next.config.js         # Configuration Next.js
│   ├── package.json           # Dépendances et scripts
│   ├── postcss.config.js      # Configuration PostCSS
│   ├── README.md              # Documentation
│   ├── tailwind.config.js     # Configuration Tailwind CSS
│   ├── tsconfig.json          # Configuration TypeScript
│   ├── tsconfig.node.json     # Configuration TypeScript pour Node
│   ├── vercel.json            # Configuration Vercel
│   └── vite.config.ts         # Configuration Vite
│
├── portfolio-backend-2025/    # Backend de l'application
│   ├── .vscode/               # Configuration VS Code
│   ├── migrations/            # Migrations de base de données
│   │   ├── add_contact_info_columns.sql    # Migration pour ajouter des colonnes de contact
│   │   ├── create_visits_table.sql         # Migration pour créer la table des visites
│   │   └── create_visits_table_direct.sql  # Migration directe pour la table des visites
│   ├── node_modules/          # Dépendances
│   ├── src/                   # Code source principal
│   │   ├── middleware/        # Middleware Express
│   │   ├── routes/            # Routes API
│   │   ├── checkContactColumns.js  # Script pour vérifier les colonnes de contact
│   │   ├── createVisitsTable.js    # Script pour créer la table des visites
│   │   └── index.js                # Point d'entrée du serveur
│   ├── supabase/              # Configuration Supabase
│   │   ├── migrations/        # Migrations Supabase
│   │   ├── .gitignore         # Fichiers ignorés par Git pour Supabase
│   │   └── config.toml        # Configuration Supabase
│   ├── .env.example           # Exemple de variables d'environnement
│   ├── .gitignore             # Fichiers ignorés par Git
│   ├── package.json           # Dépendances et scripts
│   ├── README.md              # Documentation
│   ├── start-server.js        # Script de démarrage du serveur
│   └── vercel.json            # Configuration Vercel
│
├── process/                   # Documentation du processus de développement
│   ├── erreurs-a-eviter.exemple.md    # Exemple d'erreurs à éviter
│   ├── plan-supabase-auth.exemple.md  # Exemple de plan d'authentification Supabase
│   ├── plan.exemple.md                # Exemple de plan du projet
│   ├── structure..exemple.md          # Exemple de structure du projet
│   └── taches.example.md              # Exemple de suivi des tâches
│
└── processus.md               # Processus de développement à suivre
```

## Modules principaux

### Frontend (portfolio-client-2025)

Le frontend est développé avec Vite, React et TypeScript. Il utilise Tailwind CSS pour les styles.

#### Composants principaux
- **App.tsx** : Composant principal qui gère le routage et la structure de l'application
- **Pages** : Composants de page pour chaque route de l'application
- **Components** : Composants réutilisables pour l'interface utilisateur

#### Styles
- **Tailwind CSS** : Framework CSS utilitaire pour le styling
- **index.css** : Styles globaux et personnalisations Tailwind

### Backend (portfolio-backend-2025)

Le backend est développé avec Node.js et Express. Il utilise Supabase comme base de données.

#### Routes API
- Le dossier `routes` contient les différentes routes API de l'application

#### Middleware
- Le dossier `middleware` contient les middlewares Express pour l'authentification, la validation, etc.

#### Base de données
- **Supabase** : Plateforme de base de données PostgreSQL avec fonctionnalités d'authentification
- **Migrations** : Scripts SQL pour la création et la modification des tables

## Flux d'authentification

À définir en fonction des besoins du projet.

## Développement

Pour développer l'application, suivez ces étapes :
1. Clonez le dépôt
2. Installez les dépendances avec `npm install` dans les dossiers frontend et backend
3. Configurez les variables d'environnement en copiant les fichiers `.env.example` vers `.env.local`
4. Démarrez le frontend avec `npm run dev` dans le dossier portfolio-client-2025
5. Démarrez le backend avec `npm run dev` dans le dossier portfolio-backend-2025
