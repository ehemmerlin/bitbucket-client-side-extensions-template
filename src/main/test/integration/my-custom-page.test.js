const { clickOnAndWaitForPageLoad, disableAnimations } = require('../helpers/puppeteer-helper');
const { findElementByText } = require('../helpers/find-helpers');
const { getDashboardUrl } = require('../helpers/url-helper');

describe('My custom page', () => {
    const pageLabel = 'My custom page';
    const pageUrl = '/my-custom-page';

    beforeEach(async done => {
        await page.goto(getDashboardUrl());
        await disableAnimations();

        done();
    });

    it('should render a link to custom page', async () => {
        const navigationBar = await page.$('[role="navigation"]');

        await expect(navigationBar).toMatch(pageLabel);
    });

    it('should navigate to the custom page', async () => {
        const navigationBar = await page.$('[role="navigation"]');
        const navigationLink = await findElementByText(navigationBar, pageLabel);

        expect(navigationLink).toBeTruthy();

        await clickOnAndWaitForPageLoad(navigationLink);

        expect(page.url()).toMatch(pageUrl);
        const pageContent = await page.$('#content');
        await expect(pageContent).toMatch(pageLabel);
    });
});
