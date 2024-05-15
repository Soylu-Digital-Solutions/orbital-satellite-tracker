# Use a Node.js base image
FROM node:18.18.2-alpine3.18 as build

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the application with environment variables
ARG VITE_CESIUM_TOKEN
ARG VITE_N2YO_API_KEY
ENV VITE_CESIUM_TOKEN=$VITE_CESIUM_TOKEN
ENV VITE_N2YO_API_KEY=$VITE_N2YO_API_KEY
RUN pnpm run build

# Use a lightweight web server to serve the built files
FROM nginx:1.26-alpine3.19
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start the server
CMD ["nginx", "-g", "daemon off;"]
