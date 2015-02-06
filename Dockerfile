FROM ubuntu
MAINTAINER wailorman

RUN apt-get update && \
    apt-get install npm nodejs-legacy git git-core -y

RUN mkdir /tmp/www && \
    mkdir /var/www

VOLUME ["/var/www"]

COPY . /tmp/www

WORKDIR /tmp/www

RUN npm install --unsafe-perm && \
    rm -rf /var/www/* && \
    cp -avr /tmp/www/built/* /var/www

