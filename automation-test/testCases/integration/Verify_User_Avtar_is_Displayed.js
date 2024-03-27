const { initializeChromeDriver } = require('../../helpers/setUp');
const Navigation = require('../../helpers/navigation');
const screenChecks = require('../../helpers/screenChecks');
const fetchBackEndDatas = require('../../helpers/fetchData');
const locators = require('../../locators.json');

describe('Verify_User_Avtar_is_Displayed', function () {
  let driver, avtarLink;

  const navigation = new Navigation();
  const screenCheck = new screenChecks();
  const fetchBackEndData = new fetchBackEndDatas();

  /*
    - This hook is used to create browser insatance
    - And prepare any test data required by the test
    */
  before(async function () {
    driver = await initializeChromeDriver();
    // Getting the required test data from endpoint
    avtarLink = await fetchBackEndData.getUserAvtarLink('roaib43');
  });

  // Starting Test Execution
  step('Open the page and Check if it header is displayed', async function () {
    await navigation.navigateToHome(driver);
    await screenCheck.checkIfElementPresent(driver, locators['headerLocator']);
  });

  step('Enter valid userName and Search', async function () {
    await navigation.searchUserName(driver, locators['userName'], 'roaib43');
  });

  step('Check User Deatils Page - User Avtar', async function () {
    await screenCheck.verifyUserAvtar(driver, locators['userAvtar'], avtarLink);
  });


  //this hook is used to close browser after each test
  after(async function () {
    await driver.quit();
  });
});
