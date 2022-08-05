# Remazing DevOps Challenge

DevOps Challenge to evaluate basic Ops skills - [Click here to go the challenge manifest](./docs/challenge.md)

## Getting started

1. Have a Redis instance in local
2. Create a `.env` file and set `SECRET_KEY=` to a value. This secret should not leak!
3. To run the code:

```sh
# Coded with node v16
npm install

# Push jobs to a queue
npm run schedule

# process jobs in a queue
npm run process
```

### Main packages

- [BullQ](https://github.com/OptimalBits/bull) for Redis Queue
- [Prom-client](https://github.com/siimon/prom-client) for metrics

