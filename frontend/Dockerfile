FROM node:dubnium-alpine AS frontend
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci -qy
COPY . .
EXPOSE 3000
CMD ["npm", "start"]