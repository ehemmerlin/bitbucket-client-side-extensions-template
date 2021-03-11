const { queries } = require('pptr-testing-library');

const { clickOnAndWaitForPageLoad, navigateTo } = require('../helpers/puppeteer-helper');
const { getDashboardUrl } = require('../helpers/url-helper');

describe('My custom page', () => {
    const pageLabel = 'My custom page';
    const pageUrl = '/my-custom-page';

    /** @type {import("puppeteer").ElementHandle} */
    let $document;

    beforeEach(async done => {
        $document = await navigateTo(page, getDashboardUrl());

        done();
    });

    it('should render a link to custom page', async () => {
        const navigationBar = await queries.getByRole($document, 'navigation');

        await expect(navigationBar).toMatch(pageLabel);
    });

    it('should navigate to the custom page', async () => {
        const navigationBar = await queries.getByRole($document, 'navigation');
        const navigationLink = await queries.getByText(navigationBar, pageLabel);

        expect(navigationLink).toBeTruthy();

        await clickOnAndWaitForPageLoad(page, navigationLink);

        expect(page.url()).toMatch(pageUrl);
        const pageContent = await page.$('#content');
        await expect(pageContent).toMatch(pageLabel);
    });
});
