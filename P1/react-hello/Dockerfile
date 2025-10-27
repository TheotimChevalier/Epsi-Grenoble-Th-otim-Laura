FROM node:20-alpine
WORKDIR /app

# Copier les fichiers de dépendances et installer
COPY package*.json ./
RUN npm ci

# Copier le reste des fichiers
COPY . .

# Exposer le port du serveur React
EXPOSE 3000

# Lancer le serveur de développement React
CMD ["npm", "start"]