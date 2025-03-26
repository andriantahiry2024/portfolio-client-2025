# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## 🚀 Installation et démarrage

1. Clonez ce dépôt

## Variables d'environnement

Aucune variable d'environnement n'est requise pour le frontend. La clé API OpenRouter est gérée par le backend.

### Configuration du Backend

Le projet utilise un backend déployé sur Vercel qui sert de proxy pour les appels à l'API OpenRouter. Le backend est situé dans le dossier `backend/` et peut être déployé séparément.

Pour configurer le backend en local:

1. Accédez au dossier `backend/`
2. Copiez `.env.example` en `.env` et ajoutez votre clé API OpenRouter
3. Exécutez `npm install` puis `npm start`

### Déploiement sur Vercel

Le backend est configuré pour fonctionner sur Vercel:

1. Installez Vercel CLI: `npm install -g vercel`
2. Naviguez vers le dossier backend: `cd backend`
3. Déployez en production: `vercel --prod`

L'API déployée sera disponible à une URL du type: `https://portfolio-backend-xxx.vercel.app`
