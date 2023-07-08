FROM node:18
WORKDIR /app
COPY ./package*.json ./
RUN yarn add
COPY . .
CMD ["yarn", "dev"]