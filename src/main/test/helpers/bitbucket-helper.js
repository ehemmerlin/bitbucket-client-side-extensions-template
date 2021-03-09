const { getBaseUrl } = require('./env-helper.js');

/**
 *
 * @param page
 * @return {Promise<void>}
 */
async function disablePullRequestOnBoarding() {
    console.debug('OnBoarding: Disabling feature on-boarding...');

    const baseUrl = getBaseUrl();

    await page.evaluate(async baseUrl => {
        await fetch(`${baseUrl}/rest/chaperone/1/chaperone/7.0-pull-request`, {
            credentials: 'include',
            method: 'PUT',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            },
            body: 'json=[object Object]',
        });
    }, baseUrl);

    console.debug('OnBoarding: Feature on-boarding disabled...');
}

module.exports = {
    disablePullRequestOnBoarding,
};
