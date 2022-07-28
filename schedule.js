'use strict'
require('dotenv').config()
const Queue = require('bull')
const { config } = require('./config')
const { faker } = require('@faker-js/faker')

console.log(`[${config.env}] scheduling app starting`)

const videoQueue = new Queue('video transcoding', { ...config.redis })
const imageQueue = new Queue('image transcoding', { ...config.redis })

;(async () => {
  const videoJobsToSchedule = 4
  const imageJobsToSchedule = 40

  console.log(`[${config.env}] scheduling ${videoJobsToSchedule} video jobs`)
  for (let index = 0; index < videoJobsToSchedule; index++) {
    await videoQueue.add({ video: `${faker.image.cats()}.mov` });
  }

  console.log(`[${config.env}] scheduling ${imageJobsToSchedule} image jobs`)
  for (let index = 0; index < imageJobsToSchedule; index++) {
    imageQueue.add({ image: faker.image.cats() });
  }

  console.log(`[${config.env}] scheduling done`)
})()