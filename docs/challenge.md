# DevOps Challenge

Use DevOps best practices to __deploy__ & __monitor__ work queues.

A developer just pushed a new repository and it needs to be deployed to production. 1 service is pushing images and videos to a queue, and another one needs to process them.

The service should be able to process 2000 items in under 5min and to scale.

Environment variables must be configurable per environment and secrets should not leak.

Please document how we can run it.

Please shortly document your justification of technology/mechanism choice.

## About the challenge

This project is a simplified version of NodeJS applications that are running at scale in Kubernetes with a production set-up. 

We are looking at 3 technical points:
- basic Docker knowledge
- CI/CD
- Observability

A real production environment takes time and effort to build, this challenge does not aim to do our work or to achieve complete production grade but instead to highlight typical "DevOps"/"SRE" problems and workflows. Have fun ✌️

## Notes

- The challenge is more about the thinking process than tools. Not using the recommended tools is OK.
- The goal of this challenge is to check basic knowledge about CI/CD pipeline, and docker.
  - At Remazing, we use Bitbucket pipelines. Using it is recommended but optional.
- Kubernetes is our _Go-to_ solution to manage workloads at scale. It is recommended but optional. If you do use it, use [Kind](https://kind.sigs.k8s.io/) or Minikube to simulate production.
- Grafana for monitoring is a simple & good solution but feel free to use any tool (The [free plan](https://grafana.com/products/cloud/) is quite extensive).
- A staging environment is optional, but the deployment should be configurable enough to support different environments.

## Steps expected

- [ ] The scripts can be run in docker
- [ ] CI/CD pipelines (build & deploy)
- [ ] Deployment to "production"-like environment
- [ ] Observability on the Apps & Redis
- [ ] Scaling to achieve high throughput

## Open questions

- Does your deployment scale well?
- Can you identify a single point of failure?
- Observability
  - How do you monitor the app in production?
  - What do you monitor and why?
- Any feedback for the developers? ;)

## Resources

- [Google - workbook](https://sre.google/workbook/table-of-contents/)
- [Google - SRE book](https://sre.google/sre-book/table-of-contents/)
- [Grafana - monitoring microservices methods](https://grafana.com/blog/2018/08/02/the-red-method-how-to-instrument-your-services/)