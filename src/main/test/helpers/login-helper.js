const { navigateTo } = require('./puppeteer-helper');
const { getLoginUrl, getLogoutUrl } = require('./url-helper');

/**
 * @param {import("puppeteer").Page} page
 * @param {Object} options
 * @param {string} options.login
 * @param {string} options.password
 * @return {Promise<void>}
 */
async function doLogin(page, { login, password }) {
    console.debug('Login: trying to login user');

    const loginUrl = getLoginUrl();

    await navigateTo(page, loginUrl);

    console.debug('Login: loaded login page');

    const loginField = await page.$('#j_username');
    await loginField.type(login);

    const passwordField = await page.$('#j_password');
    await passwordField.type(password);

    const submitButton = await page.$('#submit');
    await submitButton.click();

    await page.waitForNavigation({
        waitUntil: 'networkidle2',
    });

    console.debug('Login: logged in user');
}

async function doLogout(page) {
    const logoutUrl = getLogoutUrl();

    await navigateTo(page, logoutUrl);
}

module.exports = {
    doLogin,
    doLogout,
};
