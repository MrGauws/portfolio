# Step 1: Build the app
FROM node:18-alpine AS builder

# Installera byggverktyg för moduler som kräver kompilering
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Kopiera package.json och package-lock.json för att utnyttja Docker-cachning
COPY package*.json ./
RUN npm install

# Kopiera resten av koden och bygg appen
COPY . .
RUN npm run build

# Step 2: Run the app in a lightweight image
FROM node:18-alpine AS runner

WORKDIR /app

# Installera netcat för hälsokontrollen
RUN apk add --no-cache netcat-openbsd

# Kopiera endast det som behövs för produktion
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Installera endast produktionsberoenden
RUN npm install --omit=dev

EXPOSE 5000

# Starta appen
CMD ["node", "dist/server.js"]