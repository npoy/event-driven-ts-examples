FROM node:18

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
RUN npm install

COPY worker/ ./worker/

CMD ["npx", "tsx", "worker/index.ts"]
