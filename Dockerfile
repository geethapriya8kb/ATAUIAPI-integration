#stage 1
FROM node:16.13.2 as node
WORKDIR /app
COPY . .
RUN npm install --force
RUN npm run build --prod

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/agent-training-academy-ui /usr/share/nginx/html
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/settings.template.json > /usr/share/nginx/html/assets/settings.json && exec nginx -g \'daemon off;\'"]