# Use the latest LTS version of Node.js
FROM node:18
 
# Set the working directory inside the container
WORKDIR /fad_frontend
 
# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies
RUN npm install

RUN npm install react-router-dom

RUN npm install -g openapi-typescript

RUN npm install -g swagger-typescript-api

RUN npm install -g @mantine/core @mantine/hooks @mantine/form

RUN npm install -g --save-dev postcss postcss-preset-mantine postcss-simple-vars

RUN npm list -g --depth=0 --json

RUN pwd

# Copy the rest of your application files
COPY . .
 
 
# Expose the port your app runs on
EXPOSE 3000
 
# Define the command to run your app
CMD ["npm", "run", "dev"]

