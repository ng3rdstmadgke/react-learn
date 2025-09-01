#!/bin/bash

set -e

# DockerHub: https://hub.docker.com/_/postgres
docker run \
  --rm \
  -d \
  --network $DOCKER_NETWORK \
  --name sample-postgresql \
  -e POSTGRES_PASSWORD=root1234 \
  -e POSTGRES_USER=app \
  -e POSTGRES_DB=sample \
  postgres:16.10

cat >&2 <<EOF
ログインコマンド

PGPASSWORD=root1234 psql -U app -h sample-postgresql -d sample
EOF