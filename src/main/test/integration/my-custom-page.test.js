const { getDashboardUrl } = require('../helpers/url-helper');

describe('My Custom Page', () => {
    beforeAll(async () => {
        await page.goto(getDashboardUrl());
    });

    it('should render a link to custom page', async () => {
        const navigationBar = await page.$('[role="navigation"]');

        await expect(navigationBar).toMatch('My custom page');
    });
});
