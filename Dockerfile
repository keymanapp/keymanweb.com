# syntax=docker/dockerfile:1
FROM php:7.4-apache AS composer-builder

# Install Zip to use composer
RUN apt-get update && apt-get install -y \
    zlib1g-dev \
    libzip-dev \
    unzip
RUN docker-php-ext-install zip

# Install and update composer
COPY --from=composer /usr/bin/composer /usr/bin/composer
RUN composer self-update

USER www-data
WORKDIR /composer
COPY composer.* /composer/
RUN composer install

# Site
FROM php:7.4-apache
COPY resources/keyman-site.conf /etc/apache2/conf-available/
RUN chown -R www-data:www-data /var/www/html/
COPY resources/run.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/run.sh

# Install cron
RUN apt-get update && apt-get install -y \
    cron
COPY resources/cache-keyboards-cron /etc/cron.d/
RUN chmod 644 /etc/cron.d/cache-keyboards-cron

COPY --from=composer-builder /composer/vendor /var/www/vendor
RUN a2enmod rewrite; a2enconf keyman-site

# build.sh configure later needed to create link to vendor/

# Modified entrypoint to start cron
ENTRYPOINT /usr/local/bin/run.sh
