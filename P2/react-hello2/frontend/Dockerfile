# Étape 1 : build de l'application React/Vite
FROM node:20-alpine AS build
WORKDIR /app

# Copier les dépendances et installer
COPY package*.json ./
RUN npm ci

# Copier le reste des fichiers et construire l'app
COPY . .
RUN npm run build

# Étape 2 : serveur Nginx pour servir les fichiers statiques
FROM nginx:stable-alpine

# Installer curl pour le healthcheck
RUN apk add --no-cache curl

# Copier le build Vite dans le répertoire Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Exécuter avec un utilisateur non-root pour la sécurité
USER 65534:65534

# Healthcheck pour vérifier que Nginx sert l'application
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD curl -f http://localhost || exit 1
