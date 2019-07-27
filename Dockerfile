FROM node:12.7.0-slim
LABEL author="myhlcb" description="koa2test" 
WORKDIR /opt/koa
COPY ./package.json /tmp/
RUN cd /tmp &&\
  npm i --verbose
RUN mv /tmp/node_modules /opt/koa
COPY ./ /opt/koa
CMD [ "node","app.js" ]