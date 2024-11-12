FROM node:20-alpine
LABEL authors="nick martin"

RUN mkdir -p /home/node/app/node_modules && \
    chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node ./src/ .

USER node

RUN npm install --registry http://registry.npmjs.org/

ENV PORT=3000

EXPOSE $PORT

ENTRYPOINT ["node", "/home/node/app/bin/www"]