#!/bin/bash
echo "start ALL"
mvn spring-boot:run
mvn -pl sip-databaseloader compile exec:java -Dexec.mainClass="DatabaseLoader"
cd allServices
docker-compose up
cd ..
cd sip-react
npm install
npm start
