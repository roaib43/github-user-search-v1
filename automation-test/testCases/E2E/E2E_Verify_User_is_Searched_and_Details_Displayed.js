const { initializeChromeDriver } = require('../../helpers/setUp');
const Navigation = require('../../helpers/navigation');
const screenChecks = require('../../helpers/screenChecks');
const fetchBackEndDatas = require('../../helpers/fetchData');
const locators = require('../../locators.json');

describe('E2E_Verify_User_is_Searched_and_Details_Displayed', function () {
  let driver, userInfo;

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
    const userDetails = await fetchBackEndData.getUserInfo('roaib43');
    const repoInfo = await fetchBackEndData.getRepoNameAndDescp('roaib43');
    userInfo = {
      infoSection: userDetails,
      repoDetails: repoInfo,
    };
  });

  // Starting Test Execution
  step('Open the page and Check if it header is displayed', async function () {
    await navigation.navigateToHome(driver);
    await screenCheck.checkIfElementPresent(driver, locators['headerLocator']);
  });

  step('Check if title text is displayed as expected', async function () {
    await screenCheck.checkIfGivenTextIsPresent(
      driver,
      locators['titleLocator'],
      'Search for a user'
    );
  });

  step('Enter valid userName and Search', async function () {
    await navigation.searchUserName(driver, locators['userName'], 'roaib43');
  });

  step('Check User Deatils Page - Info Section', async function () {
    await screenCheck.checkUserDeatilsPageInfoSection(
      driver,
      locators['userInfoSection'],
      userInfo
    );
    await screenCheck.verifyReturnButton(driver, locators['returnButton'], 'RETURN');
  });

  step('Check User Deatils Page - Repositories', async function () {
    await screenCheck.verifyAllGivenRepositoriesDisplayed(
      driver,
      locators['repoSection'],
      userInfo.repoDetails
    );
  });

  //this hook is used to close browser after each test
  after(async function () {
    await driver.quit();
  });
});
