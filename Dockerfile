FROM denoland/deno

EXPOSE 3000

WORKDIR /app

ADD . /app

RUN deno cache server.ts

CMD ["run", "--allow-net", "--allow-read", "server.ts"]