#!/bin/bash

set -e

CONTAINER_NAME=sample-redis

function usage() {
cat >&2 <<EOF
ログ:
docker logs -f $CONTAINER_NAME


ログインコマンド:
redis-cli -u redis://app:pass1234@$CONTAINER_NAME:6379

Redisの操作:

# 疎通確認
sample-redis:6379> PING
PONG

# キーと値の設定・取得
sample-redis:6379> SET temp:room1 25.3
OK
sample-redis:6379> GET temp:room1
"25.3"

# インクリメント
sample-redis:6379> INCR cnt
(integer) 1
sample-redis:6379> INCR cnt
(integer) 2
sample-redis:6379> INCRBY cnt 3
(integer) 5

# リスト操作
sample-redis:6379> LPUSH tasks "task1"
(integer) 1
sample-redis:6379> LPUSH tasks "task2"
(integer) 2
sample-redis:6379> LPUSH tasks "task3"
(integer) 3
sample-redis:6379> LRANGE tasks 0 -1
1) "task3"
2) "task2"
3) "task1"

# 最後に追加した要素を取り出す
sample-redis:6379> LPOP tasks
"task3"

# 最初に追加した要素を取り出す
sample-redis:6379> RPOP tasks
"task1"

# 登録されているキーの一覧を表示
sample-redis:6379> KEYS *
1) "temp:room1"
2) "tasks"
3) "cnt"

# キーの削除
sample-redis:6379> DEL cnt

# Pub/Subチャンネル
sample-redis:6379> SUBSCRIBE temp:room1
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "temp:room1"
3) (integer) 1
1) "message"
2) "temp:room1"
3) "25.5"
sample-redis:6379> PUBLISH temp:room1 "25.5"
(integer) 1
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
  -v ${HOST_DIR}/docker/redis/conf:/usr/local/etc/redis \
  redis:8.2 \
  redis-server /usr/local/etc/redis/redis.conf


docker logs -f $CONTAINER_NAME
