FROM registry.cn-hangzhou.aliyuncs.com/yx-repo/frontbase:0.7.0
MAINTAINER liyang

ENV PRO_LOCAL false

RUN echo "Asia/shanghai" > /etc/timezone;
ADD dist /usr/share/nginx/html
ADD enterpoint.sh /usr/share/nginx/html/enterpoint.sh

# 覆盖nginx配置
ADD nginx.conf /etc/nginx/nginx.conf

RUN chmod +x /usr/share/nginx/html/enterpoint.sh
WORKDIR /usr/share/nginx/html/

ENTRYPOINT ["/usr/share/nginx/html/enterpoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80
