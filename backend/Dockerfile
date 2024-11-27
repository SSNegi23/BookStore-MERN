# Use Node.js LTS as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend files
COPY . .

# Expose the backend port
EXPOSE 4000

# will watch for changes and restart the server automatically, which is essential for development.
CMD ["npm", "run", "dev"]

# Using npm start in the Dockerfile assumes you're running the backend in production mode
# where the application doesn't need to watch for file changes.
# Command to start the backend server
# CMD ["npm", "start"]
