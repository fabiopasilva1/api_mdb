FROM node:18-alpine3.18
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/uneel/mongorest
COPY package.json ./
RUN npm i global add node-gyp
RUN  npm install
ENV PATH=/opt/uneel/mongorest/node_modules/.bin:$PATH

WORKDIR /opt/uneel/mongorest/app
COPY . .
RUN chown -R node:node /opt/uneel/mongorest/app
USER node
EXPOSE ${API_PORT}
CMD ["npm","run","dev"]