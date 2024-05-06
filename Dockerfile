FROM --platform=linux/amd64 node:18.17.0-alpine3.18

ENV PORT 80

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy build output files
COPY node_modules node_modules
COPY package.json package.json
COPY public public
COPY .next .next
COPY next.config.js next.config.js
COPY .env.* .

EXPOSE $PORT

# Running the app
ENTRYPOINT [ "yarn", "start" ]
