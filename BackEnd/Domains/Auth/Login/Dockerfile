# Use the official Node.js LTS version based on Alpine Linux (lightweight)
FROM node:lts-alpine

# Set the environment variable to 'production' for optimized performance
ENV NODE_ENV=production

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package files (package.json, package-lock.json, npm-shrinkwrap.json) into the container
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# Install dependencies for production only (without dev dependencies)
RUN npm install --production --silent && mv node_modules ../

# Copy the rest of the application files into the container
COPY . .

# Expose port 3001 for the application to be accessible externally
EXPOSE 3001

# Change ownership of the app directory to the 'node' user
RUN chown -R node /usr/src/app

# Switch to the 'node' user (predefined non-root user in the Node.js official image)
USER node

# Command to run the app when the container starts
CMD ["npm", "start"]
