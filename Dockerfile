FROM node:10.16.0-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

# change to root user to be able to run apk command
USER root

# add system dependencies to be able to npm install dependencies that rely on node-gyp
# see https://aviaryan.com/blog/gsoc/docker-using-alpine
# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
# RUN apk --no-cache --virtual build-dependencies add \
#     python \
#     make \
#     g++

# install curl
# RUN apk add --no-cache curl

# change to node user to cause npm dependencies to be owned by node user
USER node

RUN npm install

# change to root user to be able to run apk command
USER root

# remove build deps to avoid large image
# RUN apk del build-dependencies

# change back to node user so that the copied files will be owned by node user
USER node

COPY --chown=node:node . .

# docker container will expose 8080 port external
EXPOSE 8080


# default command to start the container
CMD ["node", "server.js"] 