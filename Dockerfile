FROM node:14.15.5

WORKDIR /convo-service
COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install
COPY . /convo-service
RUN npm i typescript -g
EXPOSE 5000
CMD npm run start  --debug

    