FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=0 /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
