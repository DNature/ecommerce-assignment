FROM nginx:1.19.0-alpine

RUN mkdir -p /etc/nginx/ssl

COPY ./self* /etc/nginx/ssl/
COPY ./dhparam.pem /etc/nginx/ssl/dhparam.pem

COPY ./nginx.conf /etc/nginx/nginx.conf