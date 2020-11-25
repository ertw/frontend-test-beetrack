FROM node:dubnium-alpine AS backend
WORKDIR /usr/app
COPY package*.json ./
RUN npm ci -qy
COPY . .
EXPOSE 3001
CMD ["npm", "start"]