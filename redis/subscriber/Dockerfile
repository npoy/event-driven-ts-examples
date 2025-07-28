FROM node:18

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
RUN npm install

COPY subscriber/ ./subscriber/

CMD ["npx", "tsx", "subscriber/index.ts"]
