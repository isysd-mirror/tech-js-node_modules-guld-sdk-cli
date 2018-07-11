#!/usr/bin/env node
const program = require('commander')
const VERSION = require('./package.json').version
// const { spawn } = require('child_process')
const { getFS } = require('guld-fs')
const { getName, getAlias } = require('guld-user')
const { pathEscape } = require('guld-git-path')
var fs
var user

/* eslint-disable no-console */
program
  .name('guld-sdk')
  .version(VERSION)
  .description('Software developer kit for guld apps.')
  .command('package [location]')
  .alias('pkg')
  .description('Initialize or patch a nodejs package.json file.')
  .action(async (location, options) => {
    if (location) process.chdir(location)
    fs = fs || await getFS()
    user = user || await getName()
    var ghname = await getAlias(user, 'github')
    var slug = pathEscape()
    var dname = slug.replace('tech-js-node_modules-', '')
    var remote = `git@github.com:${ghname}/${slug}.git`
    var pkg = JSON.parse(await fs.readFile('package.json', 'utf-8'))
    pkg.name = dname
    pkg.readme = 'README.md'
    pkg.license = pkg.license || 'MIT'
    pkg.author = pkg.author || user
    pkg.homepage = pkg.homepage || `https://github.com/${ghname}/${slug}#readme`
    pkg.keywords = pkg.keywords || ['guld']
    if (pkg.keywords.indexOf('guld') === -1) pkg.keywords.push('guld')
    if (pkg.keywords) {
      if (dname.match(/.*-cli$/)) {
        pkg.preferGlobal = true
        delete pkg.main
        delete pkg.browser
        if (pkg.keywords.indexOf('cli') === -1) pkg.keywords.push('cli')
        fs.stat('./cli.js').then(stats => {
          pkg.bin = {}
          pkg.bin[dname.replace('-cli', '')] = './cli.js'
        }).catch()
      }
    }
    pkg.repository = pkg.repository || remote
    await fs.writeFile('package.json', JSON.stringify(pkg, null, 2))
  })
/*
program
  .command('version [type]')
  .alias('ver')
  .description('Increment version and publish a js package to npmjs.com.')
  .action(async (type = 'patch', options) => {
    fs = fs || await getFS()
    user = user || await getName()
    var ghname = await getAlias(user, 'github')
    var slug = pathEscape()
    var dname = slug.replace('tech-js-node_modules-', '')
    var remote = `git@github.com:${ghname}/${slug}.git`
    var pkg = JSON.parse(await fs.readFile('package.json', 'utf-8'))
    pkg.name = dname
    pkg.readme = 'README.md'
    pkg.license = pkg.license || 'MIT'
    pkg.author = pkg.author || user
    pkg.homepage = pkg.homepage || `https://github.com/${ghname}/${slug}#readme`
    pkg.keywords = pkg.keywords || ['guld']
    if (pkg.keywords.indexOf('guld') === -1) pkg.keywords.push('guld')
    if (pkg.keywords)
    if (dname.match(/.*-cli$/)) {
      pkg.preferGlobal = true
      delete pkg.main
      delete pkg.browser
      if (pkg.keywords.indexOf('cli') === -1) pkg.keywords.push('cli')
      var stats = fs.stat('./cli.js').then(stats => {
        pkg.bin = {}
        pkg.bin[dname.replace('-cli', '')] = './cli.js'
      }).catch()
    }
    pkg.repository = pkg.repository || remote
    await fs.writeFile('package.json', JSON.stringify(pkg, null, 2))
  })
*/

/* eslint-enable no-console */

program.parse(process.argv)
