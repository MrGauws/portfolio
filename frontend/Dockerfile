# Step 1: Build the app
FROM node:18-alpine AS builder

WORKDIR /app

# Kopiera först package.json och package-lock.json för att utnyttja Docker-cachning
COPY package.json package-lock.json ./
RUN npm install

# Kopiera resten av koden och bygg appen
COPY . .
RUN npm run build

# Step 2: Run the app in a lightweight image
FROM node:18-alpine AS runner

WORKDIR /app

RUN apk add --no-cache netcat-openbsd

# Kopiera endast det som behövs för produktion
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/server.js ./server.js 

# Installera endast produktionsberoenden
RUN npm install --omit=dev

EXPOSE 3000

# Starta appen
CMD ["npm", "start"]
