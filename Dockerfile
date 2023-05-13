FROM node:16
WORKDIR /app/api/
COPY package*.json ./
RUN npm i --force
COPY . .
CMD ["npm", "start"]
EXPOSE 8080