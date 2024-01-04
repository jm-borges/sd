#!/bin/bash

# Get and compile all dependencies
mix deps.get
mix deps.compile

# Check if not in dev mode
if [ "$USE_DEV_MODE" != "true" ]; then

  # Compile the project
  mix compile
fi

# Execute the project
if [ "$USE_DEV_MODE" = "true" ]; then
  nodemon --exec mix run;
else
  mix compile;
  mix release --overwrite;
  _build/dev/rel/importer/bin/importer start;
fi
