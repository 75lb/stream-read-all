import TestRunner from 'test-runner'
import { strict as a } from 'assert'
import streamReadAll from 'stream-read-all'
import fs from 'node:fs'
import { PassThrough } from 'node:stream'

const tom = new TestRunner.Tom()

tom.test('buffer mode', async function () {
  const stream = fs.createReadStream('./package.json')
  const result = await streamReadAll(stream)
  a.ok(JSON.parse(result))
})

tom.test('object mode', async function () {
  const stream = new PassThrough({ objectMode: true })
  process.nextTick(() => {
    stream.write({})
    stream.end({})
  })
  const result = await streamReadAll(stream, { objectMode: true })
    a.strictEqual(result.length, 2)
})

export default tom


