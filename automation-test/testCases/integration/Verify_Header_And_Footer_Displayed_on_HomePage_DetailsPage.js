const { initializeChromeDriver } = require('../../helpers/setUp');
const Navigation = require('../../helpers/navigation');
const screenChecks = require('../../helpers/screenChecks');
const locators = require('../../locators.json');


describe('Verify_Header_And_Footer_Displayed_on_HomePage_DetailsPage', function () {
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
  step('Open the Home Page', async function () {
    await navigation.navigateToHome(driver);
    await screenCheck.checkIfElementPresent(driver, locators['headerLocator']);
  });

  step('Check if header and footer is displayed', async function () {
    await screenCheck.checkIfElementPresent(driver, locators['headerLocator']);
    await screenCheck.checkIfElementPresent(driver, locators['footerLocator']);
  });

  step('Perform Search and Navigate to DetailsPage', async function () {
    await navigation.searchUserName(driver, locators['userName'], 'roaib43');
  });

  step('Verify DetailsPage displayed and has header and footer', async function () {
    await screenCheck.verifyReturnButton(driver, locators['returnButton'], 'RETURN');
    await screenCheck.checkIfElementPresent(driver, locators['headerLocator']);
    await screenCheck.checkIfElementPresent(driver, locators['footerLocator']);
  });

  //this hook is used to close browser after each test
  after(async function () {
    await driver.quit();
  });
});
