const path = require('path');

module.exports = {
    env: {
        es6: true,
        node: true
    },
    plugins: ['ghost'],
    extends: [
        'plugin:ghost/node'
    ],
    rules: {
        // @TODO: remove this rule once it's turned into "error" in the base plugin
        'no-shadow': 'error',
        'no-console': 'warn',
        'no-var': 'error',
        'one-var': ['error', 'never']
    },
    overrides: [
        {
            files: 'frontend/**',
            rules: {
                'ghost/node/no-restricted-require': ['off', [
                    // If we make the frontend entirely independent, these have to be solved too
                    // {
                    //     name: path.resolve(__dirname, 'core/shared/**'),
                    //     message: 'Invalid require of core/shared from core/frontend.'
                    // },
                    // These are critical refactoring issues that we need to tackle ASAP
                    {
                        name: [path.resolve(__dirname, 'core/server/**')],
                        message: 'Invalid require of core/server from core/frontend.'
                    }
                ]]
            }
        },
        {
            files: 'server/**',
            rules: {
                'ghost/node/no-restricted-require': ['warn', [
                    {
                        // Throw an error for all requires of the frontend, _except_ the url service which will be moved soon
                        name: [path.resolve(__dirname, 'core/frontend/**')],
                        message: 'Invalid require of core/frontend from core/server.'
                    }
                ]]
            }
        }
    ]
};
