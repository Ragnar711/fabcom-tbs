FROM node:lts AS ts-compiler

WORKDIR /app

COPY package*.json tsconfig.json .env ./

COPY prisma ./prisma

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