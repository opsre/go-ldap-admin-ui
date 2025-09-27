FROM node:18.20-alpine as Builder

WORKDIR /space

COPY . .

RUN  apk add git \
     && git config --global url."https://".insteadOf git:// \
     && npm install --registry=http://registry.npmmirror.com 

ENV NODE_PATH=/space/node_modules