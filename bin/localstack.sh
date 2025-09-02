#!/bin/bash

set -e

# DockerHub: https://hub.docker.com/r/localstack/localstack
# NOTE: lambdaサービスを利用するには、Dockerソケットをマウントする必要がある
CONTAINER_NAME=sample-localstack
docker rm -f $CONTAINER_NAME || true
docker run \
  --rm \
  -d \
  --network $DOCKER_NETWORK \
  --name $CONTAINER_NAME \
  -v "$HOST_DIR/docker/localstack/conf:/etc/localstack/init/ready.d" \
  -v "/var/run/docker.sock:/var/run/docker.sock" \
  localstack/localstack:latest

cat >&2 <<EOF
aws cli コマンド

aws s3 ls
EOF
