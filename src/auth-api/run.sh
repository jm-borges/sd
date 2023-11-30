#!/bin/bash

npm install;

npm run migrate;

if [ "$USE_DEV_MODE" = "true" ];
  then npm run watch;
  else npm run start;
fi