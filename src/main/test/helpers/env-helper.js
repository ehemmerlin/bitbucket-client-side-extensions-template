const { baseUrl, userLogin, userPassword, debug, slowMo, timeout, width, height } = JSON.parse(
    // eslint-disable-next-line no-underscore-dangle
    process.env.__CONFIG__
);

const getBaseUrl = () => {
    return baseUrl;
};

const getUserLogin = () => {
    return userLogin;
};

const getUserPassword = () => {
    return userPassword;
};

const isDebugModeEnabled = () => {
    return Boolean(debug);
};

const getSlowModeDelay = () => {
    return slowMo;
};

const getBrowserWidth = () => {
    return width;
};

const getBrowserHeight = () => {
    return height;
};

const getTestTimeout = () => {
    return timeout;
};

module.exports = {
    getBaseUrl,
    getUserLogin,
    getUserPassword,
    isDebugModeEnabled,
    getSlowModeDelay,
    getBrowserWidth,
    getBrowserHeight,
    getTestTimeout,
};
