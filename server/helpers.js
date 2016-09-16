'use strict';

/* These helper functions manage calls to Riot's API.
 * These calls are returned via promise to our local api (api.js)
 * The advantage of handling remote API calls server side is to hide our API key
*/

const request = require('request');
const async = require('async');
const utf8 = require('utf8');

const constants = require('./constants');
const apiVersions = constants.apiVersions;
const regionMap = constants.regions;



// The real key has been uploaded as a Heroku config and is not availble.
// For local development, the key is stored in gitignore'd file SECRET.js
const API_KEY = process.env.API_KEY || require('../SECRET').DEV_LOCAL_KEY;


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
function getSummonerID (region, name, utf8name, callback) {
    const version = apiVersions.summonerByNameVersion;

    const url = `https://${region}.api.pvp.net/api/lol/${region}/v${version}/`+
                `summoner/by-name/${utf8name}?api_key=${API_KEY}`;

    request(url, (err, res, output) => {

        if (!res.statusCode) {
            callback(['getSummonerID', 'Unknown']);
        } else if (res.statusCode !== 200) {
            callback(['getSummonerID', res.statusCode]);
        } else if (err) {
            callback(['getSummonerID', err]);
        } else {
            let json = JSON.parse(output);
            let summonerID = json[name].id;
            callback(null, region, summonerID);
        }

    })
}

function getCurrentGame (region, summonerID, callback) {
    //console.log(region + ' ' + summonerID);
    const url = `https://${region}.api.pvp.net/observer-mode/rest/consumer/` +
    `getSpectatorGameInfo/${regionMap[region]}/${summonerID}?api_key=${API_KEY}`;

    request(url, (err, res, output) => {

        if (!res.statusCode) {
            callback(['getCurrentGame', 'Unknown']);
        } else if (res.statusCode !== 200) {
            callback(['getCurrentGame', res.statusCode]);
        } else if (err) {
            callback(['getCurrentGame', err]);
        } else {
            let json = JSON.parse(output);

            callback(null, json);
        }
    })


}



function handleError (err, callback) {
    let msg = 'hi';
    let functionName = err[0];
    let status = err[1];
    switch(functionName) {

        case 'getSummonerID':
            if (status === 400) msg = 'Invalid request made. Oops! [1]';
            else if (status === 401) msg = 'Out of date API key. Oops! [1]';
            else if (status === 404) msg = 'This summoner does not exist.';
            else if (status === 429) msg = 'Rate limit exceeded. Oops! [1]';
            else if (status === 500) msg = 'Internal issues. Oops! [1]';
            else if (status === 503) msg = 'Unable to communicate with Riot API servers.';
            else msg = 'Unexpected error: ' + status + ' [1]';

            break;

        case 'getCurrentGame':
            if (status === 403) msg = 'Forbidden request. Oops! [2]';
            else if (status === 404) msg = 'This summoner is currently not in-game.';
            else if (status === 429) msg = 'Rate limit exceeded. Oops! [2]';
            else if (status === 500) msg = 'Internal issues. Oops! [2]';
            else msg = 'Unexpected error: ' + status + ' [2]';

            break;

        default:
            msg = 'Uncaught Error';
    }
    callback(msg);
}

const helpers = {

    fetchCurrentGame: function(region, name, done) {

        const cleanedRegion = getCleanInputs(region, name)[0];
        const cleanedName = getCleanInputs(region, name)[1];
        const utf8Name = getCleanInputs(region, name)[2];

        if (!regionMap[cleanedRegion] ) return done('Invalid Region.', null);

        async.waterfall([

            async.apply(getSummonerID, cleanedRegion, cleanedName, utf8Name),
            getCurrentGame


        ], (err, success) => {

            if (err) {
                console.log(err);
                handleError(err, (msg) => {
                    done(msg, null);
                });
            } else {
                done(null, success);
            }

        })

        //getSummonerID(cleanedRegion, ut f8Name)
    }

};

module.exports = helpers;
