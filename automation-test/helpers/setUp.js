const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

/*
    - this function can be improved 
    - We can make browser name as a end user parameter, so the test can run on any given browser (depencies should be installed)
    - We can also improve this by moving to Root before hook and make it global, so it can be accessed by anywhere in the framework
*/
async function initializeChromeDriver() {
    const options = new chrome.Options();
    return driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
}

module.exports = {
    initializeChromeDriver
};