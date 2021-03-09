const { getBaseUrl } = require('./env-helper.js');

async function disablePullRequestOnBoarding(page) {
    console.log('OnBoarding: Disabling feature on-boarding...');

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

    console.log('OnBoarding: Feature on-boarding disabled...');
}

module.exports = {
    disablePullRequestOnBoarding,
};
