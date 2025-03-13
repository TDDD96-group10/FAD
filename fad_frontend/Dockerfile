# Use the latest LTS version of Node.js
FROM node:lts

# Set the working directory inside the container
WORKDIR /fad_frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Clear npm cache
RUN npm cache clean --force

# Install dependencies
RUN npm install

# Install additional dependencies locally
RUN npm install react-router-dom
RUN npm install openapi-typescript
RUN npm install swagger-typescript-api
RUN npm install @mantine/core @mantine/hooks @mantine/form
RUN npm install --save-dev postcss postcss-preset-mantine postcss-simple-vars

# Copy the rest of your application files
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "run", "dev"]