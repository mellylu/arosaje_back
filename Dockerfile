# Dockerfile pour le back (Node.js + Prisma)
FROM node:16

# Créer le dossier de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le schéma Prisma avant de générer le client
COPY prisma ./prisma

# Définir les variables d'environnement nécessaires
ENV DATABASE_URL=postgresql://postgres:LCS988-m@db:5432/postgres?schema=Arosaje

# Générer le client Prisma
RUN npx prisma generate

# Appliquer les migrations Prisma
RUN npx prisma migrate dev --name migration --schema=./prisma/schema.prisma

# Pousser la base de données Prisma
RUN npx prisma db push --schema=./prisma/schema.prisma

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port pour le serveur Node.js
EXPOSE 3000

# Commande par défaut pour démarrer l'application
CMD sh -c 'until pg_isready -h db -p 5432; do echo "Waiting for database"; sleep 2; done; npx prisma migrate dev --name migration --schema=./prisma/schema.prisma && npm start'
