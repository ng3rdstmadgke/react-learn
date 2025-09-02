#!/bin/bash

set -e

# DockerHub: https://hub.docker.com/_/mysql
CONTAINER_NAME=sample-mysql
docker rm -f $CONTAINER_NAME || true
docker run \
  --rm \
  -d \
  --network $DOCKER_NETWORK \
  --name $CONTAINER_NAME \
  -e MYSQL_ROOT_PASSWORD=root1234 \
  -e MYSQL_DATABASE=sample \
  -e MYSQL_USER=app \
  -e MYSQL_PASSWORD=pass1234 \
  mysql:8.4 \
  --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci

cat >&2 <<EOF
ログインコマンド

MYSQL_PWD=root1234 mysql -u root -h sample-mysql -P 3306
MYSQL_PWD=pass1234 mysql -u app -h sample-mysql -P 3306
EOF