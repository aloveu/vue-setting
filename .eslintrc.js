module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/vue3-essential', '@vue/airbnb', '@vue/typescript/recommended'],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        'no-console': 'off',
        indent: 'off',
        'comma-dangle': 'off',
        'vue/multi-word-component-names': 'off',
        'object-curly-spacing': 'error',
        'object-curly-newline': 'off',
        'operator-linebreak': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'error',
        'arrow-parens': 'off',
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'import/extensions': 'off',
        'class-methods-use-this': 0,
        'function-paren-newline': 'error',
        'func-call-spacing': 'off',
        'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
        'max-len': ['error', 200],
        'no-empty-function': 'off',
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'no-unused-vars': 'off',
        'no-useless-constructor': 'off',
        'no-param-reassign': 'off',
        'no-shadow': 'off',
        'no-useless-escape': 'off',
        'no-use-before-define': ['error', { variables: true, functions: false, classes: false }],
        'space-before-blocks': 'error',
        'space-before-function-paren': 'off',
        'comma-style': 'error',
        'dot-notation': 'off',
        'no-void': 'off',
        semi: 'error',
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        yoda: 'off',
        'prefer-destructuring': ['error', { object: false, array: false }],
        'no-continue': 'off',
        'no-underscore-dangle': 'off',
        'no-extra-boolean-cast': 'off',
        'arrow-body-style': 'off',
        'no-restricted-globals': 'off',
        'new-cap': 'off',
        'no-restricted-properties': 'off',
        '@angular-eslint/no-input-rename': 'off',
        'consistent-return': 'off',
        'no-bitwise': 'off',
        'global-require': 'off',
        'vuejs-accessibility/label-has-for': 'off',
        'vuejs-accessibility/form-control-has-label': 'off',
        'vuejs-accessibility/click-events-have-key-events': 'off',
    },
};
