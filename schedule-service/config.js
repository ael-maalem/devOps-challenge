const config = {
  env: process.env.NODE_ENV || 'local',
  server: {
    port: process.env.SERVER_PORT || ''
  },
  redis: {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || 'localhost',
    password: process.env.REDIS_PASSWORD || 'default'
  }
}

module.exports = { config }
