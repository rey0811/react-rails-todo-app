FROM ruby:2.6.6
ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq
RUN apt-get install -y build-essential libpq-dev nodejs yarn
RUN mkdir /app
WORKDIR /app

ADD . /app

# ADD Gemfile /app/Gemfile
# ADD Gemfile.lock /app/Gemfile.lock

RUN gem install bundler:2.0.1

RUN bundle install
