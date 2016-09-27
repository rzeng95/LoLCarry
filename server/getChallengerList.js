'use strict';

const request = require('request');
const async = require('async');
const constants = require('./constants');

const apiVersions = constants.apiVersions;
const regionMap = constants.regions;

const API_KEY = process.env.API_KEY || require('../SECRET').PRODUCTION_LOCAL_KEY;


function isInGame(summonerID, region, callback) {
    const url = `https://${region}.api.pvp.net/observer-mode/rest/consumer/` +
    `getSpectatorGameInfo/${regionMap[region]}/${summonerID}?api_key=${API_KEY}`;

    request(url, (err, res, output) =>{
        if (!err && res.statusCode === 200) {
            callback(null, 'IN_GAME');
        } else if (err) {
            callback(err, null);
        } else if (res.statusCode === 404){
            callback(null, 'NOT_IN_GAME');
        } else {
            callback(`Unexpected Error: ${res.statusCode}`, null);
        }
    })
}

module.exports = function(region, done) {
    const version = apiVersions.challengerListVersion;

    region = region.replace(/\s+/g, '').toLowerCase();
    if (!regionMap[region]) return done('Invalid Region', null);

    const url = `https://${region}.api.pvp.net/api/lol/${region}/v${version}` +
                `/league/challenger?type=RANKED_SOLO_5x5&api_key=${API_KEY}`;

    request(url, (err, res, output) => {
        if (!err && res.statusCode === 200) {
            let json = JSON.parse(output);
            let challengerList = json.entries;
            challengerList.sort((a,b) => {
                return b.leaguePoints - a.leaguePoints;
            });

            async.map(challengerList, (player, cb) => {
                let summonerID = player.playerOrTeamId;

                let url = `https://${region}.api.pvp.net/observer-mode/rest/consumer/` +
                `getSpectatorGameInfo/${regionMap[region]}/${summonerID}?api_key=${API_KEY}`;

                request(url, (err, res, output) =>{
                    if (!err && res.statusCode === 200) {
                        cb(null, 'IN_GAME');
                    } else if (err) {
                        cb(err, null);
                    } else if (res.statusCode === 404){
                        cb(null, 'NOT_IN_GAME');
                    } else {
                        cb(`Unexpected Error: ${res.statusCode}`, null);
                    }
                })

            }, (err, inGameArray) => {
                if (err) {
                    done(err, null);
                } else {
                    for (let i = 0; i < challengerList.length; i++) {
                        challengerList[i].inGame = inGameArray[i];
                        if (inGameArray[i] === 'IN_GAME') {
                            let name = challengerList[i].playerOrTeamName;
                            name = name.replace(/\s+/g, '').toLowerCase();
                            challengerList[i].inGameURL = `/${region}/${name}`;

                        }
                        challengerList[i]['ranking'] = i+1;
                    }

                    done(null, challengerList);
                }
            }); // end async.map

        } else {
            done(`Error while fetching challenger list: ${res.statusCode}`, null);
        }
    })

}
