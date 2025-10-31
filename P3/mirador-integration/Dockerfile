FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent
COPY . .
EXPOSE 1234
CMD ["npm", "run","serve-umd"]