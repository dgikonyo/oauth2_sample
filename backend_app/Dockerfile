# Stage 1: Development
FROM node:18-alpine AS development
# Set working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install development dependencies
RUN npm install
# Copy the entire project
COPY . .
# Expose ports for API and frontend
EXPOSE 3000 
# Use nodemon for hot reloading in development
CMD ["npm", "run", "dev"]