const fs = require('fs')
const _ = require('lodash')
const adjectives = require('../corpus/adjectives')
const animals = require('../corpus/animals')

const readmeTemplateFile = fs.readFileSync('README-template.md', 'utf-8')
const readme = _.template(readmeTemplateFile)({ adjectives, animals })
fs.writeFileSync('README.md', readme)
