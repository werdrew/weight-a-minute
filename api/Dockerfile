FROM node:lts

WORKDIR /usr/local/src

COPY package.json ./
COPY package-lock.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 5601
ENV NODE_ENV production
ENTRYPOINT ["node", "index.js"]