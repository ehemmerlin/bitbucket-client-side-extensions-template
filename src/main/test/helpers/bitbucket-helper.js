const { getBaseUrl } = require('./env-helper.js');

/**
 * @param {import("puppeteer").Page} page
 * @return {Promise<void>}
 */
async function disablePullRequestOnBoarding(page) {
    console.debug('[OnBoarding]: Disabling feature on-boarding...');

    const baseUrl = getBaseUrl();

    await page.evaluate(async baseUrl => {
        await fetch(`${baseUrl}/rest/chaperone/1/chaperone/7.0-pull-request`, {
            credentials: 'include',
            method: 'PUT',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            },
            body: 'the-value-doesnt-matter',
        });
    }, baseUrl);

    console.debug('[OnBoarding]: Feature on-boarding disabled...');
}

module.exports = {
    disablePullRequestOnBoarding,
};
