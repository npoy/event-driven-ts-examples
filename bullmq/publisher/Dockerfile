FROM node:18

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
RUN npm install

COPY publisher/ ./publisher/

CMD ["npx", "tsx", "publisher/index.ts"]
