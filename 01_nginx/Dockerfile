FROM node:latest

# Install gettext and Nginx
RUN apt update && apt install -y gettext nginx

# Copy nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Run NGINX
CMD ["nginx", "-g", "daemon off;"]