// Ideas from https://github.com/vuejs/vue-cli

const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const slash = require('slash');
const validateProjectName = require('validate-npm-package-name');
const currentVersion = require('../package.json').version;

function normalizeFilePaths(files) {
  Object.keys(files).forEach((file) => {
    const normalized = slash(file);
    if (file !== normalized) {
      files[normalized] = files[file];
      delete files[file];
    }
  });
  return files;
}

async function writeFileTree(dir, files) {
  Object.keys(files).forEach((name) => {
    const filePath = path.join(dir, name);
    fs.ensureDirSync(path.dirname(filePath));
    fs.writeFileSync(filePath, files[name]);
  });
}

function generatePackageFile(projectName, template) {
  const packageJson = require('./templates/' + template + '/package.json');
  return {
    ...packageJson,
    name: projectName,
    dependencies: {
      ...packageJson.dependencies,
      'magpie-base': '^' + currentVersion
    }
  };
}

function generateReadme(projectName) {
  return [
    `# ${projectName}\n`,
    'This is a sample experiment using magpie.\n' + '### Setup\n',
    'First, set up the project with `npm install`\n',
    'To run the project locally, run `npm run serve`\n',
    'To build the project for deployment (e.g. to Netlify), run `npm run build`\n',
    'If you are hosting this repository on github, the project will automatically be built and deployed to the gh-pages branch, so you only have to enable Github Pages in your repository settings to publish your project.\n',
    'For more information, see the [manual](https://magpie-experiments.org/).\n' +
      '### Coding style\n',
    'To automatically fix coding style and format the code (linting) run `npm run lint` and `npm run lint:style`\n',
    '## How to update magpie\n' +
      '\n' +
      '```sh\n' +
      '$ cd your-project\n' +
      '$ npm update magpie-base\n' +
      '```\n' +
      '\n' +
      'Read more on [maintaining npm dependencies](https://www.carlrippon.com/upgrading-npm-dependencies/).',
    '\n'
  ].join('\n');
}

async function create(projectName, template) {
  const validationResult = validateProjectName(projectName);
  if (!validationResult.validForNewPackages) {
    console.error(
      chalk.red(
        `Sorry, the project name ${projectName} is invalid. Please use -, numbers and alphabets only.`
      )
    );

    validationResult.errors &&
      validationResult.errors.forEach((err) => {
        console.error(chalk.red.dim('Error: ' + err));
      });
    validationResult.warnings &&
      validationResult.warnings.forEach((warn) => {
        console.error(chalk.red.dim('Warning: ' + warn));
      });
    process.exit(1);
  }

  const cwd = process.cwd();
  const targetDir = path.resolve(cwd, projectName || '.');

  if (fs.existsSync(targetDir)) {
    console.error(
      chalk.red(
        `Target directory ${targetDir} already exists. Please choose another name.`
      )
    );
    process.exit(1);
  }

  console.log(`Creating project in ${targetDir}`);

  const files = {
    'package.json': JSON.stringify(
      generatePackageFile(projectName, template),
      null,
      2
    ),
    'README.md': generateReadme(projectName)
  };

  const sourceDir = path.join(`${__dirname}`, 'templates', template);

  fs.copySync(sourceDir, targetDir);

  normalizeFilePaths(files);

  await writeFileTree(targetDir, files);

  console.log(
    `Successfully created project ${chalk.yellow(
      projectName
    )}.\nGet started with the following commands:\n\n` +
      chalk.cyan(`cd ${projectName} && npm install && npm run serve\n`) +
      `\nPlease see README.md for more information.`
  );
}

module.exports = (...args) => {
  return create(...args).catch((err) => {
    console.error(err);
    process.exit(1);
  });
};
