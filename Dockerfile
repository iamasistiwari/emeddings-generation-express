FROM node:20-slim

WORKDIR /app
COPY package*.json ./

RUN npm install -g typescript
RUN npm install 

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start"]
