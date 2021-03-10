/**
 * @param {import("puppeteer").Page} page
 * @param {import("puppeteer").ElementHandle} element
 * @return {Promise<void>}
 */
async function clickOnAndWaitForPageLoad(page, element) {
    await element.focus();

    await Promise.all([page.waitForNavigation(), element.click()]);
}

/**
 * @param {import("puppeteer").Page} page
 * @return {Promise<void>}
 */
async function disableAnimations(page) {
    await page.addStyleTag({
        content: `
            *,
            *::after,
            *::before {
                transition: none !important;
                transition-delay: 0s !important;
                transition-duration: 0s !important;
                animation: none !important;
                animation-delay: -0.0001s !important;
                animation-duration: 0s !important;
                animation-play-state: paused !important;
                caret-color: transparent !important;
            }`,
    });

    console.debug('[CSS]: animations and transitions are disabled');
}

/**
 * @param {import("puppeteer").ElementHandle} element
 * @return {Promise<string>}
 */
async function debugElement(element) {
    return element.evaluate(node => node.outerHTML);
}

/**
 * @param {import("puppeteer").Page} page
 * @param {string} url
 * @return {Promise<void>}
 */
async function navigateTo(page, url) {
    console.debug(`[Navigation] navigating to "${url}"`);

    await page.goto(url);
    await disableAnimations(page);
}

module.exports = {
    clickOnAndWaitForPageLoad,
    disableAnimations,
    debugElement,
    navigateTo,
};
