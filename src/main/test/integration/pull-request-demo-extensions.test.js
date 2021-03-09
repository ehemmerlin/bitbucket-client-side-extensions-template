const { disableAnimations } = require('../helpers/puppeteer-helper');
const { findElementByText } = require('../helpers/find-helpers');
const { disablePullRequestOnBoarding } = require('../helpers/bitbucket-helper');
const { getPullRequestUrl } = require('../helpers/url-helper');
const {
    createPullRequest,
    deletePullRequest,
    createRegularCommentOnPullRequest,
} = require('../helpers/pull-request-helper');

describe('Pull Request demo extensions', () => {
    let pullRequestId;

    beforeAll(async done => {
        await disablePullRequestOnBoarding();
        ({ pullRequestId } = await createPullRequest());
        await createRegularCommentOnPullRequest(pullRequestId);

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
        // given
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

    it('should render a comment option item for the "bitbucket.ui.pullrequest.comment.action" extension point', async () => {
        // given
        const extensionLabel = 'My comment action extension';

        // when
        // Click on more actions and select
        const commentOptionsButton = await page.$('[data-testid="comment-options--trigger"]');
        await commentOptionsButton.click();
        await page.waitForSelector('[data-testid="comment-options--content"]');

        const commentOptions = await page.$('[data-testid="comment-options--content"]');
        const option = await findElementByText(commentOptions, extensionLabel);

        // then
        expect(option).toBeTruthy();
    });

    it('should render a comment panel item for the "bitbucket.ui.pullrequest.comment.extra" extension point', async () => {
        // given
        const extensionLabel = 'My comment extension';

        // when
        // Wait for the comment to render
        await page.waitForSelector('.comments-extension-panel-wrapper');
        const commentExtensions = await page.$$('.comments-extension-panel-wrapper');

        const label = await findElementByText(commentExtensions, extensionLabel);

        // then
        expect(label).toBeTruthy();
    });

    it('should render a table cell item for the "bitbucket.ui.pullrequest.commits.table.column.after" extension point', async () => {
        // given
        const extensionCellHeaderLabel = 'My ext. header';
        const extensionCellLabel = 'My ext. cell';

        // when
        const commitsTab = await page.$('[data-testid="tab-COMMITS"]');
        await commitsTab.click();
        await page.waitForSelector('.commits-table-wrapper');
        const commitsTableWrapper = await page.$$('.commits-table-wrapper');

        await page.waitForSelector('.commits-table-wrapper');
        await page.waitForSelector('.demo-commits-table-extension');

        const header = await findElementByText(commitsTableWrapper, extensionCellHeaderLabel);
        const cell = await findElementByText(commitsTableWrapper, extensionCellLabel);

        // then
        expect(header).toBeTruthy();
        expect(cell).toBeTruthy();
    });
});
