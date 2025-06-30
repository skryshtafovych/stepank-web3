# Stage 1: Build the React frontend
FROM node:20-alpine AS build
WORKDIR /app

# Copy package configuration and install all dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the frontend
RUN npm run build

# Stage 2: Create the final production image
FROM node:20-alpine
WORKDIR /app

# Copy package configuration and install only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy the built frontend assets from the build stage
COPY --from=build /app/dist ./dist

# Copy the server script
COPY server.js .

# The server expects this ENV variable to be set
# It will be passed in during the 'docker run' command
ENV GEMINI_API_KEY=""

# Expose the port the server runs on
EXPOSE 3001

# The command to start the server
CMD ["node", "server.js"] 