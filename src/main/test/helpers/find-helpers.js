/**
 * @param {import("puppeteer").ElementHandle} element
 * @return {Promise<string>}
 */
async function getElementText(element) {
    const textContentProperty = await element.getProperty('textContent');

    return textContentProperty.jsonValue();
}

/**
 * @param {import("puppeteer").ElementHandle} element
 * @return {Promise<string>}
 */
async function getElementSelfText(element) {
    return element.evaluate(node =>
        Array.from(node.childNodes)
            .filter(el => el.nodeType === Node.TEXT_NODE)
            .map(el => el.textContent)
            .join('')
    );
}

/**
 * @param {import("puppeteer").ElementHandle} elements
 * @param {string} text
 * @return {Promise<import("puppeteer").ElementHandle|null>}
 */
async function findElementByText(element, text) {
    const children = /** @type {import("puppeteer").ElementHandle[]} */ await element.$$('*');

    const texts = /** @type {string[]} */ await Promise.all(
        children.map(child => getElementSelfText(child))
    );
    const index = texts.findIndex(elementText => elementText.trim() === text.trim());

    return index !== -1 ? children[index] : null;
}

module.exports = {
    getElementText,
    findElementByText,
};
