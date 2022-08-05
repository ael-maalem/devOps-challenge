FROM node:lts-alpine

# Add init utility
RUN apk add dumb-init

# Set ENV vars
ENV APPLICATION process-service
ENV VERSION v1.0.0

# Create app directory
WORKDIR /usr/src/app

# Copy repo contents with user owner
COPY --chown=node:node . .
COPY package*.json /usr/src/app/

RUN npm install
# Installing dependencies
#RUN npm ci --only=production

# Expose port
EXPOSE 8080

# Set user
USER node

# Start server
CMD ["dumb-init", "node", "process.js"]
