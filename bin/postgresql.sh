#!/bin/bash

set -e


CONTAINER_NAME=sample-postgresql

function usage() {
cat >&2 <<EOF
ログ:
docker logs -f $CONTAINER_NAME


ログインコマンド:
PGPASSWORD=root1234 psql -U app -h sample-postgresql -d sample -p 5432
EOF
exit 1
}

args=()
while [ "$1" != "" ]; do
  case $1 in
    -h | --help ) usage ;;
    *           ) args+=("$1") ;;
  esac
  shift
done


# DockerHub: https://hub.docker.com/_/postgres
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

docker logs -f $CONTAINER_NAME