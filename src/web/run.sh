#!/bin/bash

npm install;

if [ "$USE_DEV_MODE" = "true" ];
  then npm run start;
  else npm run start; #!FIXME: install nginx for production
fi