FROM node:latest

ARG MONGO_URL
ENV MONGO_URL $MONGO_URL

ENV PORT 3000

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install --silent

COPY . /usr/src/app

CMD [ "npm", "start" ]
