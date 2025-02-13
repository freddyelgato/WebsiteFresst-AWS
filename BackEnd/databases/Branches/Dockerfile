# Use the latest version of the official MongoDB image
FROM mongo:latest

# Set the working directory inside the container to /data
WORKDIR /data

# Copy the branches.json file from the local machine to the container's /data directory
COPY branches.json /data/branches.json

# Copy the init-mongo.sh script into the container’s /docker-entrypoint-initdb.d directory
# This script will be executed when MongoDB starts
COPY init-mongo.sh /docker-entrypoint-initdb.d/init-mongo.sh

# Make the init-mongo.sh script executable
RUN chmod +x /docker-entrypoint-initdb.d/init-mongo.sh

# Expose port 27017 to allow external access to the MongoDB instance
EXPOSE 27017
