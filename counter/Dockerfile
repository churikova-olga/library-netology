FROM node:16.13.0

WORKDIR /counter

ARG NODE_ENV=production
COPY ./package*.json ./
RUN npm install
COPY src ./src


CMD ["npm", "run", "start"]