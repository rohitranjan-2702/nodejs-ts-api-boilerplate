# Fetching the minified node image on apline linux
FROM node:slim

# Declaring env
ARG DATABASE_URL
ENV DATABASE_URL ${DATABASE_URL}

# Setting up the work directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get update -y && apt-get install -y openssl

# Installing pm2 globally
RUN npm install pm2 -g

# Installing dependencies
RUN npm install

# Copying all the files in our project
COPY . .

# Exposing server port
EXPOSE 8080

# Starting our application
CMD ["npm", "run", "dev"]
# CMD ["pm2", "start", "dist/index.js"]

