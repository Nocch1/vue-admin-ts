module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/vue3-strongly-recommended',
        '@vue/standard',
        '@vue/typescript/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2021
    },
    rules: {
        'semi': ['error', 'always'],
        'indent': ['error', 4],
        'vue/html-indent': ['error', 4, {
            'attribute': 1,
            'baseIndent': 1,
            'closeBracket': 0,
            'alignAttributesVertically': true
        }],
        'vue/html-closing-bracket-newline': ['error', {
            'singleline': 'never',
            'multiline': 'never'
        }],
        'quotes': [2, 'single'],
        'vue/max-attributes-per-line': 'off',
        'vue/html-quotes': [2, 'double'],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/member-delimiter-style': ['error',
            {
                multiline: {
                    delimiter: 'none'
                },
                singleline: {
                    delimiter: 'comma'
                }
            }],
        '@typescript-eslint/no-explicit-any': 'off',
        'space-before-function-paren': ['error', { 'anonymous': 'always', 'named': 'never', 'asyncArrow': 'always' }],
        'vue/array-bracket-spacing': 'error',
        'vue/arrow-spacing': 'error',
        'vue/block-spacing': 'error',
        'vue/brace-style': 'error',
        'vue/camelcase': 'error',
        'vue/comma-dangle': 'error',
        'vue/component-name-in-template-casing': 'error',
        'vue/eqeqeq': 'error',
        'vue/key-spacing': 'error',
        'vue/match-component-file-name': 'error',
        'vue/object-curly-spacing': 'error',
        'no-useless-escape': 'off',
        '@typescript-eslint/no-this-alias': [
            'error',
            {
                allowDestructuring: true, // Allow `const { props, state } = this`; false by default
                allowedNames: ['self'] // Allow `const self = this`; `[]` by default
            }
        ],
        'vue/attribute-hyphenation': 'off',
        'vue/custom-event-name-casing': 'off'
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)'
            ],
            env: {
                jest: true
            }
        }
    ]
};
