FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . . 

EXPOSE 8080

# CMD ["npm","run","dev"]
CMD ["npm", "start"]  