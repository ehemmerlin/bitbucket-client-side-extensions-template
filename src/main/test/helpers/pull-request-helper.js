const { getRepository, getProject, getBaseUrl } = require('./env-helper');

/**
 * @param {import("puppeteer").Page} page
 * @param {string} sourceBranch
 * @return {Promise<{pullRequestId: number}>}
 */
async function createPullRequest(page, sourceBranch = 'basic_branching') {
    console.debug(`Pull Request: Creating a new pull request...`);

    const baseUrl = getBaseUrl();
    const project = getProject();
    const repository = getRepository();

    const url = `${baseUrl}/rest/api/latest/projects/${project}/repos/${repository}/pull-requests`;
    const payload = {
        title: 'My Pull Request',
        description: '',
        state: 'OPEN',
        open: true,
        closed: false,
        fromRef: {
            id: `refs/heads/${sourceBranch}`,
            repository: {
                slug: repository,
                name: null,
                project: {
                    key: project,
                },
            },
        },
        toRef: {
            id: 'refs/heads/master',
            repository: {
                slug: repository,
                name: null,
                project: {
                    key: project,
                },
            },
        },
        locked: false,
        reviewers: [],
    };

    const pullRequestIdOrError = await page.evaluate(
        async (url, payload) => {
            const response = await fetch(url, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.status !== 201) {
                return {
                    error: await response.text(),
                };
            }

            const { id: pullRequestId } = await response.json();

            return pullRequestId;
        },
        url,
        payload
    );

    if (pullRequestIdOrError && pullRequestIdOrError.error) {
        throw new Error(pullRequestIdOrError.error);
    }

    const pullRequestId = pullRequestIdOrError;

    console.debug(`Pull Request: A new pull request ${pullRequestId} was created`);

    return {
        pullRequestId,
    };
}

/**
 * @param {import("puppeteer").Page} page
 * @param {number} pullRequestId
 * @param {number} version
 * @return {Promise<void>}
 */
async function deletePullRequest(page, pullRequestId, version = 1) {
    console.debug(`Pull Request: Deleting pull request ${pullRequestId}...`);

    const baseUrl = getBaseUrl();
    const project = getProject();
    const repository = getRepository();

    const url = `${baseUrl}/rest/api/latest/projects/${project}/repos/${repository}/pull-requests/${pullRequestId}`;
    const payload = {
        version,
    };

    const result = await page.evaluate(
        async (url, payload) => {
            const response = await fetch(url, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.status !== 204) {
                return {
                    error: await response.text(),
                };
            }
        },
        url,
        payload
    );

    if (result && result.error) {
        throw new Error(result.error);
    }

    console.debug(`Pull Request: Pull request ${pullRequestId} was deleted`);
}

/**
 * @param {import("puppeteer").Page} page
 * @param {number} pullRequestId
 * @param {string} commentText
 * @return {Promise<void>}
 */
async function createRegularCommentOnPullRequest(
    page,
    pullRequestId,
    commentText = 'Testing is fun!'
) {
    console.debug('Pull Request: Creating regular comment...');

    const baseUrl = getBaseUrl();
    const project = getProject();
    const repository = getRepository();

    const url = `${baseUrl}/rest/api/latest/projects/${project}/repos/${repository}/pull-requests/${pullRequestId}/comments?diffType=EFFECTIVE`;

    await page.evaluate(
        async (url, commentText) => {
            const payload = { text: commentText, severity: 'NORMAL' };

            await fetch(url, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
        },
        url,
        commentText
    );

    console.debug('Pull Request: Regular comment created.');
}

module.exports = {
    createPullRequest,
    deletePullRequest,
    createRegularCommentOnPullRequest,
};
