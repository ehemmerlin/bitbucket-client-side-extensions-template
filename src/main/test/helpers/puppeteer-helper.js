/**
 * @param {import("puppeteer").ElementHandle} element
 * @return {Promise<void>}
 */
async function clickOnAndWaitForPageLoad(element) {
    await element.focus();

    await Promise.all([page.waitForNavigation(), element.click()]);
}

async function disableAnimations() {
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

    console.debug('CSS animations and transitions disabled');
}

/**
 * @param {import("puppeteer").ElementHandle} element
 * @return {Promise<string>}
 */
async function debugElement(element) {
    return element.evaluate(node => node.outerHTML);
}

module.exports = {
    clickOnAndWaitForPageLoad,
    disableAnimations,
    debugElement,
};
