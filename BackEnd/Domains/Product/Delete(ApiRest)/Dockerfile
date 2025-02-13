# Use an official Node.js image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy all the source code to the container
COPY . .

# Expose the microservice port
EXPOSE 4001

# Define the command to run the server
CMD ["npm", "start"]
