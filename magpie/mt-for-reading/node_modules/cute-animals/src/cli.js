#!/usr/bin/env node
const animal = require('./index')
const args = process.argv.slice(2)
const usage = `
Usage:

  $ cute-animals adj adj animal
  elated sincere sloth
`

if (args.length === 0) {
  console.log(usage)
  process.exit(0)
}

const output = animal(args.join(' '))
console.log(output)
