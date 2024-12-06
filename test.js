import { streamReadAll, streamReadText } from 'stream-read-all'
import fs from 'fs'
import { PassThrough, Readable } from 'stream'
import { strict as a } from 'assert'

const [test, only, skip] = [new Map(), new Map(), new Map()]

test.set('streamReadAll: buffer mode', async function () {
  const stream = fs.createReadStream('./package.json')
  const result = await streamReadAll(stream)
  a.equal(result.constructor.name, 'Buffer')
  a.ok(JSON.parse(result))
})

test.set('streamReadAll: setEncoding on the input stream', async function () {
  const stream = fs.createReadStream('./package.json')
  stream.setEncoding('utf8')
  const result = await streamReadAll(stream)
  a.equal(result.constructor.name, 'String')
  a.ok(JSON.parse(result))
})

test.set('streamReadAll: object mode', async function () {
  const stream = new PassThrough({ objectMode: true })
  process.nextTick(() => {
    stream.write({ one: 1 })
    stream.end({ two: 2 })
  })
  const result = await streamReadAll(stream)
  a.deepEqual(result, [{ one: 1 }, { two: 2 }])
})

test.set('streamReadAll: ObjectMode text input', async function () {
  const stream = Readable.from(['input ', 'text']) // two chunks
  const result = await streamReadAll(stream)
  a.deepEqual(result, [ 'input ', 'text' ])
})

test.set('streamReadText: buffer input', async function () {
  const stream = fs.createReadStream('./package.json')
  const result = await streamReadText(stream)
  a.equal(typeof result, 'string')
  a.ok(/author/.test(result))
})

test.set('streamReadText: text input', async function () {
  const stream = fs.createReadStream('./package.json')
  stream.setEncoding('utf8')
  const result = await streamReadText(stream)
  a.equal(typeof result, 'string')
  a.ok(/author/.test(result))
})

test.set('streamReadText: ObjectMode text input', async function () {
  const stream = Readable.from(['input ', 'text']) // two chunks
  const result = await streamReadText(stream)
  a.equal(result, 'input text')
})

export { test, only, skip }
