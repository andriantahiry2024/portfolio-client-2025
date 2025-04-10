# Structure du projet EduConnect

Ce document décrit la structure du projet EduConnect, une application de gestion scolaire complète.

## Structure des dossiers

```
educonnect-new/
├── .next/                  # Dossier généré par Next.js
├── .roo/                   # Configuration
├── .swc/                   # Compilateur SWC
├── .vscode/                # Configuration VS Code
├── app/                    # Code source principal
│   ├── api/                # Routes API
│   │   ├── auth/           # API d'authentification
│   │   ├── communications/ # API de communications
│   │   ├── courses/        # API de cours
│   │   ├── events/         # API d'événements
│   │   ├── finances/       # API de finances
│   │   ├── reports/        # API de rapports
│   │   └── users/          # API d'utilisateurs
│   ├── auth/               # Pages d'authentification
│   │   ├── error/          # Page d'erreur d'authentification
│   │   ├── forgot-password/# Page de récupération de mot de passe
│   │   ├── login/          # Page de connexion
│   │   ├── logout/         # Page de déconnexion
│   │   ├── register/       # Page d'inscription
│   │   ├── reset-password/ # Page de réinitialisation de mot de passe
│   │   └── layout.tsx      # Layout pour les pages d'authentification
│   ├── components/         # Composants réutilisables
│   │   ├── dashboard/      # Composants du tableau de bord
│   │   │   ├── Sidebar.tsx     # Barre latérale de navigation
│   │   │   ├── Header.tsx      # En-tête du tableau de bord
│   │   │   ├── Footer.tsx      # Pied de page du tableau de bord
│   │   │   ├── NavMenu.tsx     # Menu de navigation horizontal
│   │   │   ├── MobileNav.tsx    # Navigation mobile
│   │   │   ├── Breadcrumb.tsx   # Fil d'Ariane
│   │   │   ├── PageTitle.tsx    # Titre de page
│   │   │   └── index.ts        # Export des composants
│   │   ├── forms/          # Composants de formulaires
│   │   ├── home/           # Composants de la page d'accueil
│   │   │   ├── HomeHeader.tsx   # En-tête de la page d'accueil
│   │   │   ├── HomeHero.tsx     # Section héro de la page d'accueil
│   │   │   ├── HomeFeatures.tsx # Section des fonctionnalités
│   │   │   ├── HomeTestimonials.tsx # Section des témoignages
│   │   │   ├── HomePricing.tsx  # Section des tarifs
│   │   │   ├── HomeFAQ.tsx      # Section FAQ
│   │   │   ├── HomeShowcase.tsx # Section de démonstration des interfaces
│   │   │   ├── HomeFooter.tsx   # Pied de page de la page d'accueil
│   │   │   ├── MobileMenu.tsx   # Menu mobile de la page d'accueil
│   │   │   └── index.ts        # Export des composants
│   │   ├── layouts/        # Composants de layouts
│   │   ├── navigation/     # Composants de navigation
│   │   │   ├── MobileNavigation.tsx # Navigation mobile générique
│   │   │   ├── NavigationMenu.tsx    # Menu de navigation générique
│   │   │   └── index.ts            # Export des composants
│   │   ├── providers/      # Providers React
│   │   ├── shared/         # Composants partagés
│   │   └── ui/             # Composants UI de base
│   ├── config/             # Configuration de l'application
│   ├── dashboard/          # Pages du tableau de bord
│   │   ├── admin/          # Tableau de bord administrateur
│   │   ├── parent/         # Tableau de bord parent
│   │   ├── student/        # Tableau de bord étudiant
│   │   ├── teacher/        # Tableau de bord enseignant
│   │   ├── layout.tsx      # Layout pour les pages du tableau de bord
│   │   └── page.tsx        # Page d'accueil du tableau de bord
│   ├── hooks/              # Hooks personnalisés
│   ├── lib/                # Bibliothèques et utilitaires
│   │   ├── api/            # Fonctions d'API
│   │   ├── auth/           # Fonctions d'authentification
│   │   │   ├── context.tsx # Contexte d'authentification
│   │   │   ├── hooks.ts    # Hooks d'authentification
│   │   │   ├── simple-auth.ts # Module d'authentification simplifié (ancien)
│   │   │   ├── simple-login.ts # Module d'authentification ultra-simplifié (nouveau)
│   │   │   ├── types.ts    # Types d'authentification
│   │   │   └── index.ts    # Exports d'authentification
│   │   ├── db/             # Fonctions de base de données
│   │   ├── supabase/       # Client Supabase
│   │   │   ├── sql/        # Requêtes SQL
│   │   │   ├── client.ts   # Client Supabase
│   │   │   └── index.ts    # Exports Supabase
│   │   └── utils/          # Fonctions utilitaires
│   ├── models/             # Modèles de données
│   ├── styles/             # Styles globaux
│   ├── layout.tsx          # Layout principal de l'application
│   ├── page.tsx            # Page d'accueil de l'application
│   └── providers.tsx       # Providers de l'application
├── docs/                   # Documentation
├── node_modules/           # Dépendances
├── public/                 # Fichiers statiques
│   ├── images/            # Images
│   │   ├── hero/           # Images de la section héro
│   │   ├── features/        # Images des fonctionnalités
│   │   ├── testimonials/    # Images des témoignages
│   │   └── team/            # Images de l'équipe
│   ├── logo.svg            # Logo principal
│   └── logo-white.svg      # Logo blanc
├── scripts/                # Scripts utilitaires
├── supabase/               # Configuration Supabase
├── tests/                  # Tests
├── .env                    # Variables d'environnement
├── .env.development        # Variables d'environnement de développement
├── .env.example            # Exemple de variables d'environnement
├── .env.local              # Variables d'environnement locales
├── .gitignore              # Fichiers ignorés par Git
├── erreurs-a-eviter.md     # Documentation des erreurs à éviter
├── eslint.config.mjs       # Configuration ESLint
├── instructions.md         # Instructions du projet
├── jest.config.js          # Configuration Jest
├── jest.setup.js           # Configuration des tests Jest
├── middleware.ts           # Middleware Next.js
├── next-env.d.ts           # Types Next.js
├── next.config.js          # Configuration Next.js
├── package.json            # Dépendances et scripts
├── plan-supabase-auth.md   # Plan d'authentification Supabase
├── plan.md                 # Plan du projet
├── postcss.config.mjs      # Configuration PostCSS
├── processus.md            # Documentation du processus
├── README.md               # Documentation principale
├── structure.md            # Ce document
├── taches.md               # Suivi des tâches
└── tsconfig.json           # Configuration TypeScript
```

