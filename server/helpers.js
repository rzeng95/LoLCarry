'use strict';

const request = require('request');
const async = require('async');
const utf8 = require('utf8');

const constants = require('./constants');
const apiVersions = constants.apiVersions;
const regionMap = constants.regions;
const gameModes = constants.gameModes;
const rankedModes = constants.rankedModes;
const season = constants.currentSeason;

// The real key has been uploaded as a Heroku config and is not available.
// For local development, the key is stored in gitignore'd file SECRET.js
const API_KEY = process.env.API_KEY || require('../SECRET').PRODUCTION_LOCAL_KEY;



// Get summoner id from region and summoner name (na, vanila)
// This function assumes that region and name have been cleaned and validated
function getSummonerID (region, name, utf8name, callback) {
    const version = apiVersions.summonerByNameVersion;

    const url = `https://${region}.api.pvp.net/api/lol/${region}/v${version}/`+
                `summoner/by-name/${utf8name}?api_key=${API_KEY}`;

    request(url, (err, res, output) => {

        if (err) {
            callback(['getSummonerID', err]);
        } else if (!res.statusCode) {
            callback(['getSummonerID', 'Unknown']);
        } else if (res.statusCode !== 200) {
            callback(['getSummonerID', res.statusCode]);
        } else {
            let json = JSON.parse(output);
            let summonerID = json[name].id;
            callback(null, region, summonerID);
        }

    })
}

// hit riot's current game endpoint. this returns a lot of json...
// ...such as participants' summoner ID's that we will use in later api requests
function getCurrentGame (region, summonerID, callback) {
    const url = `https://${region}.api.pvp.net/observer-mode/rest/consumer/` +
    `getSpectatorGameInfo/${regionMap[region]}/${summonerID}?api_key=${API_KEY}`;

    request(url, (err, res, output) => {

        if (err) {
            callback(['getCurrentGame', err]);
        } else if (!res.statusCode) {
            callback(['getCurrentGame', 'Unknown']);
        } else if (res.statusCode !== 200) {
            callback(['getCurrentGame', res.statusCode]);
        } else {
            let json = JSON.parse(output);
            callback(null, json);
        }
    })


}

function getStaticVersion (blob, callback) {
    const version = apiVersions.staticVersion;
    const url =  `https://global.api.pvp.net/api/lol/static-data/na/v` +
                 `${version}/versions?api_key=${API_KEY}`

    request(url, (err, res, output) => {
        if (!err && res.statusCode === 200) {
            let json = JSON.parse(output);
            callback(null, blob, json[0]);
        } else {
            callback(['getStaticVersion', null])
        }
    });
}

function getChampionNames (blob, picVersion, callback) {

    const version = apiVersions.staticVersion;
    let champIDArray = [];
    let url;
    let urlPic;

    for (let i in blob.participants) {
        champIDArray.push(blob.participants[i].championId);
    }

    async.map(champIDArray, (champID, cb) => {

        url = `https://global.api.pvp.net/api/lol/static-data/na/v${version}/` +
              `champion/${champID}?champData=image&api_key=${API_KEY}`;

        request(url, (err, res, output) => {
            if (!err && res.statusCode === 200) {
                let json = JSON.parse(output);
                cb(null, [json.name, json.image.full]);
            } else {
                cb(['getChampName', null])
            }

        });

    }, (err, champNameArray) => {
        if (err) {
            handleError(err, (msg) => {
                callback(msg, null);
            });
        } else {
            for (let i in blob.participants) {
                urlPic = `http://ddragon.leagueoflegends.com/cdn/` +
                `${picVersion}/img/champion/${champNameArray[i][1]}`;

                blob.participants[i]['championName'] = champNameArray[i][0];
                blob.participants[i]['championURL'] = urlPic;
            }
            callback(null, blob, picVersion);
        }

    });

}

function getStaticURLs (blob, picVersion, callback) {
    // this is where we get summoner spells url's ToDo

    callback(null, blob);
}


function handleError (err, callback) {
    let msg;
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

        case 'getStaticVersion':
        case 'fetchChampName':
            msg = 'Fetch Error'; // Change this

            break;

        default:
            msg = 'Uncaught Error';
    }
    callback(msg);
}

