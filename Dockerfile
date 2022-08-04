FROM nginx
COPY ./dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/
COPY ./default.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]