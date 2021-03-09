const { getBaseUrl, getProject, getRepository } = require('./env-helper.js');

const getLoginUrl = () => {
    const baseUrl = getBaseUrl();

    return `${baseUrl}/login`;
};

const getLogoutUrl = () => {
    const baseUrl = getBaseUrl();

    return `${baseUrl}/j_atl_security_logout`;
};

const getDashboardUrl = () => {
    const baseUrl = getBaseUrl();

    return `${baseUrl}/dashboard`;
};

const getRepositoryUrl = () => {
    const baseUrl = getBaseUrl();
    const project = getProject();
    const repo = getRepository();

    return `${baseUrl}/projects/${project}/repos/${repo}`;
};

const getCreatePullRequestUrl = () => {
    const repoUrl = getRepositoryUrl();

    return `${repoUrl}/pull-requests?create`;
};

/**
 * @param {number} pullRequestId
 * @return {string}
 */
const getPullRequestUrl = pullRequestId => {
    const repoUrl = getRepositoryUrl();

    return `${repoUrl}/pull-requests/${pullRequestId}`;
};

module.exports = {
    getLoginUrl,
    getLogoutUrl,
    getDashboardUrl,
    getRepositoryUrl,
    getCreatePullRequestUrl,
    getPullRequestUrl,
};
