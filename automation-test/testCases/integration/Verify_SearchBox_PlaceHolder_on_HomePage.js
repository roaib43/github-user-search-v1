const { initializeChromeDriver } = require('../../helpers/setUp');
const Navigation = require('../../helpers/navigation');
const screenChecks = require('../../helpers/screenChecks');
const locators = require('../../locators.json');


describe('Verify_SearchBox_PlaceHolder_on_HomePage', function () {
  let driver;

  const navigation = new Navigation();
  const screenCheck = new screenChecks();

  /*
    - This hook is used to create browser insatance
    - And prepare any test data required by the test
    */
  before(async function () {
    driver = await initializeChromeDriver();
  });

  // Starting Test Execution
  step('Open the page and Check if header is displayed', async function () {
    await navigation.navigateToHome(driver);
    await screenCheck.checkIfElementPresent(driver, locators['headerLocator']);
  });

  step('Check Placeholder in Search Box', async function () {
    await screenCheck.verifyPlaceHolder(driver, locators['userName']['userNameLocator'], 'Type a github username');
  });

  //this hook is used to close browser after each test
  after(async function () {
    await driver.quit();
  });
});
