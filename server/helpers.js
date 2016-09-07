'use strict';

/* These helper functions manage calls to Riot's API.
 * These calls are returned via promise to our local api (api.js)
 * The advantage of handling remote API calls server side is to hide our API key
*/

const axios = require('axios');

const constants = require('./constants');
const apiVersions = constants.apiVersions;
const regionMap = constants.regions;

const utf8 = require('utf8');

// The real key has been uploaded as a Heroku config and is not availble.
// For local development, the key is stored in gitignore'd file SECRET.js
const API_KEY = process.env.API_KEY || require('../SECRET').DEV_LOCAL_KEY;


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

    const regionCleaned = regionRaw.replace(/\s+/g, '').toLowerCase();
    let nameCleaned = nameRaw.replace(/\s+/g, '').toLowerCase();

    // Ignore invalid characters
    nameCleaned = nameCleaned.replace(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/gi, '');

    const nameUTF8 = utf8.encode(nameCleaned);

    return [regionCleaned, nameCleaned, nameUTF8];
}

// Get summoner info from region and summoner name (na, vanila)
// The output is a json string that is parsed later
// This function assumes that region and name have been cleaned and validated
function getSummonerID (region, name) {
    const version = apiVersions.summonerByNameVersion;

    const url = `https://${region}.api.pvp.net/api/lol/${region}/v${version}/`+
                `summoner/by-name/${name}?api_key=${API_KEY}`;

    return axios.get(url);
}

// Get current game info from region and summoner ID (na, 40985835)
// The output is a json string that is parsed later
// THis function assumes that region has been cleaned
function getCurrentGame(region, summonerID) {

    const url = `https://${region}.api.pvp.net/observer-mode/rest/consumer/` +
    `getSpectatorGameInfo/${regionMap[region]}/${summonerID}?api_key=${API_KEY}`;

    return axios.get(url);
}

// ========================= GET CHALLENGER LIST ===============================
function getChallengerList(region) {
    const version = apiVersions.challengerListVersion;
    const url = `https://${region}.api.pvp.net/api/lol/${region}/v${version}` +
                `/league/challenger?type=RANKED_SOLO_5x5&api_key=${API_KEY}`;

    return axios.get(url);
}

const helpers = {

    fetchCurrentGame: function(region, name) {

        const cleanedRegion = getCleanInputs(region, name)[0];
        const cleanedName = getCleanInputs(region, name)[1];
        const utf8Name = getCleanInputs(region, name)[2];

        return getSummonerID(cleanedRegion, utf8Name)

            .catch((err) => {
                if (err.response) {
                    throw new APIException(1.1, err.response.status, null);
                } else {
                    throw new APIException(1.2, null, err.message);
                }
            })

            .then((res) => {
                // If we are here, then we've successfully acquired a summonerID
                var summonerID = res.data[cleanedName].id;

                return getCurrentGame(cleanedRegion, summonerID)

                    .catch((err) => {
                        if (err.response) {
                            throw new APIException(2.1, err.response.status, null);
                        } else {
                            throw new APIException(2.2, null, err.message);
                        }
                    })

                    .then((res) => {
                        // If we are here, res.data contains the current match info
                        return res.data;
                    })

            })

    },


    fetchPlayerAnalysis: function() {
        return "ToDo";
    },

    fetchChallengersInGame: function(region) {

        return getChallengerList(region)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                if (err.response) {
                    throw new APIException(4.1, err.response.status, null);
                } else {
                    throw new APIException(4.2, null, err.message);
                }
            })

    }


};

module.exports = helpers;
