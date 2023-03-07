FROM node:16-alpine

# Set the working directory
ENV NODE_ENV=${NODE_ENV:-DEV}
ENV REACT_APP_SERVER_PREFIX=${REACT_APP_SERVER_PREFIX:-https://crm-weather-alert-r7rea.ondigitalocean.app}

WORKDIR /app

RUN mkdir -p -m 0600 /app/client && \
    mkdir -p -m 0755 /app/server

# Add client & server

COPY ./server /app/server
COPY ./client /app/client

RUN npm config set strict-ssl false

RUN cd /app/client && npm ci --without-ssl --insecure
RUN cd /app/server && npm ci --without-ssl --insecure
RUN cd /app/client && npm rebuild node-sass && npm run build

EXPOSE 3001

# TODO: only dist and node_modules folders are needed after build
# could delete these for smaller prod image

CMD sh -c 'cd $WORKDIR/app/server && node ./server.js'