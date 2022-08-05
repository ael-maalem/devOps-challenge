#!/bin/bash

# Variables
IMAGE_SOURCE=schedule
IMAGE_LATEST=$IMAGE_SOURCE:latest
IMAGE_VERSION=$IMAGE_SOURCE:v1.0.1

eval $(minikube docker-env)

docker build -t $IMAGE_LATEST ../
docker tag $IMAGE_LATEST $IMAGE_VERSION

kubectl apply -f ../k8s/deployment.yaml
kubectl apply -f ../k8s/service.yaml
