// Sleep up to <max> seconds
const randomSleep = (max = 4) => {
  const random = Math.floor(Math.random() * max) // from 0 to max
  return new Promise(r => setTimeout(r, random * 1000));
}

const logMemory = () => {
  const formatMemoryUsage = (data) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`
  const memoryData = process.memoryUsage()
  console.log(`${formatMemoryUsage(memoryData.heapUsed)} -> actual memory used during the execution`)
}

module.exports = { randomSleep, logMemory}