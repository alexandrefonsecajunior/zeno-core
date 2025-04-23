FROM node:20-alpine

WORKDIR /app

# Copia só os arquivos de dependência para aproveitar cache
COPY package*.json ./
RUN npm install

# Copia o resto do código
COPY . .

# Expõe a porta da API
EXPOSE 4000

CMD ["npm", "run", "dev"]