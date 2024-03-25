const { By, Key, until } = require('selenium-webdriver');
const chai = require('chai');
const { equal } = require('assert');

const expect = chai.expect;
const assert = chai.assert;

class screenChecks {
  async checkIfElementPresent(driver, locator) {
    await driver.wait(until.elementLocated(By.xpath(locator)), 5000);
  }

  async checkIfGivenTextIsPresent(driver, locator, textToValidate) {
    let element = await driver.wait(until.elementLocated(By.xpath(locator)), 5000)
    expect(await element.getText()).to.equal(textToValidate);
  }

  async checkIfElementIsPresent(driver, locator) {
    expect(await driver.wait(until.elementLocated(By.xpath(locator)), 5000));
  }

  /*
    This function to validate name and respositories count on details page can be improved
    - If we have unique indentifier for each of the element, then we can validate each element, 
    - this way we dont need the if else block
    */
  async checkUserDeatilsPageInfoSection(driver, locator, userInfo) {
    const userInfoData = userInfo.infoSection;
    let userInfoElements;

    userInfoElements = await driver
      .wait(until.elementLocated(By.xpath(locator)), 5000)
      .findElements(By.xpath(locator));
    for (const element of userInfoElements) {
      const textDisplayed = await element.getText();
      if (textDisplayed.includes(userInfoData.name)) {
        expect(textDisplayed).to.include(userInfoData.name);
      } else if (textDisplayed.includes(userInfoData.numberOfRepo.toString())) {
        expect(textDisplayed).to.include(userInfoData.numberOfRepo.toString());
      } else {
        assert.fail(`Invalid Name/Number of Repositories displayed: ${textDisplayed}`);
      }
    }
  }

  async verifyReturnButton(driver, locator, buttonText) {
    await this.checkIfElementIsPresent(driver, locator);
    await this.checkIfGivenTextIsPresent(driver, locator, buttonText);
  }

  async verifyEmptyDescription(driver, locator) {
    expect(await driver.wait(until.elementLocated(By.xpath(locator)), 5000));
  }

  async verifyAllGivenRepositoriesDisplayed(driver, locators, reposInfo) {
    let repoDescpLocator;

    for (const repo of reposInfo) {
      const repoNameLocator = `${locators['repoNameLocator']}\'${repo.name}']`;
      await this.checkIfElementIsPresent(driver, repoNameLocator);
      if (repo.description == null) {
        await this.checkIfElementIsPresent(driver, locators['emptyDescpLocator']);
      } else {
        repoDescpLocator = `${locators['repoDescpLocator']}\'${repo.description}']`;
        await this.checkIfElementIsPresent(driver, repoDescpLocator);
      }
    }
  }

  async verifyUserAvtar(driver, locator, avtarLink) {
    const userAvtarLink = await driver.wait(until.elementLocated(By.xpath(locator)), 5000).getAttribute('src');
    expect(userAvtarLink).to.equal(avtarLink);
  }

  async verifyPlaceHolder(driver, locator, placeHolderValue) {
    const placeHolderText = await driver.wait(until.elementLocated(By.xpath(locator)), 5000).getAttribute('placeholder');
    expect(placeHolderText).to.equal(placeHolderValue);
  }

}

module.exports = screenChecks;
