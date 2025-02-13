# Use the official Node.js LTS Alpine image, which is a lightweight version of Node.js
FROM node:lts-alpine

# Set the environment variable for production mode
ENV NODE_ENV=production

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json, package-lock.json, and npm-shrinkwrap.json files to the container
# These files contain information about the project's dependencies
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# Install the project dependencies in production mode and suppress verbose output,
# then move the 'node_modules' folder to the parent directory to optimize the image size
RUN npm install --production --silent && mv node_modules ../

# Copy the rest of the application files into the container
COPY . .

# Expose port 3002 for communication with the outside world
EXPOSE 3002

# Change the ownership of the app directory to the 'node' user to improve security
RUN chown -R node /usr/src/app

# Switch to the 'node' user (which is a non-root user) for running the application
USER node

# Start the application using 'npm start' when the container is run
CMD ["npm", "start"]
