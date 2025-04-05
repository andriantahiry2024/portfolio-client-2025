# Étape 1: Build de l'application React/Vite
FROM node:20-alpine AS builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json* ./

# Installer les dépendances du projet
# Utiliser --legacy-peer-deps si nécessaire ou ajuster selon vos dépendances
RUN npm install

# Copier tout le code source de l'application dans le conteneur
COPY . .

# Builder l'application pour la production
# Les variables d'environnement VITE_* sont généralement intégrées au build
# Assurez-vous qu'elles sont disponibles si nécessaire (ex: via ARG/ENV dans Docker ou CI/CD)
RUN npm run build

# Étape 2: Servir l'application avec Nginx
FROM nginx:stable-alpine

# Copier les fichiers statiques buildés depuis l'étape 'builder' vers le répertoire par défaut de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Optionnel: Copier une configuration Nginx personnalisée si vous en avez une
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# Une configuration de base pour les SPA React/Vue/etc. pourrait ressembler à :
# server {
#   listen 80;
#   location / {
#     root /usr/share/nginx/html;
#     index index.html;
#     try_files $uri $uri/ /index.html; # Important pour le routing côté client
#   }
# }

# Exposer le port sur lequel Nginx écoute par défaut
EXPOSE 80

# Commande pour démarrer Nginx en avant-plan
CMD ["nginx", "-g", "daemon off;"]