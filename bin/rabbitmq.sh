#!/bin/bash

set -e

CONTAINER_NAME=sample-rabbitmq

function usage() {
cat >&2 <<EOF
ログ:
docker logs -f $CONTAINER_NAME


ログインコマンド:

# キュー作成 (durable=true 永続化、再起動後も残る)
rabbitmqadmin \\
  --host $CONTAINER_NAME \\
  --port 15672 \\
  --username app \\
  --password pass1234 \\
  declare queue --name myqueue --durable true

# メッセージ送信
rabbitmqadmin \\
  --host $CONTAINER_NAME \\
  --port 15672 \\
  --username app \\
  --password pass1234 \\
  publish message --routing-key myqueue --payload "Hello, Rabbit!"

# メッセージ一覧
rabbitmqadmin \\
  --host $CONTAINER_NAME \\
  --port 15672 \\
  --username app \\
  --password pass1234 \\
  list queues

# メッセージ取得 (--ack-mode ack_requeue_false 取得したメッセージをキューに戻さない。消費する)
rabbitmqadmin \\
  --host $CONTAINER_NAME \\
  --port 15672 \\
  --username app \\
  --password pass1234 \\
  get messages --queue myqueue --ack-mode ack_requeue_false --count 1

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



# DockerHub: https://hub.docker.com/_/redis
docker rm -f $CONTAINER_NAME || true
docker run \
  --rm \
  -d \
  --network $DOCKER_NETWORK \
  --name $CONTAINER_NAME \
   -e RABBITMQ_DEFAULT_USER=app \
   -e RABBITMQ_DEFAULT_PASS=pass1234 \
  rabbitmq:4.1-management

docker logs -f $CONTAINER_NAME
