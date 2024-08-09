FROM node:22-alpine AS build-stage

ENV PORT 3000
ENV JWT_SECRET secret
ENV NODE_ENV production
ENV DATABASE_URL mysql://user:password@db:3306/fabcom

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

RUN apk add --update openssl

CMD ["node", "/app/dist/index.js"]