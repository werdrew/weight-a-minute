FROM node:lts

WORKDIR /usr/local/src

COPY package.json ./
COPY package-lock.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 5601
CMD ["node", "index.js"]