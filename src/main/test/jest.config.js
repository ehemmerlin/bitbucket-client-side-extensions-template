module.exports = {
    preset: 'jest-puppeteer',
    testEnvironment: '<rootDir>/bitbucket-jest-puppeteer-environment.js',
    setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
};
