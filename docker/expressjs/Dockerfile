FROM node:5.4.1
RUN apt-get update 

EXPOSE  3000

CMD ["bin/bash","-c", "cd /var/www/manacheck/backend && npm install && node bin/www"]