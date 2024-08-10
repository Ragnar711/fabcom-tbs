FROM node:lts as ts-compiler

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma
COPY .env ./

RUN apt-get -qy update && apt-get -qy install openssl

RUN npm install

RUN npm install @prisma/client

COPY . ./

RUN npx prisma generate --schema ./prisma/schema.prisma

RUN npm run build

FROM node:lts

WORKDIR /app

COPY --from=ts-compiler /app ./
COPY .env ./

CMD ["npm", "run", "start"]