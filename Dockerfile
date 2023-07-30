FROM endeveit/docker-jq AS deps

# https://stackoverflow.com/a/59606373
# To prevent cache invalidation from changes in fields other than dependencies
COPY package.json /tmp

RUN jq '{ dependencies, devDependencies }' < /tmp/package.json > /tmp/deps.json

FROM node:16.20.1-alpine3.18

ENV PORT 80

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY --from=deps /tmp/deps.json ./package.json
COPY yarn.lock .
RUN yarn

RUN yarn next telemetry disable

# Copying source files
COPY . .

# Building app
RUN yarn build
EXPOSE $PORT

# Running the app
CMD [ "yarn", "start" ]
