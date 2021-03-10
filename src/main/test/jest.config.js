module.exports = {
    preset: 'jest-puppeteer',
    testEnvironment: '<rootDir>/bitbucket-jest-puppeteer-environment.js',
    setupFilesAfterEnv: [
        'expect-puppeteer',
        '<rootDir>/jest-setup.js',
        '<rootDir>/jest-take-screenshot.js',
    ],
    reporters: [
        'default',
        [
            'jest-junit',
            {
                // https://support.atlassian.com/bitbucket-cloud/docs/test-reporting-in-pipelines/
                outputDirectory: './test-reports/',
                outputName: 'jest-integration-tests-report.xml',
            },
        ],
    ],
};
