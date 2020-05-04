FROM node:12-alpine
WORKDIR /app

RUN apk add python
RUN npm install -g nodemon knex

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY knexfile.js knexfile.js

RUN npm install

COPY src src

CMD knex migrate:latest && yarn start
