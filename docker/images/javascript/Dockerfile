FROM node:21-alpine3.17

WORKDIR /app

RUN apk add bash
RUN npm update npm -g
RUN npm install nodemon -g
RUN npm install knex -g

ENTRYPOINT (sed -i 's/\r$//' ./run.sh) ; (chmod +x ./run.sh) ; ./run.sh