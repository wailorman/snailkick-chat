FROM node:latest
MAINTAINER wailorman

ADD . /tmp/www

WORKDIR /tmp/www

RUN npm install

RUN rm -rf /var/www/* && \
    cp /tmp/www/built/* /var/www

VOLUME ["/var/www"]