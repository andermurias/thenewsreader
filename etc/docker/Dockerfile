FROM node:12-alpine as builder

ARG env_type
ENV env_type=$env_type

RUN apk update && \
  apk add yarn make python g++

RUN mkdir /var/www
COPY . /var/www
WORKDIR /var/www
RUN cat ".env.$env_type" > /var/www/.env

RUN yarn install && yarn build

RUN rm -rf \
  .env.dist \
  .eslintrc.js \
  .gitignore \
  .git \
  .prettierrc \
  .stylelintrc.js \ 
  node_modules

FROM node:12-alpine

LABEL version="1.0.0"
LABEL vendor="TheNewsReader"

RUN apk update && \
  apk add yarn make python g++


RUN npm install pm2 -g

RUN mkdir -p /var/www /var/logs
WORKDIR /var/www
COPY --from=builder /var/www .

RUN yarn install --production=true

EXPOSE 80

CMD pm2 start --no-daemon /var/www/etc/pm2/process.yaml