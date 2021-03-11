const { queries, waitFor } = require('pptr-testing-library');

const { navigateTo } = require('../helpers/puppeteer-helper');
const { disablePullRequestOnBoarding } = require('../helpers/bitbucket-helper');
const { getPullRequestUrl } = require('../helpers/url-helper');
const {
    createPullRequest,
    deletePullRequest,
    createRegularCommentOnPullRequest,
    waitForCseToBeLoaded,
} = require('../helpers/pull-request-helper');

describe('Pull Request demo extensions', () => {
    let pullRequestId;

    beforeAll(async done => {
        await disablePullRequestOnBoarding(page);
        ({ pullRequestId } = await createPullRequest(page));
        await createRegularCommentOnPullRequest(page, pullRequestId);

        done();
    });

    afterAll(async done => {
        await deletePullRequest(page, pullRequestId);

        done();
    });

    /** @type {import("puppeteer").ElementHandle} */
    let $document;

    beforeEach(async done => {
        $document = await navigateTo(page, getPullRequestUrl(pullRequestId));
        await waitForCseToBeLoaded($document);

        done();
    });

    it('should render a new button for the "bitbucket.ui.pullrequest.overview.summary" extension point', async () => {
        // given
        const extensionLabel = 'My overview extension';

        // when
        const extensionButton = await queries.getByText($document, extensionLabel);

        // then
        expect(extensionButton).toBeTruthy();
    });

    it('should render an option item for the "bitbucket.ui.pullrequest.action" extension point', async () => {
        // given
        const extensionLabel = 'My pull request action extension';

        // when
        // Click on more actions and select the extension option
        const moreActionsButton = await queries.getByTestId($document, 'more-actions--trigger');
        await moreActionsButton.click();
        await waitFor(() => queries.getByTestId($document, 'more-actions--content'));

        const moreActionsOptions = await queries.getByTestId($document, 'more-actions--content');
        const option = await queries.findByText(moreActionsOptions, extensionLabel);

        // then
        expect(option).toBeTruthy();
    });

    it('should render a new button item for the "bitbucket.ui.pullrequest.diff.toolbar" extension point', async () => {
        const extensionLabel = 'My diff toolbar extension';

        // when
        const diffTab = await queries.getByTestId($document, 'tab-DIFF');
        await diffTab.click();

        // Wait for change toolbar to be rendered
        await waitFor(() => queries.findByText($document, extensionLabel));
        const extensionButton = await queries.findByText($document, extensionLabel);

        // then
        expect(extensionButton).toBeTruthy();
    });

    it('should render a comment option item for the "bitbucket.ui.pullrequest.comment.action" extension point', async () => {
        // given
        const extensionLabel = 'My comment action extension';

        // when
        const commentOptionsButton = await queries.getByTestId(
            $document,
            'comment-options--trigger'
        );
        await commentOptionsButton.click();
        await waitFor(() => queries.getByTestId($document, 'comment-options--content'));

        const moreActionsOptions = await queries.getByTestId($document, 'comment-options--content');
        const option = await queries.findByText(moreActionsOptions, extensionLabel);

        // then
        expect(option).toBeTruthy();
    });

    it('should render a comment panel item for the "bitbucket.ui.pullrequest.comment.extra" extension point', async () => {
        // given
        const extensionLabel = 'My comment extension';

        // when
        await waitFor(() => queries.findByText($document, extensionLabel));
        const label = await queries.findByText($document, extensionLabel);

        // then
        expect(label).toBeTruthy();
    });

    it('should render a table cell item for the "bitbucket.ui.pullrequest.commits.table.column.after" extension point', async () => {
        // given
        const extensionCellHeaderLabel = 'My ext. header';
        const extensionCellLabel = 'My ext. cell';

        // when
        const commitsTab = await queries.getByTestId($document, 'tab-COMMITS');
        await commitsTab.click();

        await page.waitForSelector('.commits-table-wrapper');
        await page.waitForSelector('.demo-commits-table-extension');

        const commitsTableWrapper = await page.$('.commits-table-wrapper');
        const header = await queries.findByText(commitsTableWrapper, extensionCellHeaderLabel);
        const cell = await queries.findByText(commitsTableWrapper, extensionCellLabel);

        // then
        expect(header).toBeTruthy();
        expect(cell).toBeTruthy();
    });
});
