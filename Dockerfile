# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:latest

# Create and change to the app directory.
WORKDIR /TaskAI

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy local code to the container image.
COPY . .

# Ensure the .env file is included in the image
COPY .env .env

# Run the web service on container startup.
CMD [ "node", "app.js" ]
