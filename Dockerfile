FROM node
MAINTAINER wailorman

RUN mkdir /tmp/www

ADD . /tmp/www

WORKDIR /tmp/www

RUN npm i

RUN rm -rf /var/www/* && \
    cp /tmp/www/built/* /var/www

VOLUME ["/var/www"]