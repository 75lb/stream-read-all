const TestRunner = require('test-runner')
const a = require('assert')
const streamReadAll = require('../')
const fs = require('fs')

const runner = new TestRunner()

runner.test('buffer mode', async function () {
  const stream = fs.createReadStream('./package.json')
  const result = await streamReadAll(stream)
  a.ok(JSON.parse(result))
})

runner.test('object mode', async function () {
  const PassThrough = require('stream').PassThrough
  const stream = new PassThrough({ objectMode: true })
  process.nextTick(() => {
    stream.write({})
    stream.end({})
  })
  const result = await streamReadAll(stream, { objectMode: true })
  a.strictEqual(result.length, 2)
})
