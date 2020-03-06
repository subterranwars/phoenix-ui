FROM nginx:1.17-alpine
COPY dist/my-app /usr/share/nginx/html

RUN apk add --no-cache bash
RUN apk add --no-cache curl

HEALTHCHECK --interval=5s --timeout=5s --retries=3 \
  CMD curl --silent --fail http://localhost:80 || exit 1
