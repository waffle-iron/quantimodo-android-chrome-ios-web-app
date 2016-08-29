#!/bin/bash

if [ -z "$IONIC_EMAIL" ]
    then
        echo -e "${RED}build_android.sh: Please set IONIC_EMAIL env!${NC}"
        exit 1
fi

if [ -z "$GCM_SENDER_ID" ]
    then
        echo -e "${RED}build_android.sh: Please set GCM_SENDER_ID env!${NC}"
        exit 1
fi


if [ -z "$IONIC_PASSWORD" ]
    then
        echo -e "${RED}build_android.sh: Please set IONIC_PASSWORD env!${NC}"
        exit 1
fi


echo "ionic add ionic-platform-web-client"
ionic add ionic-platform-web-client

cordova plugin remove phonegap-plugin-push
ionic plugin remove phonegap-plugin-push

# We shouldn't need to do this because it should already be in package.json
ionic plugin add phonegap-plugin-push --variable SENDER_ID="${GCM_SENDER_ID}"

ionic io init -email ${IONIC_EMAIL} --password ${IONIC_PASSWORD}
ionic config set dev_push false

ionic push --google-api-key ${GCM_SERVER_API_KEY}
ionic config set gcm_key ${GCM_SENDER_ID}

ionic config build