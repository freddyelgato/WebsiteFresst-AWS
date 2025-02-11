FROM mongo:latest

WORKDIR /data

COPY branches.json /data/branches.json

COPY init-mongo.sh /docker-entrypoint-initdb.d/init-mongo.sh

RUN chmod +x /docker-entrypoint-initdb.d/init-mongo.sh

EXPOSE 27017