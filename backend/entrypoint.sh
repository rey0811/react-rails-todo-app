#!/bin/bash

service nginx start
cd /app
bin/setup
bundle exec pumactl start
