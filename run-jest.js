/* eslint-env node */
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const { argv } = yargs(hideBin(process.argv));

const DEFAULT_BASE_URL = 'http://localhost:7990/bitbucket';

const DEFAULT_LOGIN = 'admin';
const DEFAULT_PASSWORD = 'admin';

const DEFAULT_PROJECT = 'PROJECT_1';
const DEFAULT_REPOSITORY = 'rep_1';

const DEFAULT_TIMEOUT = 60 * 1000; // 1 minute

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 800;

const config = {
    userLogin: argv.login || DEFAULT_LOGIN,
    userPassword: argv.password || DEFAULT_PASSWORD,
    baseUrl: argv.baseUrl || DEFAULT_BASE_URL,
    project: argv.project || DEFAULT_PROJECT,
    repository: argv.repository || DEFAULT_REPOSITORY,
    debug: Boolean(argv.debug) || false,
    slowMo: argv.slowMo || 0,
    timeout: 'timeout' in argv ? parseInt(argv.timeout, 10) : DEFAULT_TIMEOUT,
    width: 'width' in argv ? parseInt(argv.width, 10) : DEFAULT_WIDTH,
    height: 'height' in argv ? parseInt(argv.height, 10) : DEFAULT_HEIGHT,
};

// Store custom args so we can read them later inside Jest
// eslint-disable-next-line no-underscore-dangle
process.env.__CONFIG__ = JSON.stringify(config);

// Remove all of the custom args
[...Object.keys(config), '_', '$0'].forEach(key => {
    delete argv[key];
});

// Create new list of ars for Jest
process.argv = [
    // Use first two argv that are: node interpreter and current file path
    ...process.argv.slice(0, 2),

    // Push the rest of the passed args to Jest
    ...Object.entries(argv).flatMap(([key, value]) => {
        if (typeof value === 'boolean') {
            return [`--${key}`];
        }

        return [`--${key}`, value];
    }),
];

// Call jest
require('jest/bin/jest.js');