const helpers = {

    getCleanInputs: function(regionRaw, nameRaw) {

        const regionCleaned = regionRaw.replace(/\s+/g, '').toLowerCase();
        let nameCleaned = nameRaw.replace(/\s+/g, '').toLowerCase();

        // Ignore invalid characters
        nameCleaned = nameCleaned.replace(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/gi, '');

        const nameUTF8 = utf8.encode(nameCleaned);

        return [regionCleaned, nameCleaned, nameUTF8];
    },

    fetchCurrentGame: function(cleanedRegion, cleanedName, utf8Name, done) {

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

        }) // end async waterfall

    }, //end fetchCurrentGame

    fetchParticipants: function(blob, region, done) {

        const version = apiVersions.leagueVersion;

        // create array of participants' summoner ID's
        let summonerIDList = '';
        for (let i in blob.participants) {
            summonerIDList += `${blob.participants[i].summonerId},`;
        }
        //console.log(summonerIDList);
        summonerIDList = summonerIDList.slice(0,-1);

        const url = `https://${region}.api.pvp.net/api/lol/${region}/` +
        `v${version}/league/by-summoner/${summonerIDList}/entry?api_key=${API_KEY}`;
        //console.log(url);
        request(url, (err, res, output) => {

            if (err) {
                done(['fetchParticipants', err]);
            } else if (!res.statusCode) {
                done(['fetchParticipants', 'Unknown']);
            } else if (res.statusCode === 404) {
                console.log('special case: all participants are unranked');
                for (let i = 0; i < blob.participants.length; i++) {
                    blob.participants[i].rank = { rank: 'Unranked' };
                }
                done(null, blob, summonerIDList, region);
            } else if (res.statusCode !== 200 && res.statusCode !== 404) {
                done(['fetchParticipants', res.statusCode]);
            } else {
                let json = JSON.parse(output);

                for (let i = 0; i < blob.participants.length; i++) {
                    let idToFind = blob.participants[i].summonerId.toString();

                    if (Object.keys(json).indexOf(idToFind) !== -1 && json[idToFind][0].queue === 'RANKED_SOLO_5x5') {
                        let tier = json[idToFind][0].tier;
                        tier = tier.toLowerCase();
                        tier = tier.charAt(0).toUpperCase() + tier.slice(1);
                        let division = json[idToFind][0].entries[0].division;

                        //division = division.charAt(0).toUpperCase();
                        let lp = json[idToFind][0].entries[0].leaguePoints;
                        let wins = json[idToFind][0].entries[0].wins;
                        let losses = json[idToFind][0].entries[0].losses;

                        let rank = `${tier} ${division} `;
                        lp = `${lp} LP`;
                        let wl = `${wins} / ${losses}`;

                        let series = json[idToFind][0].entries[0].miniSeries;
                        if (series) {
                            blob.participants[i].rank = {
                                rank: rank,
                                lp: lp,
                                wl: wl,
                                series: {
                                    target: series.target,
                                    wins: series.wins,
                                    losses: series.losses,
                                    progress: series.progress
                                }
                            };
                        } else {
                            blob.participants[i].rank = {
                                rank: rank,
                                lp: lp,
                                wl: wl
                            };
                        }


                    } else {
                        blob.participants[i].rank = { rank: 'Unranked' };
                    }
                } //end for loop

                done(null,blob, summonerIDList, region);

            }
        })

    }, // end fetchParticipants

    fetchSummonerLevel: function(blob, summonerIDList, region, done) {
        const version = apiVersions.summonerByNameVersion;
        const url = `https://${region}.api.pvp.net/api/lol/${region}/` +
                `v${version}/summoner/${summonerIDList}?api_key=${API_KEY}`;

        request(url, (err, res, output) => {
            if (!err && res.statusCode === 200) {
                let json = JSON.parse(output);

                //console.log(json);
                for (let i = 0; i < blob.participants.length; i++) {
                    let idToFind = blob.participants[i].summonerId.toString();

                    if (Object.keys(json).indexOf(idToFind) !== -1 && json[idToFind].summonerLevel !== 30) {
                        blob.participants[i].rank = {
                            rank: `Unranked (Level ${json[idToFind].summonerLevel})`
                        }
                    }
                }
                done(null, blob);

            } else {
                console.log(res.statusCode)
                done(['fetchSummonerLevel', null])
            }
        })

    }, // end fetchSummonerLevel

    fetchPictures: function(blob, done) {

        // convert champion id to champion name and champion portrait urls
        // convert rune id to rune portrait urls
        // convert masteries id to masteries portrait (or just show keystone)
        // convert summoner spells id to portrait urls

        async.waterfall([
            async.apply(getStaticVersion, blob),
            getChampionNames,
            getStaticURLs


        ], (err, success) => {

            if (err) {
                handleError(err, (msg) => {
                    done(err, null);
                });
            } else {
                //done(null, success);
                done(null, blob);
            }

        });
    }, // end fetchPictures

    fetchMapInfo: function(blob, done) {

        let gameTitle = 'Custom Game';
        let gameID = blob.gameQueueConfigId;
        let isRanked;

        if (gameID) {
            if (gameModes[gameID]) {
                gameTitle = gameModes[gameID];
            } else {
                gameTitle = blob.gameType;
            }
        }

        rankedModes.indexOf(gameID) !== -1 ? isRanked = true : isRanked = false;
        blob['gameTitle'] = gameTitle;
        blob['isRanked'] = isRanked;

        blob['playersPerSide'] = blob.participants.length / 2;

        done(null, blob);
    }, //end fetchMapInfo

    splitTeams: function(blob, done) {
        let blueSideParticipants = [];
        let redSideParticipants = [];
        for (let player in blob.participants) {
            if (blob.participants[player].teamId === 100) {
                blueSideParticipants.push(blob.participants[player]);
            } else {
                redSideParticipants.push(blob.participants[player]);
            }

        }
        blob['blueSideParticipants'] = blueSideParticipants;
        blob['redSideParticipants'] = redSideParticipants;
        done(null, blob);
    }, //end splitTeams

    fetchChampionKDA: function(blob, done) {
        let region = Object.keys(regionMap).filter((key)=>regionMap[key]===blob.platformId)[0];
        //console.log(region);
        blob['region'] = region;
        //get champ ID array
        async.map(blob.participants, (player, cb) => {
            let summonerID = player.summonerId;
            let champID = player.championId;
            //get player ranked stats
            //then find the champion ID
            let url = `https://${region}.api.pvp.net/api/lol/${region}/` +
            `v${apiVersions.statsVersion}/stats/by-summoner/` +
            `${summonerID}/ranked?season=SEASON${season}&api_key=${API_KEY}`;
            request(url, (err, res, output) => {
                if (err) {
                    cb(err, null);
                } else if (res.statusCode === 404){
                    cb(null, [0, '0 / 0 / 0']);
                } else if (res.statusCode !== 200) {
                    cb(`fetchChampionKDA Error: ${res.statusCode}`, null);
                } else {
                    let json = JSON.parse(output);
                    let t = 0;
                    let w = 0;
                    let l = 0;
                    let k = 0;
                    let d = 0;
                    let a = 0;
                    for (let i = 0; i < json.champions.length; i++) {
                        if (json.champions[i].id === champID) {
                            t = json.champions[i].stats.totalSessionsPlayed;
                            w = json.champions[i].stats.totalSessionsWon;
                            l = json.champions[i].stats.totalSessionsLost;
                            k = json.champions[i].stats.totalChampionKills / t;
                            d = json.champions[i].stats.totalDeathsPerSession / t;
                            a = json.champions[i].stats.totalAssists / t;
                            k = Math.round(k * 10) / 10;
                            d = Math.round(d * 10) / 10;
                            a = Math.round(a * 10) / 10;

                        }
                    }
                    //console.log([t, `${k} / ${d} / ${a}`])
                    //console.log('---')
                    //cb(null, [0,0])
                    cb(null, [t, `${k} / ${d} / ${a}`]);
                }
            });

        }, (err, finalArray) => {
            if (err) {
                done(err, null);
            } else {

                for (let i = 0; i < blob.participants.length; i++) {

                    blob.participants[i]['championGames'] = finalArray[i][0];
                    blob.participants[i]['championKDA'] = finalArray[i][1];
                }
                done(null, blob);
            }

        })

    }
};

module.exports = helpers;
