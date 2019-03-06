# Stage 1. Build the application assets
FROM node:alpine as builder

WORKDIR /usr/src/app

# Create .npmrc config file
ARG FONT_AWESOME_KEY=none
RUN echo '@fortawesome:registry=https://npm.fontawesome.com/\n\
//npm.fontawesome.com/:_authToken='${FONT_AWESOME_KEY} \
>> .npmrc

COPY package*.json ./
RUN npm set progress=false && \
    npm config set depth 0 && \
    npm install

COPY . .
RUN node_modules/.bin/gulp

# Stage 2. Define the runtime 
FROM node:alpine

RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

WORKDIR /home/node/app
RUN chown node.node .

USER node
ENV NODE_ENV production

COPY package*.json ./
RUN npm set progress=false && \
    npm config set depth 0 && \
    npm install --production

COPY . .
COPY --from=builder /usr/src/app/public public

ENV PORT 5000
EXPOSE 5000

CMD ["node", "index.js"]