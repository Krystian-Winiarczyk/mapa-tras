const path = require('path')

module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/recommended'],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'extends': 'off',

        semi: [2, 'never'],
        'max-len': 'off',
        'linebreak-style': 'off',
        camelcase: 'off',
        'prefer-template': 'off',
        'no-useless-concat': 'error',
        'no-param-reassign': ['error', { props: false }],
        radix: ['error', 'as-needed'],
        'arrow-parens': ['error', 'as-needed'],
        'vue/multi-word-component-names': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'comma-dangle': ['error', {
            arrays: 'never',
            objects: 'never',
            imports: 'never',
            exports: 'never',
            functions: 'never'
        }]
    },
    settings: {
        'import/resolver': {
            // 'alias': [{
            //     map: [
            //         ['@themeConfig', path.resolve(__dirname, 'themeConfig.js')],
            //         ['@core', './src/@core'],
            //         ['@validations', path.resolve(__dirname, 'src/@core/utils/validations/validations.js')],
            //         ['@axios', path.resolve(__dirname, 'src/libs/axios')],
            //         ['@helpers', path.resolve(__dirname, 'src/helpers')]
            //     ],
            //     extensions: ['.ts', '.js', '.jsx', '.json', '.scss']
            // }],
            webpack: {
                config: path.resolve('./vue.config.js')
            }
        }
    }
}
