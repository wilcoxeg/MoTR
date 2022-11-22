# magpie-base

Base components in Vue for magpie-powered experiments.

## Installation

First, ensure you have [Node.js](https://nodejs.org/en/) installed.

To install this package, run `npm install -g magpie-base`.

To initialize a new experiment based on magpie (after installing the package), run `magpie new experiment-name`.

For more information, please visit [the project homepage](https://magpie-ea.github.io/magpie-site/)

## Documentation
The API reference for the latest version is available at [reference.magpie-experiments.org](https://reference.magpie-experiments.org).

A guided introduction to building experiments with magpie is available at [magpie-experiments.org](https://magpie-experiments.org).

## How to update existing projects

```sh
$ cd your-project
$ npm update magpie-base
```

Read more on [maintaining npm dependencies](https://www.carlrippon.com/upgrading-npm-dependencies/).

## Core Development

### Git branching model
The `master` branch represents the latest release. Development of new features and pull requests happen on the `develop` branch.

### Release procedure
If a release should be done

1. Review changes and determine new version number according to Semantic versioning
2. Document new release in CHANGELOG.md file
3. Bump package.json:version
4. Commit and tag `vX.X.X`
5. Merge into master
6. Wait for CI to complete and pass
7. `npm publish`
8. Upgrade magpie in project repositories of this Github Organization

### Development principles
 * Components should not expose CSS classes for manipulation but instead offer customization either via unstyled slots or via props.
 * Pre-packaged screens are more of a convenience should be rather easy to replicate with normal userland code
 * Always use camelCase for measurements

### Linting
Before committing changes it is recommended to run the linter to make sure the changes adhere to the general coding style.

Run the js/vue linter using

```
npm run lint:fix
```

and the css linter using

```
npm run stylelint:fix
```

### Tests
Ideally every feature should be covered by at least one unit test. Unit tests are run on every commit and pull requests,
so we can quickly detect whenever a change breaks something.

Run the unit tests using

```
npm run test:unit
```

For implementing tests we're using [the jest framework](https://jestjs.io/docs/getting-started) in combination
with [vue test utils](https://vue-test-utils.vuejs.org/).

### Docs
In order to spin up a local web server with the docs run `npm run docs`.

In order to build the docs run `npm run docs:build`.

The contents and organization of the docs are declared in `styleguide.config.js`. Each source folder should have a `docs.md` file with a general introduction to the feature in said folder.

The online docs are automatically built from the latest commit of the master branch.

### Vue components
All Vue components must be exported in `src/components/index.js` in order to be available in downstream projects without importing them.
