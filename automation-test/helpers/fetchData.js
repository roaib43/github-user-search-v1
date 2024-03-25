const fetch = require('node-fetch');
const chai  = require('chai');
const assert = chai.assert;

class fetchBackEndDatas{

    async fetchUserInfo(username,endpoint) {
        const BASE_URL = 'https://api.github.com';
        const endpointToHit = (endpoint === 'userDetails') ? `${BASE_URL}/users/${username}` : `${BASE_URL}/users/${username}/repos`;
        try {
            // Make GET request to the GitHub API endpoint
            const response = await fetch(endpointToHit);
            if (!response.ok) { assert.fail(`Failed to get test Data: ${response.statusText}`); }
            const userData = await response.json();
            return userData;
        } catch (error) {
            assert.fail(`Failed to get test Data: ${error}`);
        }
    }

    async getUserInfo(username){
        let userInfo = await this.fetchUserInfo(username,'userDetails');
        const userDetails = {
            name: userInfo.name,
            numberOfRepo: userInfo.public_repos
        }
        return userDetails;
    }

    async getRepoNameAndDescp(username){
        let repoInfo = await this.fetchUserInfo(username,'repos');
        const repoDetails = repoInfo.map(repo => {
            return {
              name: repo.full_name,
              description: repo.description
            };
        });
        return repoDetails;
    }
}

module.exports = fetchBackEndDatas;