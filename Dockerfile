FROM ubuntu
MAINTAINER wailorman

RUN apt-get update && \
    apt-get install npm nodejs-legacy

RUN mkdir /tmp/www

ADD . /tmp/www

WORKDIR /tmp/www

RUN npm install --unsafe-perm

RUN rm -rf /var/www/* && \
    cp /tmp/www/built/* /var/www

VOLUME ["/var/www"]