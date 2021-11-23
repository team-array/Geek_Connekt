FROM node:15
WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . ./
EXPOSE 8000
CMD ["npm", "run", "dev"]