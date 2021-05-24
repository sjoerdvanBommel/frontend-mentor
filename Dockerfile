FROM node:14.17.0-alpine
WORKDIR /app
EXPOSE 80
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

CMD ["npm", "run", "start:prd"]