# Étape 1 : build de l'application React
FROM node:20-alpine AS build
WORKDIR /app

# Copier les dépendances et installer
COPY package*.json ./
RUN npm ci

# Copier le reste des fichiers et construire l'app
COPY . .
RUN npm run build

# Exposer le port 80
EXPOSE 80