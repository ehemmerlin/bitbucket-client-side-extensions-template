const { getBaseUrl, getProject, getPullRequestId, getRepo } = require('./env-helper.js');

function getPullRequestUrl() {
    const baseUrl = getBaseUrl();
    const project = getProject();
    const repo = getRepo();
    const pullRequestId = getPullRequestId();

    return `${baseUrl}/projects/${project}/repos/${repo}/pull-requests/${pullRequestId}`;
}

function getLoginUrl() {
    const baseUrl = getBaseUrl();

    return `${baseUrl}/login`;
}

function getLogoutUrl() {
    const baseUrl = getBaseUrl();

    return `${baseUrl}/j_atl_security_logout`;
}

module.exports = {
    getPullRequestUrl,
    getLoginUrl,
    getLogoutUrl,
};
