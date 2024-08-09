# Compilation stage
FROM node:22-alpine as ts-compiler

WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./

RUN npm install
COPY . ./
RUN npm run build

# Cleaning stage
FROM node:22-alpine

WORKDIR /app
COPY --from=ts-compiler /app/package*.json ./
COPY --from=ts-compiler /app/dist ./dist
RUN npm install --omit=dev

# ADD prisma schema before running npx prisma generate
COPY prisma/schema.prisma ./prisma/schema.prisma
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]

