module.exports = {
    env: {
        node: true,
        jest: true,
    },
    globals: {
        page: true
    },
    rules: {
        'import/extensions': ['error', 'ignorePackages'],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
};
