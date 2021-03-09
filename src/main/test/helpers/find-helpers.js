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
 * @param {import("puppeteer").ElementHandle|import("puppeteer").Page} element
 * @param {string} text
 * @param {string} [elementType]
 * @return {Promise<import("puppeteer").ElementHandle|null>}
 */
async function findElementByText(element, text, elementType) {
    const selector = elementType ? `${elementType}, ${elementType} *` : '*';
    const children = /** @type {import("puppeteer").ElementHandle[]} */ await element.$$(selector);

    const texts = /** @type {string[]} */ await Promise.all(
        children.map(child => getElementSelfText(child))
    );
    const index = texts.findIndex(elementText => elementText.trim() === text.trim());

    return index !== -1 ? children[index] : null;
}

/**
 * @param {import("puppeteer").ElementHandle|import("puppeteer").Page} element
 * @param {string} match
 * @param {string} [elementType]
 * @return {Promise<import("puppeteer").ElementHandle|null>}
 */
async function findElementByMatchingText(element, match, elementType = '*') {
    const selector = elementType ? `${elementType}, ${elementType} *` : '*';
    const children = /** @type {import("puppeteer").ElementHandle[]} */ await element.$$(selector);

    const texts = /** @type {string[]} */ await Promise.all(
        children.map(child => getElementSelfText(child))
    );
    const index = texts.findIndex(elementText => elementText.includes(match));

    return index !== -1 ? children[index] : null;
}

module.exports = {
    getElementText,
    findElementByText,
    findElementByMatchingText,
};
