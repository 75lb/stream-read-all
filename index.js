/**
 */
async function streamReadAll (stream) {
  if (!(stream && stream.pipe)) {
    throw new Error('Please supply a Readable stream as input')
  }
  return new Promise((resolve, reject) => {
    const chunks = []
    stream.on('data', chunk => {
      chunks.push(chunk)
    })

    /* End not guaranteed to emit, resolve on close */
    stream.on('close', () => {
      if (stream.readableObjectMode) {
        resolve(chunks)
      } else {
        /* If any encoding is set, the chunks received will be strings. https://nodejs.org/docs/latest/api/stream.html#readablesetencodingencoding */
        if (stream.readableEncoding) {
          resolve(chunks.join(''))
        } else {
          resolve(Buffer.concat(chunks))
        }
      }
    })
    stream.on('error', err => {
      reject(err)
    })
  })
}

async function streamReadText (stream, encoding = 'utf8') {
  const result = await streamReadAll(stream)
  if (stream.readableObjectMode) {
    return result.join('').toString(encoding)
  } else {
    return result.toString(encoding)
  }
}

export { streamReadAll, streamReadText }
