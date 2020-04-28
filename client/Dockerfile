FROM node:12-alpine
WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY src src
COPY public public

CMD [ "yarn", "start" ]
