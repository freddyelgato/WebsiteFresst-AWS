# Use the latest MongoDB official image
FROM mongo:latest

# Set the working directory inside the container
WORKDIR /data

# Copy the products.json file from the host to the container's /data directory
COPY products.json /data/products.json

# Copy the initialization script to the MongoDB entrypoint initialization folder
COPY init-mongo.sh /docker-entrypoint-initdb.d/init-mongo.sh

# Make sure the init-mongo.sh script is executable
RUN chmod +x /docker-entrypoint-initdb.d/init-mongo.sh

# Expose MongoDB's default port
EXPOSE 27017
