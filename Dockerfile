# Stage 1: Build the React application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency definition
COPY package*.json ./

# Install dependencies cleanly
RUN npm ci || npm install

# Copy source files and build
COPY . .
RUN npm run build

# Stage 2: Production Nginx Server
FROM nginx:alpine

# Copy built production assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy Nginx template (Render dynamically injects $PORT, default is 80)
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Default PORT environment variable
ENV PORT=80

EXPOSE ${PORT}

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
