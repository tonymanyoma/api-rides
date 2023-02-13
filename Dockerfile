FROM node:14.16.0

# Create app directory
WORKDIR /app


COPY package*.json ./

RUN npm install

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]