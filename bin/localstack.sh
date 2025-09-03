#!/bin/bash

set -e

CONTAINER_NAME=sample-localstack

function usage() {
cat >&2 <<EOF
ログ:
docker logs -f $CONTAINER_NAME


動作確認:
aws s3 ls

# DynamoDBテーブル一覧
aws dynamodb scan --table-name SensorReadings

# 指定したセンサーの一定期間のデータを取得
aws dynamodb query \\
  --table-name SensorReadings \\
  --key-condition-expression "pk = :p AND ts BETWEEN :t1 AND :t2" \\
  --expression-attribute-values '{
    ":p": {"S": "sensor-001#$(date -u +"%Y%m%d")"},
    ":t1": {"S": "$(date -u +"%Y-%m-%dT00:00:00Z")"},
    ":t2": {"S": "$(date -u +"%Y-%m-%dT23:59:59Z")"}
  }'

# 指定したセンサーの最新データを取得
aws dynamodb query \\
  --index-name GSI_SensorLatest \
  --table-name SensorReadings \\
  --key-condition-expression "sensorId = :sid" \\
  --expression-attribute-values '{":sid": {"S": "sensor-002"}}' \\
  --no-scan-index-forward \\
  --limit 1

# 横浜エリアの全センサーで一定期間の30度以上のデータを取得
aws dynamodb query \\
  --index-name GSI_LocationTime \\
  --table-name SensorReadings \\
  --key-condition-expression "locationBucket = :lb AND ts BETWEEN :t1 AND :t2" \\
  --filter-expression "temperature >= :temp" \\
  --expression-attribute-values '{
    ":lb": {"S": "yokohama#$(date -u +"%Y%m%d")"},
    ":t1": {"S": "$(date -u +"%Y-%m-%dT00:00:00Z")"},
    ":t2": {"S": "$(date -u +"%Y-%m-%dT23:59:59Z")"},
    ":temp": {"N": "30"}
  }'
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

# DockerHub: https://hub.docker.com/r/localstack/localstack
# NOTE: lambdaサービスを利用するには、Dockerソケットをマウントする必要がある
docker rm -f $CONTAINER_NAME || true
docker run \
  --rm \
  -d \
  --network $DOCKER_NETWORK \
  --name $CONTAINER_NAME \
  -v "$HOST_DIR/docker/localstack/conf:/etc/localstack/init/ready.d" \
  -v "/var/run/docker.sock:/var/run/docker.sock" \
  localstack/localstack:latest

docker logs -f $CONTAINER_NAME
