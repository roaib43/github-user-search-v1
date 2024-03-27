const { initializeChromeDriver } = require('../../helpers/setUp');
const Navigation = require('../../helpers/navigation');
const screenChecks = require('../../helpers/screenChecks');
const locators = require('../../locators.json');


describe('Verify_Correct_Error_Displayed_for_InvalidUser', function () {
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
  step('Open the page and Check if it header is displayed', async function () {
    await navigation.navigateToHome(driver);
    await screenCheck.checkIfElementPresent(driver, locators['headerLocator']);
  });

  step('Enter valid userName and Search', async function () {
    await navigation.searchUserName(driver, locators['userName'], 'ThisUserDoesNotExistfinal');
  });

  step('Check User Deatils Page - Error when user not found', async function () {
    await screenCheck.checkIfGivenTextIsPresent(driver, locators['detailsPageError'], 'Ops, something went wrong 😢');
  });

  //this hook is used to close browser after each test
  after(async function () {
    await driver.quit();
  });
});
