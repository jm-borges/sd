FROM elixir:1.15.7-alpine

WORKDIR /app

# install bash
RUN apk add bash

# install nodemon
RUN apk add --update nodejs npm
RUN npm update npm -g
RUN npm install nodemon -g

# install XML specific dependencies
RUN apk add erlang

ENTRYPOINT (sed -i 's/\r$//' ./run.sh) ; (chmod +x ./run.sh) ; ./run.sh