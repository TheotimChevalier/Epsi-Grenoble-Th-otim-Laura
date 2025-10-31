FROM node:20 AS build
WORKDIR /app
# Copier uniquement ce dont on a besoin pour installer
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .
# Exemple de mode full / light selon .env
EXPOSE 1234
CMD ["yarn", "start"]