FROM node:12-alpine

ADD views /app/views
ADD package.json /app
ADD server.js /app
ADD routes.js /app
ADD sockets.js /app
ADD models /app/models
ADD adminRouter.js /app
ADD .env /app

RUN cd /app; npm install


ENV DB_USERNAME admin
ENV DB_PASSWORD admin
ENV DB_CLUSTER cluster0.5cdt0
ENV DB_NAME geodata
ENV ADMIN_USERNAME admin@example.com
ENV ADMIN_PASSWORD 123456

ENV NODE_ENV production
ENV PORT 8080
EXPOSE 8080

WORKDIR "/app"
CMD [ "npm", "start" ]