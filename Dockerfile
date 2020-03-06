FROM nginx:1.17-alpine
COPY dist/my-app /usr/share/nginx/html
