'use strict'
require('dotenv').config()

const Queue = require('bull')
const express = require('express')
const server = express()
const promClient = require('prom-client')
const { faker } = require('@faker-js/faker')

const { config } = require('./config')
const { randomSleep, logMemory } = require('./utils')

console.log(`[${config.env}] process app starting`)

console.log(`[env:${config.env}] [server-port:${config.server.port}] [host:${config.redis.host}] [port:${config.redis.port}] [password:${config.redis.password}]`)

// if(!process.env.SECRET_KEY) throw new Error('SECRET_KEY: This private key is necessary')

promClient.collectDefaultMetrics({
	timeout: 10000,
	gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5], // These are the default buckets.
})

const videoQueue = new Queue('video transcoding', { redis: { port: config.redis.port, host: config.redis.host, password: config.redis.password } })
const imageQueue = new Queue('image transcoding', { redis: { port: config.redis.port, host: config.redis.host, password: config.redis.password } })

const dataProcessed = []

const createProcessor = (name = 'default') => async (job = {}) => {
  console.log(`[${config.env}:${job.id}] processing ${job.queue.name}...`)

  dataProcessed.push({
    job,
    metadata: faker.random.words(500_000)
  })

  // processing long running job (up to 3s)
  await randomSleep(4)

  if (job.id % 8 === 0) throw new Error('some unexpected error')
  
  console.log(`[${config.env}:${job.id}] processing ${job.queue.name} done`)
  return {
    metadata: faker.random.words(500_000)
  }
}

const videoProcessor = createProcessor('video')
const imageProcessor = createProcessor('image')

/*
* Processing queues
*/
videoQueue.process(function (job) {
  return videoProcessor(job)
})

imageQueue.process(function (job) {
  return imageProcessor(job)
})

videoQueue.on('completed', async function (job, result) {
  const videoJobCounts = await job.queue.getJobCounts()
  console.log(`[${config.env}:video] count jobs - waiting: ${videoJobCounts.waiting}, completed: ${videoJobCounts.completed}, failed: ${videoJobCounts.failed}`)
})

imageQueue.on('completed', async function (job, result) {
  const videoJobCounts = await job.queue.getJobCounts()
  console.log(`[${config.env}:image] count jobs - waiting: ${videoJobCounts.waiting}, completed: ${videoJobCounts.completed}, failed: ${videoJobCounts.failed}`)
})

/*
* Server part
*/
server.get('/', (req, res) => {
  res.send('Hello World!')
})

server.get('/healthz', async (req, res) => {
	try {
		res.send({
      healthy: true,
      processingData: dataProcessed.length,
      app: 'dummy-app',
      env: config.env
    })
	} catch (ex) {
		res.status(500).end(ex)
	}
})

server.get('/metrics', async (req, res) => {
	try {
		res.set('Content-Type', promClient.register.contentType)
		res.end(await promClient.register.metrics())
	} catch (ex) {
		res.status(500).end(ex)
	}
})

console.log(`[${config.env}] Server listening on :${config.server.port}, metrics exposed on /metrics endpoint, health exposed on /healthz endpoint`)
server.listen(config.server.port)
