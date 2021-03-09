module.exports = {
    env: {
        jest: true,
    },
    rules: {
        'import/extensions': ['error', 'ignorePackages'],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
};
