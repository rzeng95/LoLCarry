/* These helper functions manage calls to Riot's API.
 * These calls are returned via promise to our local api (api.js)
 * The advantage of handling remote API calls server side is to hide our API key
*/

var axios = require('axios');

var constants = require('./constants');
var apiVersions = constants.apiVersions;
var regionMap = constants.regions;

// This will later be swapped out for a production key and will be reset
var DEV_KEY = 'RGAPI-3133196D-8C91-49C0-BB1C-8391D2C0080F';
var API_KEY = DEV_KEY;


// Clean names by removing weird characters / converting them to utf-8 format
// Lowercase the region (this is only if the user
// types in a capitalized region in the URL)
function getCleanInputs(regionRaw, nameRaw) {

    // ToDo
    var regionCleaned = regionRaw;
    var nameCleaned = nameRaw;

    return [regionCleaned, nameCleaned];
}

// Get summoner info from region and summoner name (na, vanila)
// The output is a json string that is parsed later
// This function assumes that region and name have been cleaned and validated
function getSummonerID (region, name) {
    var version = apiVersions.summonerByNameVersion;
    var url = 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v' +
               version + '/summoner/by-name/' + name + '?api_key=' + API_KEY;

    return axios.get(url);
}

// Get current game info from region and summoner ID (na, 40985835)
// The output is a json string that is parsed later
// THis function assumes that region has been cleaned
function getCurrentGame(region, summonerID) {

    var url = 'https://' + region + '.api.pvp.net/observer-mode/rest/' +
    'consumer/getSpectatorGameInfo/' + regionMap[region] + '/' +
    summonerID + '?api_key=' + API_KEY;
    
    return axios.get(url);
}

var helpers = {

    fetchCurrentGame: function(region, name) {

        var cleanedRegion = getCleanInputs(region, name)[0];
        var cleanedName = getCleanInputs(region, name)[1];

        return getSummonerID(cleanedRegion, cleanedName)

        .then(function(res){
            return getCurrentGame( cleanedRegion, res.data[cleanedName].id );
        })

        .then(function(res){
            // When we are here, this contains the current match info
            // console.log(res.data);
            return res.data
        })

        .catch(function(err){
            console.log("error happened somewhere along the chain")
            console.log(err);
        })

    },
    fetchPlayerStatistics: function() {
        return "ToDo";
    }

};

module.exports = helpers;
