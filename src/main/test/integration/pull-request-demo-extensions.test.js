const { disableAnimations } = require('../helpers/puppeteer-helper');
const { findElementByText } = require('../helpers/find-helpers');
const { disablePullRequestOnBoarding } = require('../helpers/bitbucket-helper');
const { getPullRequestUrl } = require('../helpers/url-helper');
const { createPullRequest, deletePullRequest } = require('../helpers/pull-request-helper');

describe('Pull Request demo extensions', () => {
    let pullRequestId;

    beforeAll(async done => {
        await disablePullRequestOnBoarding();
        ({ pullRequestId } = await createPullRequest());

        done();
    });

    afterAll(async done => {
        await deletePullRequest(pullRequestId);

        done();
    });

    beforeEach(async done => {
        await page.goto(getPullRequestUrl(pullRequestId));
        await disableAnimations();
        done();
    });

    it('should render extension for "bitbucket.ui.pullrequest.overview.summary" extension point', async () => {
        const summaryPanel = await page.$('.summary-panel');
        await page.waitForSelector('.demo-overview-extension');
        const demoExtension = await findElementByText(summaryPanel, 'My overview extension');

        expect(demoExtension).toBeTruthy();
    });

    it.skip('should navigate to the custom page', async () => {});
});
