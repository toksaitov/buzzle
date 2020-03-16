FROM node:13.10.1-buster

WORKDIR /buzzle
EXPOSE 8080

COPY package.json /buzzle
RUN npm install
COPY . /buzzle

CMD ["npm", "start"]
