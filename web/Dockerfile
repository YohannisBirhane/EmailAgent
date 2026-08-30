# --- Stage 1: Build static production bundle ---
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Stage 2: Serve static files via Nginx ---
FROM nginx:alpine

# Copy Nginx SPA configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output from Stage 1 into Nginx public directory
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
