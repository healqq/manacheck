FROM nginx:1.9.9

# configuring
RUN rm /etc/nginx/nginx.conf
RUN rm /etc/nginx/conf.d/default.conf
ADD ./nginx.conf /etc/nginx/
ADD ./manacheck.conf /etc/nginx/conf.d/
ADD ./gzip.conf /etc/nginx/conf.d/