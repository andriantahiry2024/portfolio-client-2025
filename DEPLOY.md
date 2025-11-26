# Instructions de déploiement - Frontend

## 📤 Pousser sur GitHub

### Option 1 : Nouveau repo GitHub

1. Créez un nouveau repository sur [GitHub](https://github.com/new)
2. Notez l'URL du repo (format: `https://github.com/USERNAME/REPO_NAME.git`)

3. À la racine du projet Client, configurez le remote :
```bash
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

### Option 2 : Avec authentification GitHub

Si vous utilisez un compte GitHub différent :

```bash
git config user.name "Votre Nom GitHub"
git config user.email "votre-email-github@gmail.com"
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git push -u origin main
```

## 🔐 Configuration Git locale (optionnel)

Pour utiliser des credentials différents pour ce repo uniquement :

```bash
git config user.name "Nom pour frontend"
git config user.email "email-frontend@example.com"
```

## ⚠️ Important

- Le dossier `server/` est exclu du repo frontend (voir `.gitignore`)
- Le backend doit être poussé dans un repo séparé
- N'oubliez pas de configurer les variables d'environnement sur votre plateforme de déploiement

