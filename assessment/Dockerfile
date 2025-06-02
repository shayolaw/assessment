FROM node:alpine

WORKDIR /app

COPY . /app

RUN npm install -g @angular/cli

RUN npm install --legacy-peer-deps

CMD ["ng", "serve", "--host", "0.0.0.0"]
