#!/bin/bash

echo "📌- 1 stage: Set image variables"
# Variables
IMAGE_SOURCE=process
IMAGE_LATEST=$IMAGE_SOURCE:latest
IMAGE_VERSION=$IMAGE_SOURCE:v1.0.1

echo "📌- 2 stage: Reuse the Docker daemon inside local minikube cluster"
eval $(minikube docker-env)

echo "📌- 3 stage: Build and tag the image with latest version"
docker build -t $IMAGE_LATEST ../
docker tag $IMAGE_LATEST $IMAGE_VERSION

echo "📌- 4 stage: Deploy app inside local minikube cluster"
kubectl apply -f ../k8s/deployment.yaml
kubectl apply -f ../k8s/service.yaml

echo "🎊🎉 Finally finish deployment 🥳🥳"
