import { streamReadAll, streamReadText } from 'stream-read-all'
import fs from 'node:fs'
import { PassThrough } from 'node:stream'
import { strict as a } from 'assert'

const [test, only, skip] = [new Map(), new Map(), new Map()]

test.set('buffer mode', async function () {
  const stream = fs.createReadStream('./package.json')
  const result = await streamReadAll(stream)
  a.equal(result.constructor.name, 'Buffer')
  a.ok(JSON.parse(result))
})

test.set('object mode', async function () {
  const stream = new PassThrough({ objectMode: true })
  process.nextTick(() => {
    stream.write({})
    stream.end({})
  })
  const result = await streamReadAll(stream, { objectMode: true })
  a.strictEqual(result.length, 2)
})

test.set('text', async function () {
  const stream = fs.createReadStream('./package.json')
  const result = await streamReadText(stream)
  a.equal(typeof result, 'string')
  a.ok(/author/.test(result))
})

export { test, only, skip }
