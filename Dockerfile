FROM node as builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile


# Bundle app source
COPY . .

RUN yarn build

FROM node:20-slim
USER node

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production --frozen-lockfile

COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD [ "node", "dist/src/index.js" ]