## Modules principaux

### Authentification

Le système d'authentification a été simplifié pour faciliter le développement. Nous utilisons maintenant un module d'authentification ultra-simplifié (`app/lib/auth/simple-login.ts`) qui gère l'authentification d'un seul utilisateur (admin) sans dépendre de Supabase.

### Tableaux de bord

L'application comporte quatre types de tableaux de bord :
- **Admin** : Pour les administrateurs de l'école
  - Tableau de bord principal avec statistiques, tâches récentes, notifications et événements à venir
  - Gestion des utilisateurs (ajout, modification, suppression, filtrage, recherche)
  - Gestion des classes (ajout, modification, suppression, filtrage, recherche)
  - Gestion des finances (ajout, suppression, filtrage par catégorie, type et période, calcul des totaux)
  - Gestion des événements (ajout, suppression, filtrage par type et statut)
  - Gestion des communications (ajout, suppression, filtrage par statut et destinataires)
  - Génération de rapports (ajout, suppression, filtrage par type et statut, téléchargement)
- **Teacher** : Pour les enseignants
  - Tableau de bord avec statistiques (cours, élèves, devoirs)
  - Gestion des cours (ajout, suppression, filtrage)
  - Gestion des devoirs (ajout, suppression, filtrage)
- **Student** : Pour les étudiants
  - Tableau de bord avec statistiques (cours, devoirs, notes)
  - Consultation et filtrage des cours
  - Consultation et filtrage des devoirs
  - Affichage des notes et des prochains cours
- **Parent** : Pour les parents d'élèves
  - Tableau de bord avec statistiques (enfants, événements, messages)
  - Consultation des informations de leurs enfants
  - Consultation et filtrage des devoirs des enfants
  - Affichage des notes et des prochaines réunions
  - Résumé des performances des enfants

### Tests

L'application dispose de tests automatisés pour vérifier le bon fonctionnement des fonctionnalités :
- **Auth** : Tests d'authentification et de navigation
- **Users** : Tests de gestion des utilisateurs (ajout, suppression, activation/désactivation)
- **Classes** : Tests de gestion des classes (ajout, suppression)
- **Finances** : Tests de gestion des finances (ajout, suppression, filtrage)
- **Events** : Tests de gestion des événements (ajout, suppression, filtrage)
- **Communications** : Tests de gestion des communications (ajout, suppression, filtrage)
- **Reports** : Tests de génération de rapports (ajout, suppression, filtrage)

### API

L'application expose plusieurs API pour interagir avec les données :
- **Auth** : Gestion de l'authentification
- **Communications** : Gestion des communications
- **Courses** : Gestion des cours
- **Events** : Gestion des événements
- **Finances** : Gestion des finances
- **Reports** : Génération de rapports
- **Users** : Gestion des utilisateurs

### Base de données

Nous utilisons Supabase comme base de données et plateforme d'authentification :

- **Tables** :
  - `transactions` : Transactions financières (revenus et dépenses)
  - `school_events` : Événements scolaires (réunions, sorties, activités)
  - `teacher_courses` : Cours des enseignants
  - `assignments` : Devoirs et évaluations
  - `parent_children` : Enfants des parents
  - `communications` : Messages et communications

- **Fonctionnalités** :
  - Authentification des utilisateurs
  - Stockage et récupération des données
  - Sécurité des données avec Row Level Security (RLS)

La configuration et les requêtes SQL sont stockées dans le dossier `app/lib/supabase`.

## Flux d'authentification

1. L'utilisateur accède à la page de connexion (`/auth/login`)
2. L'utilisateur saisit ses identifiants (email et mot de passe)
3. Le module d'authentification simplifié vérifie les identifiants
4. Si les identifiants sont valides, l'utilisateur est redirigé vers le tableau de bord correspondant à son rôle
5. Le middleware autorise l'accès à toutes les routes sans vérification d'authentification (pour le développement)
6. Le layout du tableau de bord vérifie si l'utilisateur est connecté en utilisant le module d'authentification simplifié

## Développement

Pour développer l'application, suivez ces étapes :
1. Clonez le dépôt
2. Installez les dépendances avec `npm install`
3. Démarrez l'application avec `npm run dev`
4. Accédez à l'application à l'adresse `http://localhost:3000`
5. Connectez-vous avec les identifiants admin (email: `admin@educonnect.com`, mot de passe: `password123`)
