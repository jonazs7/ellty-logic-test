# Ganti dari node:22-alpine menjadi node:22-slim
FROM node:22-slim

# Tambahkan baris ini untuk memastikan OpenSSL terpasang di Debian
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]