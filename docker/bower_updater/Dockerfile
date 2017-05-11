FROM node:7
RUN apt-get update && \
    npm install -g grunt-cli \
    && apt-get install -y ruby \
    && gem install sass

CMD ["bin/bash","-c", "cd /var/www/manacheck/frontend \
    && npm install \
    && node_modules/bower/bin/bower install --allow-root \
    && grunt build"]