FROM nginx:1.19.0-alpine

RUN mkdir -p /etc/nginx/ssl
RUN apk add python3 python3-dev py3-pip build-base libressl-dev musl-dev libffi-dev
RUN pip3 install pip --upgrade
RUN pip3 install certbot-nginx
RUN mkdir /etc/letsencrypt

# COPY ./self* /etc/nginx/ssl/
# COPY ./dhparam.pem /etc/nginx/ssl/dhparam.pem

COPY ./nginx.conf /etc/nginx/nginx.conf