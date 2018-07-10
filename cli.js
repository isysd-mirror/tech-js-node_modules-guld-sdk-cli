#!/usr/bin/env node
const program = require('commander')
const { getRandStr, getRandInt } = require('guld-random')
const VERSION = require('./package.json').version

/* eslint-disable no-console */
program
  .name('guld-random')
  .version(VERSION)
  .description("Cryptographically secure random number generator using `/dev/urandom` with fallback to node's `crypto` and finally to `window.crypto || window.mscrypto`.")
  .command('string [length]')
  .alias('str')
  .description('Generate a random string of the given length (default 256).')
  .action((length, options) => {
    if (length !== undefined) length = Number(length)
    getRandStr(length).then(console.log)
  })
program
  .command('number [max]')
  .alias('num')
  .description('Generate a random integer between 0 and max. (default 255)')
  .action(async (maxm, options) => {
    if (maxm !== undefined) maxm = Number(maxm)
    getRandInt(maxm).then(console.log)
  })
/* eslint-enable no-console */

program.parse(process.argv)
