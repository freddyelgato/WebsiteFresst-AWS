FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 3000
EXPOSE 3000

# Ensure Next.js listens on all network interfaces
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
