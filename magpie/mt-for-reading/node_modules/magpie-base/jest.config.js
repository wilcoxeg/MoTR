module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/tests/__mocks__/css.js"
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
}
