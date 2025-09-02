#!/bin/bash

# LocalStack - init-fooks: https://docs.localstack.cloud/references/init-hooks/
# デバッグコマンド: docker logs terraform-tutorial_devcontainer-localstack-1  | less
set -ex

REGION=ap-northeast-1

# secretsmanager: db secret
cat <<EOF > /tmp/mysql_secret.json
{
  "db_host": "sample-mysql",
  "db_password": "root1234",
  "db_port": "3306",
  "db_user": "root"
}
EOF
awslocal secretsmanager create-secret \
  --region ${REGION} \
  --name "sample/local/mysql" \
  --secret-string file:///tmp/mysql_secret.json

cat <<EOF > /tmp/postgresql_secret.json
{
  "db_host": "sample-postgresql",
  "db_password": "root1234",
  "db_port": "5432",
  "db_user": "app"
}
EOF
awslocal secretsmanager create-secret \
  --region ${REGION} \
  --name "sample/local/postgresql" \
  --secret-string file:///tmp/postgresql_secret.json

# sns
awslocal sns create-topic \
  --region ${REGION} \
  --name sample-topic

# sqs: report job queue
awslocal sqs create-queue \
  --region ${REGION} \
  --queue-name sample-sqs


# s3: app bucket
awslocal s3api create-bucket \
  --region ${REGION} \
  --bucket sample \
  --create-bucket-configuration LocationConstraint=${REGION}
