FROM node:13.10.1-buster

ARG PORT=8080

WORKDIR /buzzle
EXPOSE $PORT

COPY package.json /buzzle
RUN npm install
COPY . /buzzle

CMD ["npm", "start"]
