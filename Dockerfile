# Stage 1. Build the application assets
FROM node:16-alpine as builder

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
RUN npm set progress=false && \
    npm config set depth 0 && \
    npm install

COPY . .
RUN node_modules/.bin/gulp

# Stage 2. Define the runtime 
FROM node:16-alpine

RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

WORKDIR /home/node/app
RUN chown node.node .

USER node
ENV NODE_ENV production

COPY --chown=node:node package*.json ./
RUN npm set progress=false && \
    npm config set depth 0 && \
    npm install --omit=dev

COPY . .
COPY --from=builder /usr/src/app/public public

ENV PORT 5000
EXPOSE 5000

CMD ["node", "index.js"]