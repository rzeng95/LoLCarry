/* These helper functions manage calls to Riot's API.
 * These calls are returned via promise to our local api (api.js)
 * The advantage of handling remote API calls server side is to hide our API key
*/

var axios = require('axios');

var constants = require('./constants');
var apiVersions = constants.apiVersions;
var regionMap = constants.regions;

var utf8 = require('utf8');

// This will later be swapped out for a production key and will be reset
var DEV_KEY = 'RGAPI-3133196D-8C91-49C0-BB1C-8391D2C0080F';
var API_KEY = DEV_KEY;



// This exception is thrown on non-200 requests from Riot's API
// Status is the status code returned (404)
// Message is only if a non-header status is returned
// Example below:
// Note that if we have an error with a response status, we send that back
// Otherwise, we sent the full error message
// The code (1.1, 1.2) allows us to pinpoint where exactlly the error was thrown

// return getSummonerID(cleanedRegion, cleanedName)
// .catch(function(err){
//     if (err.response) {
//         throw new APIException(1.1, err.response.status, null);
//     } else {
//         throw new APIException(1.2, null, err.message);
//     }

function APIException(code, status, message) {
    this.code = code;
    this.status = status;
    this.message = message;
}




// Clean names by removing weird characters / converting them to utf-8 format
// Lowercase the region and remove spaces
// Lowercase the username and convert to utf-8

function getCleanInputs(regionRaw, nameRaw) {

    var regionCleaned = regionRaw.replace(/\s+/g, '').toLowerCase();
    var nameCleaned = nameRaw.replace(/\s+/g, '').toLowerCase();

    // Ignore invalid characters
    nameCleaned = nameCleaned.replace(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/gi, '');

    // Utf8-encode (Allows korean character recognition)
    nameCleaned = utf8.encode(nameCleaned) ;

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

            .catch(function(err){
                if (err.response) {
                    throw new APIException(1.1, err.response.status, null);
                } else {
                    throw new APIException(1.2, null, err.message);
                }
            })

            .then(function(res){
                // If we are here, then we've successfully acquired a summonerID
                var summonerID = res.data[cleanedName].id;

                return getCurrentGame(cleanedRegion, summonerID)

                    .catch(function(err){
                        if (err.response) {
                            throw new APIException(2.1, err.response.status, null);
                        } else {
                            throw new APIException(2.2, null, err.message);
                        }
                    })

                    .then(function(res){
                        // If we are here, res.data contains the current match info
                        return res.data;
                    })

            })

    },


    fetchPlayerAnalysis: function() {
        return "ToDo";
    }

};

module.exports = helpers;
