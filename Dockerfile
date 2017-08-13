FROM node:6.9.5-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

# Install app dependencies
RUN npm install --no-progress

# Bundle app source
COPY . /usr/src/app

# Expose the public http port
EXPOSE 3000

# build and Start server
CMD ["npm", "start"]
