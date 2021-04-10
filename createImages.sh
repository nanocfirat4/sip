#!/bin/bash
echo "Create IMAGES and push to REGISTRY GITLAB:FHNW"
docker login cr.gitlab.fhnw.ch
echo "login to registry done"
# shellcheck disable=SC2164
cd sip-databaseloader
mvn clean compile jib:build -Dimage=cr.gitlab.fhnw.ch/b-ls-mi-sip/projects-2021/sip2021-01-sth/sipdataloader
echo "SIP DATALOADER DONE"
cd ..
# shellcheck disable=SC2164
cd sip-api
mvn clean compile jib:build -Dimage=cr.gitlab.fhnw.ch/b-ls-mi-sip/projects-2021/sip2021-01-sth/sipapi
echo "SIP API DONE"
cd ..
# shellcheck disable=SC2164
cd sip-react
docker build -t cr.gitlab.fhnw.ch/b-ls-mi-sip/projects-2021/sip2021-01-sth/sipreact .
docker push cr.gitlab.fhnw.ch/b-ls-mi-sip/projects-2021/sip2021-01-sth/sipreact
echo "SIP REACT DONE"