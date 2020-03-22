#!/bin/bash
source etc/docker/.env

ENV_TYPE=$1

docker build \
        -f etc/docker/Dockerfile -t "$PROJECT_NAME:$IMAGE_TAG" \
        --build-arg ssh_prv_key="$(cat ~/.ssh/id_rsa)" --build-arg ssh_pub_key="$(cat ~/.ssh/id_rsa.pub)" \
        --build-arg env_type="$ENV_TYPE" \
        .
        