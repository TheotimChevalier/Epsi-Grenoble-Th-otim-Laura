# Étape 1 : installer les dépendances
FROM node:20-alpine AS build
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
# Utiliser npm install si pas de package-lock.json
RUN npm install

# Copier le reste du code
COPY . .

# Étape 2 : image runtime légère
FROM node:20-alpine
WORKDIR /app

# Copier le code et node_modules depuis l'étape de build
COPY --from=build /app /app

# Exposer le port du backend
EXPOSE 3000

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Healthcheck pour vérifier que le serveur est en ligne
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q --spider http://localhost:3000 || exit 1

# Lancer l'application
CMD ["node", "index.js"]
