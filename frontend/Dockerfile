FROM node:lts

WORKDIR /usr/local/src

ENV PATH /usr/local/src/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install
RUN npm install -g serve

COPY . .

RUN npm run build
CMD ["serve", "-s", "build"]