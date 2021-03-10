/* Source: https://github.com/smooth-code/jest-puppeteer/issues/131#issuecomment-445028965 */
const path = require('path');
const mkdirp = require('mkdirp');

const ROOT_DIR = path.resolve(__dirname, './../../../');
const screenshotsPath = path.resolve(ROOT_DIR, 'screenshots');

const toFilename = s => s.replace(/[^a-z0-9.-]+/gi, '_');

export async function takeScreenshot(testName, pageInstance = page) {
    console.debug('Screenshot: Creating a screenshot after a test failure...');

    mkdirp.sync(screenshotsPath);
    const filePath = path.join(
        screenshotsPath,
        toFilename(`${new Date().toISOString()}_${testName}.png`)
    );

    await pageInstance.screenshot({
        path: filePath,
    });

    console.debug(`Screenshot: Screenshot saved ${filePath}`);
}

/**
 * jasmine reporter does not support async.
 * So we store the screenshot promise and wait for it before each test
 */
let screenshotPromise = Promise.resolve();
beforeEach(() => screenshotPromise);
afterAll(() => screenshotPromise);

/**
 * Take a screenshot on Failed test.
 * Jest standard reporters run in a separate process so they don't have
 * access to the page instance. Using jasmine reporter allows us to
 * have access to the test result, test name and page instance at the same time.
 */
jasmine.getEnv().addReporter({
    specDone: async result => {
        if (result.status === 'failed') {
            screenshotPromise = screenshotPromise
                .catch()
                .then(() => takeScreenshot(result.fullName));
        }
    },
});
