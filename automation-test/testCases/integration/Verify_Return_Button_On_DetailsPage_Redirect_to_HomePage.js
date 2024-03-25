const { initializeChromeDriver } = require('../../helpers/setUp');
const Navigation = require('../../helpers/navigation');
const screenChecks = require('../../helpers/screenChecks');
const locators = require('../../locators.json');


describe('Verify_Return_Button_On_DetailsPage_Redirect_to_HomePage', function () {
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
    await navigation.searchUserName(driver, locators['userName'], 'roaib43');
  });

  step('Check User Deatils Page - Return Button', async function () {
    await screenCheck.verifyReturnButton(driver, locators['returnButton'], 'RETURN');
  });

  step('Click on Return Button and Verify if user redirected to Homepage', async function () {
    await navigation.clickOnReturnButton(driver, locators['returnButton']);
    await screenCheck.checkIfElementPresent(driver, locators['homePageTitle']);
  });


  //this hook is used to close browser after each test
  after(async function () {
    await driver.quit();
  });
});
