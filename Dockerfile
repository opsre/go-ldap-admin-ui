# 此 Dockerfile 仅用于构建可复制的 dist 内容，并不包含运行环境
# 第一阶段构建不区分平台，可通过指定 --platform=linux/amd64 来声明环境
FROM --platform=linux/amd64 docker.cnb.cool/znb/images/node:18 AS builder

WORKDIR /app

ADD . .

RUN  sed -i 's@http://localhost:8888/@/@g' .env.production \
     && git config --global url."https://".insteadOf git:// \
     && npm install --registry=http://registry.npmmirror.com \
     && yarn build:prod

FROM docker.cnb.cool/znb/images/alpine

WORKDIR /app

COPY --from=builder /app/dist/ dist/