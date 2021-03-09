const { getBaseUrl, getProject, getPullRequestId, getRepo } = require('./env-helper.js');

const getPullRequestUrl = () => {
    const baseUrl = getBaseUrl();
    const project = getProject();
    const repo = getRepo();
    const pullRequestId = getPullRequestId();

    return `${baseUrl}/projects/${project}/repos/${repo}/pull-requests/${pullRequestId}`;
};

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

module.exports = {
    getPullRequestUrl,
    getLoginUrl,
    getLogoutUrl,
    getDashboardUrl,
};
