const path = require('path');
const { version } = require('./package.json')

module.exports = {
  // set your styleguidist configuration here
  title: 'Magpie reference ('+version+')',
  require: [path.join(__dirname, 'styleguidist/global.requires.js')],
  // components: 'src/components/**/[A-Z]*.vue',
  // defaultExample: true,
  sections: [
    {
      name: 'Magpie',
      content: 'src/docs.md'
    },
    {
      name: 'Base Components',
      components: 'src/components/*.vue'
    },
    {
      name: 'Screens',
      content: 'src/components/screens/docs.md',
      components: 'src/components/screens/*.vue'
    },
    {
      name: 'Stimuli',
      content: 'src/components/stimuli/docs.md',
      components: 'src/components/stimuli/*.vue'
    },
    {
      name: 'Trial Screens',
      content: 'src/components/trial_screens/docs.md',
      components: 'src/components/trial_screens/*.vue'
    },
    {
      name: 'Inputs',
      content: 'src/components/inputs/docs.md',
      components: 'src/components/inputs/*.vue'
    },
    {
      name: 'Interactive',
      content: 'src/components/interactive/docs.md',
      components: 'src/components/interactive/*.vue'
    },
    {
      name: 'Helpers',
      components: 'src/components/helpers/*.vue'
    },
    {
      name: 'API',
      content: 'src/API.md'
    },
  ],
  webpackConfig: {
    optimization: {
      splitChunks: {
        // include all types of chunks
        chunks: 'all',
        maxSize: 500000
      },
    },
  },
  exampleMode: 'expand',
  usageMode: 'expand'
};
