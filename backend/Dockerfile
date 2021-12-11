FROM node:15
WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . ./
ENV PORT 8000
EXPOSE ${PORT}
CMD ["npm", "start"]