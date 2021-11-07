FROM node:latest

WORKDIR /app/src

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3100

CMD [ "npm", "start" ]