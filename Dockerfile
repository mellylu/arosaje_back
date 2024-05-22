# Dockerfile pour le back (Node.js + Prisma)
FROM node:16

# Créer le dossier de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Générer le client Prisma
RUN npx prisma generate

# Pousser la base de données Prisma
RUN npx prisma db push

# Appliquer les migrations Prisma
RUN npx prisma migrate dev --name migration

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port pour le serveur Node.js
EXPOSE 3000

# Commande par défaut pour démarrer l'application
CMD ["npm", "start"]
