#create dockerContainer POSTGRES
docker run --name some-postgres -e POSTGRES_PASSWORD=password -v :/var/lib/postgresql/data -p 5432:5432 -d postgres:13.2
#Bind to container
psql -h localhost -p 5432 -U postgres
#Create DB
CREATE DATABASE sipapi
