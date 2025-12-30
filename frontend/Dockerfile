FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install @rolldown/binding-linux-x64-musl 
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]