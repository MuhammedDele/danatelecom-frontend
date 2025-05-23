# Build stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Set environment variables for build optimization
ENV NODE_ENV=production
ENV CI=false
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy all files
COPY . /app/.

# Build the app with increased memory limit
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=0 /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 