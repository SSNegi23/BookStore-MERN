# Use Node.js LTS as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend files
COPY . .

# Build the frontend
# RUN npm run build

# Expose the frontend port (for Vite's development server or production preview)
EXPOSE 5173

# in active development
# use npm run dev, which starts Vite's development server with hot-reloading. 
# This way, changes to the code will reflect immediately.
CMD ["npm", "run", "dev"]

# I used npm run preview because:
# npm run preview serves the production build of your React app.
# This is ideal if you're testing the production-ready frontend.
# Command to start Vite's preview server
# CMD ["npm", "run", "preview"]
