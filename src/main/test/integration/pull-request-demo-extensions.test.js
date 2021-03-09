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

    it('should render a new button for the "bitbucket.ui.pullrequest.overview.summary" extension point', async () => {
        // given
        const extensionLabel = 'My overview extension';

        // when
        const summaryPanel = await page.$('.summary-panel');
        await page.waitForSelector('.demo-overview-extension');
        const extensionButton = await findElementByText(summaryPanel, extensionLabel);

        // then
        expect(extensionButton).toBeTruthy();
    });

    it('should render an option item for the "bitbucket.ui.pullrequest.action" extension point', async () => {
        const extensionLabel = 'My pull request action extension';

        // when
        // Click on more actions and select
        const moreActionsButton = await page.$('[data-testid="more-actions--trigger"]');
        await moreActionsButton.click();
        await page.waitForSelector('[data-testid="more-actions--content"]');

        const moreActionsOptions = await page.$('[data-testid="more-actions--content"]');
        const option = await findElementByText(moreActionsOptions, extensionLabel);

        // then
        expect(option).toBeTruthy();
    });

    it('should render a new button item for the "bitbucket.ui.pullrequest.diff.toolbar" extension point', async () => {
        const extensionLabel = 'My diff toolbar extension';

        // when
        const diffTab = await page.$('[data-testid="tab-DIFF"]');
        await diffTab.click();
        // Wait for change toolbar to be rendered
        await page.waitForSelector('.diff-toolbar-extension');

        const diffToolbar = await page.$('.diff-toolbar-extension');
        const extensionButton = await findElementByText(diffToolbar, extensionLabel);

        // then
        expect(extensionButton).toBeTruthy();
    });
});
