const {
    debugElement,
    clickOnAndWaitForPageLoad,
    disableAnimations,
} = require('./puppeteer-helper');
const { findElementByText, findElementByMatchingText } = require('./find-helpers');
const { getCreatePullRequestUrl, getPullRequestUrl } = require('./url-helper');

/**
 * @return {Promise<{pullRequestId: number}>}
 */
async function createPullRequest(sourceBranch = 'basic_branching') {
    console.debug(`Pull Request: Creating a new pull request...`);

    await page.goto(getCreatePullRequestUrl());
    await disableAnimations();
    const sourceBranchDropdown = await page.$('#sourceBranch');

    // Click on the dropdown and select branch
    await sourceBranchDropdown.click();
    await page.waitForSelector('#sourceBranchDialog');
    const sourceBranchOptions = await page.$('#sourceBranchDialog');

    const option = await findElementByText(sourceBranchOptions, sourceBranch);
    await option.click();

    // Click on continue button
    const continueButton = await page.$('#show-create-pr-button');
    await continueButton.click();

    // Click on create button
    const createButton = await page.$('#submit-form');
    await clickOnAndWaitForPageLoad(createButton);

    // Verify step
    const failedResult = await findElementByMatchingText(
        page,
        'There is already a pull request open between'
    );

    if (failedResult) {
        throw new Error(`Pull Request for ${sourceBranch} already exist`);
    }

    const pageUrl = page.url();
    const match = pageUrl.match(/pull-requests\/([0-9]+)\/overview$/);

    const pullRequestId = parseInt(match.pop(), 10);

    console.debug(`Pull Request: A new pull request ${pullRequestId} was created`);

    return {
        pullRequestId,
    };
}

async function deletePullRequest(pullRequestId) {
    console.debug(`Pull Request: Deleting pull request ${pullRequestId}...`);

    await page.goto(getPullRequestUrl(pullRequestId));
    await disableAnimations();

    // Click on more actions and select delete pull request
    const moreActionsButton = await page.$('[data-testid="more-actions--trigger"]');
    await moreActionsButton.click();
    await page.waitForSelector('[data-testid="more-actions--content"]');

    const moreActionsOptions = await page.$('[data-testid="more-actions--content"]');
    const deleteOption = await findElementByText(moreActionsOptions, 'Delete');
    await deleteOption.click();

    // Confirm delete
    await page.waitForSelector('[role="dialog"]');
    const confirmDeletePullRequestButton = await findElementByText(
        page,
        'Delete pull request',
        'button'
    );

    await clickOnAndWaitForPageLoad(confirmDeletePullRequestButton);

    console.debug(`Pull Request: Pull request ${pullRequestId} was deleted`);
}

module.exports = {
    createPullRequest,
    deletePullRequest,
};
