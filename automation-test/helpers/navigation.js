const { driver } = require('../helpers/setUp');
const { By, Key, until } = require('selenium-webdriver');

class Navigation {
  async navigateToHome(driver) {
    await driver.get('http://localhost:3000/');
  }

  async checkHomePageLoaded(driver) {
    await driver.wait(until.elementLocated(By.className('_title_1kib8_23')), 5000);
  }

  async searchUserName(driver, locators, userNameToSearch) {
    await driver
      .wait(until.elementLocated(By.xpath(locators.userNameLocator)), 5000)
      .sendKeys(userNameToSearch);
    await driver.findElement(By.xpath(locators.searchButtonLocator)).click();
  }

  async clickOnReturnButton(driver, locator) {
    await driver.findElement(By.xpath(locator)).click();
  }
}

module.exports = Navigation;
