# Use the official Node.js image as base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Expose the port your application is configured to run on
EXPOSE 4002

# Command to start the application
CMD ["npm", "start"]
