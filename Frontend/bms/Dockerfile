# Use the official Node.js image as a base
FROM node:lts-alpine3.19 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
# Health check endpoint for frontend service
HEALTHCHECK --interval=10s --timeout=5s --retries=5 \
    CMD curl -f http://localhost:80 || exit 1
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]