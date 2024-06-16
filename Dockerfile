FROM --platform=linux/amd64 node:18.17.0-alpine3.18

ENV PORT 80

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy build output files
COPY ./public ./public
COPY ./.next/standalone ./
COPY ./.env.production ./

EXPOSE $PORT

# Running the app
ENTRYPOINT [ "node", "server.js" ]
