#!/usr/bin/env node

const { program, Option } = require('commander');
const currentVersion = require('../package.json').version;
program.version(currentVersion).usage('<command> [options]');

program
  .command('new <name>')
  .description(
    'create a new project based on magpie, initialized with a sample experiment setup'
  )
    .addOption(new Option('-t, --template <template>', 'The project template to use').choices(['minimal', 'showroom']).default('minimal'))
  .action((name, options) => {
    require('../lib/create')(name, options.template);
  });

program.parse(process.argv);
