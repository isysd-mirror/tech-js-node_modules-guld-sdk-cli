#!/usr/bin/env node
const program = require('commander')
const { getRandStr, getRandInt } = require('guld-random')
const VERSION = require('./package.json').version
const { spawn } = require('child_process')

/* eslint-disable no-console */
async function maybeRun (cmd, args = [], chance = 50) {
  var rint = await getRandInt(99) + 1
  if (rint < chance) return spawn(cmd, args, { stdio: 'inherit' })
}

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
program
  .command('run <cmd> [args...]')
  .description('Randomly choose whether to run command with args.')
  .option('-c --chance <percent>', 'The percent chance of running the command.', 50)
  .action(async (cmd, args, options) => {
    maybeRun(cmd, args, options.chance)
  })
/* eslint-enable no-console */

program.parse(process.argv)
