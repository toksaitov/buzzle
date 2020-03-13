FROM node:13.10.1-buster

WORKDIR /buzzle
EXPOSE 80

COPY package.json /buzzle
RUN npm install
COPY . /buzzle

CMD ["npm", "start"]
