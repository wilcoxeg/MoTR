module.exports = {
  customSyntax: 'postcss-html',
  extends: 'stylelint-config-recommended-vue',
  rules: {
    indentation: 2,
    'selector-type-no-unknown': null,
    'number-leading-zero': null,
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'inside-block']
      }
    ],
    'declaration-empty-line-before': [
      'never',
      {
        ignore: ['after-declaration']
      }
    ],
    'no-empty-source': null,
    'comment-empty-line-before': null,
    'selector-type-case': null,
    'selector-list-comma-newline-after': null,
    'no-descending-specificity': null,
    'string-quotes': 'single',
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ]
  }
};
