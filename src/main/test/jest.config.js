module.exports = {
    preset: 'jest-puppeteer',
    testEnvironment: '<rootDir>/bitbucket-jest-puppeteer-environment.js',
    setupFilesAfterEnv: [
        'expect-puppeteer',
        '<rootDir>/jest-setup.js',
        '<rootDir>/jest-take-screenshot.js',
    ],
};
