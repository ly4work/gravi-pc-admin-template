#!/bin/bash
set -e

#find /usr/share/nginx/html -name '*.js' | xargs sed -i "s localhost:http $PRO_HTTP g"
#find /usr/share/nginx/html -name '*.js' | xargs sed -i "s localhost:8080 $PRO_API_HOST g"
#find /usr/share/nginx/html -name '*.js' | xargs sed -i "s localhost:clientId $PRO_CLIENT_ID g"
#find /usr/share/nginx/html -name '*.js' | xargs sed -i "s localhost:local $PRO_LOCAL g"
#find /usr/share/nginx/html -name '*.js' | xargs sed -i "s localhost:headertitlename $PRO_HEADER_TITLE_NAME g"
#find /usr/share/nginx/html -name '*.js' | xargs sed -i "s localhost:cookieServer $PRO_COOKIE_SERVER g"
#find /usr/share/nginx/html -name '*.html' | xargs sed -i "s localhost:titlename $PRO_TITLE_NAME g"
#find /usr/share/nginx/html -name '*.js' | xargs sed -i "s POD_WEBSOCKET_URL $PRO_DEVOPS_HOST g"
#find /usr/share/nginx/html -name '*.js' | xargs sed -i "s SERVICES_URL_EXAMPLE $PRO_AGILE_HOST g"
#find /usr/share/nginx/html -name '*.js' | xargs sed -i "s localhost:fileserver $PRO_FILE_SERVER g"
#find /usr/share/nginx/html -name '*.js' | xargs sed -i "s localhost:wsserver $PRO_WEBSOCKET_SERVER g"


# Recreate config file
rm -rf ./env-config.js
touch ./env-config.js

# Add assignment 
echo "window._env_ = {" >> ./env-config.js

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  # use value from .env file
  value=${varvalue}
  
  # Append configuration property to JS file
  echo "  $varname: \"$value\"," >> ./env-config.js
done < .env${FRONTENV}

while read -r line || [[ -n "$line" ]];
do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  #use value from .env file
  value=${varvalue}
  
  # Append configuration property to JS file
  echo "  $varname: \"$value\"," >> ./env-config.js
done < .default.env

echo "}" >> ./env-config.js





exec "$@"
