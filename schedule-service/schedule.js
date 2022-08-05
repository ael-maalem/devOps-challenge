'use strict'
require('dotenv').config()
const Queue = require('bull')
const { config } = require('./config')
const { faker } = require('@faker-js/faker')

console.log(`[${config.env}] scheduling app starting`)
console.log(`[env:${config.env}] [server-port:${config.server.port}] [host:${config.redis.host}] [port:${config.redis.port}] [password:${config.redis.password}]`)


const videoQueue = new Queue('video transcoding', { redis: { port: config.redis.port, host: config.redis.host, password: config.redis.password } }, {
  redis: { tls: { rejectUnauthorized: false }}})
const imageQueue = new Queue('image transcoding', { redis: { port: config.redis.port, host: config.redis.host, password: config.redis.password } }, {
  redis: { tls: { rejectUnauthorized: false }}})

;(async () => {
  const videoJobsToSchedule = 5
  const imageJobsToSchedule = 45

  console.log(`[${config.env}] scheduling ${imageJobsToSchedule} image jobs`)
  for (let index = 0; index < imageJobsToSchedule; index++) {
    imageQueue.add({ image: faker.image.cats() });
  }

  console.log(`[${config.env}] scheduling ${videoJobsToSchedule} video jobs`)
  for (let index = 0; index < videoJobsToSchedule; index++) {
    await videoQueue.add({ video: `${faker.image.cats()}.mov` });
  }

  console.log(`[${config.env}] scheduling done`)
})()
