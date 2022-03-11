FROM node:14
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
CMD ["sh", "-c","node scripts/migrateLatest.js && npm run-script start"]