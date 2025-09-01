#!/bin/bash

set -e

# DockerHub: https://hub.docker.com/_/mysql
docker run \
  --rm \
  -d \
  --network $DOCKER_NETWORK \
  --name sample-mysql \
  -e MYSQL_ROOT_PASSWORD=root1234 \
  -e MYSQL_DATABASE=sample \
  -e MYSQL_USER=app \
  -e MYSQL_PASSWORD=pass1234 \
  mysql:8.4 \
  --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci

cat >&2 <<EOF
ログインコマンド

MYSQL_PWD=root1234 mysql -u root -h sample-mysql
MYSQL_PWD=pass1234 mysql -u app -h sample-mysql
EOF