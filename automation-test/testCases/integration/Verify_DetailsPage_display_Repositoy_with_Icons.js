const { initializeChromeDriver } = require('../../helpers/setUp');
const Navigation = require('../../helpers/navigation');
const screenChecks = require('../../helpers/screenChecks');
const fetchBackEndDatas = require('../../helpers/fetchData');
const locators = require('../../locators.json');

describe('Verify_DetailsPage_display_Repositoy_with_Icons', function () {
  let driver,repoInfo;

  const navigation = new Navigation();
  const screenCheck = new screenChecks();
  const fetchBackEndData = new fetchBackEndDatas();

  /*
    - This hook is used to create browser insatance
    - And prepare any test data required by the test
    */
  before(async function () {
    driver = await initializeChromeDriver();

    // this user has repositories with icons
    repoInfo = await fetchBackEndData.getRepoNameAndDescp('giggio');
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
    await navigation.searchUserName(driver, locators['userName'], 'giggio');
  });

  step('Check User Deatils Page - Repositories', async function () {
    await screenCheck.verifyAllGivenRepositoriesDisplayed(
      driver,
      locators['repoSection'],
      repoInfo
    );
  });

  //this hook is used to close browser after each test
  after(async function () {
    await driver.quit();
  });
});
