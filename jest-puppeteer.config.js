/* eslint-env node */
const {
    getBrowserWidth,
    getBrowserHeight,
    isDebugModeEnabled,
    getSlowModeDelay,
} = require('./src/main/test/helpers/env-helper.js');

const headless = !isDebugModeEnabled();

module.exports = {
    launch: {
        headless,
        slowMo: isDebugModeEnabled() ? getSlowModeDelay() : 0,
        defaultViewport: {
            width: getBrowserWidth(),
            height: getBrowserHeight(),
        },
    },
};
