FROM ruby:2.6.6
ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq
RUN apt-get install -y build-essential libpq-dev nodejs yarn nginx
RUN nginx
RUN mkdir /app
WORKDIR /app

ADD . /app

RUN gem install bundler:2.0.1

RUN bundle install

RUN mkdir -p tmp/sockets
RUN mkdir tmp/pids

# nginx
RUN groupadd nginx
RUN useradd -g nginx nginx
ADD nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

RUN chmod +x /app/entrypoint.sh

CMD ["/app/entrypoint.sh"]
