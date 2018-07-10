# guld-random-cli

Cryptographically secure random number generator using `/dev/urandom` with fallback to node's `crypto` and finally to `window.crypto || window.mscrypto`.

### Example Output

### Install

```
npm i -g guld-random-cli
```

### Usage

##### CLI

```
  Usage: guld-random [options] [command]

  Cryptographically secure random number generator using `/dev/urandom` with fallback to node's `crypto` and finally to `window.crypto || window.mscrypto`.

  Options:

    -V, --version        output the version number
    -h, --help           output usage information

  Commands:

    string|str [length]  Generate a random string of the given length (default 256).
    number|num [max]     Generate a random integer between 0 and max. (default 65536)
```
