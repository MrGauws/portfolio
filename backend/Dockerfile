FROM node:18-alpine

# Installera native build tools (för bcrypt + ev. andra C++-moduler)
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Kopiera package.json + lock först (för cache)
COPY package*.json ./

# Installera moduler (bcrypt byggs korrekt här)
RUN npm install

# Kopiera resten av koden
COPY . .

# Kompilera TypeScript → dist/
RUN npm run build

EXPOSE 5000

# Starta backend-servern
CMD ["node", "dist/server.js"]
