#!/bin/sh
#
$ TOKEN=$(curl -X POST -H "Content-Type: application/x-www-form-urlencoded" \
     -d "client_id=web-app" \
     -d "username=rtanner" \
     -d "password=x8Iu/." \
     -d "grant_type=password" \
     http://localhost:8080/auth/realms/FHNW-LST-MI/protocol/openid-connect/token | \
		     jq '.access_token' | sed 's/"\(.*\)"$/\1/')

