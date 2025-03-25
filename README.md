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

## Configuration des variables d'environnement

### Développement local

1. Copiez le fichier `.env.example` et renommez-le en `.env`
2. Remplacez `your_openrouter_api_key_here` par votre clé API OpenRouter

```bash
cp .env.example .env
```

### Déploiement sur GitHub Pages

Pour déployer sur GitHub Pages tout en protégeant vos clés API, vous avez deux options :

1. **Mode de secours automatique** : Le chatbot détectera automatiquement qu'il est sur GitHub Pages et utilisera des réponses prédéfinies au lieu d'appeler l'API.

2. **Utiliser GitHub Secrets (recommandé pour les projets plus avancés)** :
   - Configurez GitHub Actions pour injecter la variable d'environnement pendant le build
   - Créez un fichier `.github/workflows/deploy.yml` avec la configuration nécessaire
   - Ajoutez votre clé API comme secret dans les paramètres de votre dépôt GitHub

### Autres options de déploiement

Pour un chatbot entièrement fonctionnel en production, envisagez d'utiliser :

- Vercel ou Netlify qui supportent nativement les variables d'environnement
- Un backend séparé qui sert d'intermédiaire pour les appels API, protégeant ainsi votre clé

## Déploiement avec GitHub Actions et secrets

Pour déployer votre application avec GitHub Actions en utilisant des secrets pour les variables d'environnement, suivez ces étapes :

### 1. Configurer les secrets GitHub

1. Allez sur votre dépôt GitHub et cliquez sur l'onglet "Settings"
2. Dans le menu latéral, cliquez sur "Secrets and variables" puis "Actions"
3. Cliquez sur le bouton "New repository secret"
4. Ajoutez un nouveau secret:
   - Name: `VITE_OPENROUTER_API_KEY`
   - Value: Votre clé API OpenRouter (par exemple `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`)
5. Cliquez sur "Add secret"

### 2. Activer GitHub Pages

1. Dans les paramètres du dépôt ("Settings"), allez à la section "Pages"
2. Dans "Source", sélectionnez "Deploy from a branch"
3. Dans "Branch", sélectionnez "gh-pages" et "/root", puis cliquez sur "Save"

### 3. Déclencher le déploiement

Le déploiement se déclenche automatiquement lorsque vous poussez sur la branche principale. Vous pouvez également le déclencher manuellement:

1. Allez dans l'onglet "Actions" de votre dépôt
2. Sélectionnez le workflow "Deploy to GitHub Pages" dans le menu latéral
3. Cliquez sur "Run workflow"

Une fois le workflow terminé, votre site sera déployé sur GitHub Pages avec les variables d'environnement configurées de manière sécurisée.
