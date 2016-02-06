FROM node:5.4.1
RUN apt-get update 

CMD ["bin/bash","-c", "cd /var/www/manacheck/frontend && npm install && cd app && ../node_modules/bower/bin/bower install --allow-root"]