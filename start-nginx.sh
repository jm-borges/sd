#!/bin/sh

# Substitui as variáveis de ambiente no template e gera o nginx.conf
envsubst '${SWAGGER_PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Inicia o Nginx
nginx -g 'daemon off;'
