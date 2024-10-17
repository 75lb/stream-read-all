/**
 * [options.objectMode]{boolean}
 */
async function streamReadAll (stream, options = {}) {
  if (!(stream && stream.pipe)) {
    throw new Error('Please supply a Readable stream as input')
  }
  return new Promise((resolve, reject) => {
    const buf = []
    stream.on('data', chunk => {
      buf.push(chunk)
    })

    /* End not guaranteed to emit, resolve on close */
    stream.on('close', () => {
      if (options.objectMode) {
        resolve(buf)
      } else {
        resolve(Buffer.concat(buf))
      }
    })
    stream.on('error', err => {
      reject(err)
    })
  })
}

async function streamReadText (stream, encoding = 'utf8') {
  const result = await streamReadAll(stream)
  return result.toString(encoding)
}

export { streamReadAll, streamReadText }
