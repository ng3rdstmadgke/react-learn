#!/bin/bash

set -e

# DockerHub: https://hub.docker.com/_/postgres
CONTAINER_NAME=sample-postgresql
docker rm -f $CONTAINER_NAME || true
docker run \
  --rm \
  -d \
  --network $DOCKER_NETWORK \
  --name $CONTAINER_NAME \
  -e POSTGRES_PASSWORD=root1234 \
  -e POSTGRES_USER=app \
  -e POSTGRES_DB=sample \
  postgres:16.10

cat >&2 <<EOF
ログインコマンド

PGPASSWORD=root1234 psql -U app -h sample-postgresql -d sample -p 5432
EOF