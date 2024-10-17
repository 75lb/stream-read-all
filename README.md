[![view on npm](https://badgen.net/npm/v/stream-read-all)](https://www.npmjs.org/package/stream-read-all)
[![npm module downloads](https://badgen.net/npm/dt/stream-read-all)](https://www.npmjs.org/package/stream-read-all)
[![Gihub repo dependents](https://badgen.net/github/dependents-repo/75lb/stream-read-all)](https://github.com/75lb/stream-read-all/network/dependents?dependent_type=REPOSITORY)
[![Gihub package dependents](https://badgen.net/github/dependents-pkg/75lb/stream-read-all)](https://github.com/75lb/stream-read-all/network/dependents?dependent_type=PACKAGE)
[![Node.js CI](https://github.com/75lb/stream-read-all/actions/workflows/node.js.yml/badge.svg)](https://github.com/75lb/stream-read-all/actions/workflows/node.js.yml)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# stream-read-all

Returns a promise which fulfils with the supplied stream's content. Supports any [Readable](https://nodejs.org/docs/latest/api/stream.html#readable-streams) stream as input in either regular or [object mode](https://nodejs.org/docs/latest/api/stream.html#object-mode).

For example, this script...

```js
import { streamReadAll } from 'stream-read-all'
const readable = await streamReadAll(process.stdin)
console.log(readable.toString())
```

...prints this output.

```
$ echo Hello | node example.js
Hello
```

The above `streamReadAll` function returns either a `Buffer` in regular mode or an array of objects in object mode. Alternatively, you can use `streamReadText` which is identical to the above except it guarantees text back. The second argument is optional, specifying the character encoding to use (as in the [buffer.toString()](https://nodejs.org/docs/latest/api/buffer.html#buftostringencoding-start-end) first argument)

```js
import { streamReadText } from 'stream-read-all'
const readable = fs.createReadStream('./package.json')
const text = await streamReadText(readable, 'hex')
console.log(text)
// prints the package.json file content in hex format
```

* * *

&copy; 2017-25 Lloyd Brookes <opensource@75lb.com>.
