# Stage 2: Production
FROM node:18-alpine AS production
# Set working directory
WORKDIR /app
# Copy only production dependencies
COPY package*.json ./
RUN npm install
# Copy the rest of the application
COPY . .
# Expose production ports
EXPOSE 5173
# Start the application
CMD ["npm", "run", "dev"]