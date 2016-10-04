'use strict';

const async = require('async');

const helpers = require('./helpers');
const getChallengerList = require('./getChallengerList');

// const ENV = ( process.env.NODE_ENV || 'development' ).trim();

const RateLimiter  = require('limiter').RateLimiter;
// Dev key allows us 10 requests per 10 seconds (10 000 ms)
// Production key allows us 3000 requests per 10 seconds
const limiter = new RateLimiter(3000, 10000);

const REDIS_URL = process.env.REDIS_URL || require('../SECRET').REDIS_URL;

const cache = require('express-redis-cache')({
    client: require('redis').createClient(REDIS_URL)
})

cache.on('connected', () => {
    console.log('Successfully connected to redis cache\n');
});
cache.on('message', (message) => {
  console.log(`${message}\n`);
});
cache.on('error', (error) => {
    throw new Error('Cache error occured.\n');
});

module.exports = function(app) {

    // Get current player's game using their summoner ID
    app.get('/api/getCurrentGame/:region/:summonerName', (req, res) => {
        const regionRaw = req.params.region;
        const nameRaw = req.params.summonerName;

        const cleanedInputs = helpers.getCleanInputs(regionRaw, nameRaw);
        const cleanedRegion = cleanedInputs[0];
        const cleanedName = cleanedInputs[1];
        const utf8Name = cleanedInputs[2];

        async.waterfall([
            function fetchCurrentGameWrapper(cb) {
                limiter.removeTokens(2, (err, remainingRequests) => {

                    helpers.fetchCurrentGame(cleanedRegion, cleanedName, utf8Name, (err, json) => {
                        if (err) {
                            cb(err, null);
                        } else {
                            cb(null, json);
                        }

                    }); // end helpers.fetchCurrentGame

                }); // end limiter
            },
            function fetchParticipantsWrapper(blob, cb) {

                limiter.removeTokens(1, (err, remainingRequests) => {

                    helpers.fetchParticipants(blob, cleanedRegion, (err, json, list, region) => {
                        if (err) {
                            cb(err, null);
                        } else {
                            cb(null, json, list, region);
                        }

                    }) // end helpers.fetchParticipants

                }); // end limiter

            },

            function fetchSummonerLevelWrapper(blob, summonerIDList, region, cb) {
                limiter.removeTokens(1, (err, remainingRequests) => {
                    helpers.fetchSummonerLevel(blob, summonerIDList, region, (err, json) => {
                        err ? cb(err, null) : cb(null, json);
                    })
                });
            },

            function fetchPicturesWrapper(blob, cb) {
                // these are all fetching static data
                // (does not count against rate limit)
                helpers.fetchPictures(blob, (err, json) => {
                    if (err) {
                        cb(err, null);
                    } else {
                        cb(null, json);
                    }

                })
            },
            function fetchMapInfoWrapper(blob, cb) {
                helpers.fetchMapInfo(blob, (err, json) => {
                    cb(null, json);
                })
            },
            function splitTeamsWrapper(blob, cb) {
                helpers.splitTeams(blob, (err, json) => {
                    cb(null, json);
                })
            },
            function fetchChampionKDAWrapper(blob, cb) {
                limiter.removeTokens(10, (err, remainingRequests) => {
                    helpers.fetchChampionKDA(blob, (err, json) => {
                        err ? cb(err, null) : cb(null, json);
                    })
                });
            },
            function fetchPlayerRunesWrapper(blob, cb) {
                helpers.fetchPlayerRunes(blob, (err, json) => {
                    err ? cb(err, null) : cb(null, json);
                })
            },
            function fetchPlayerMasteriesWrapper(blob, cb) {
                helpers.fetchPlayerMasteries(blob, (err, json) => {
                    err ? cb(err, null) : cb(null, json);
                })
            }

        ], (err, success) => {
            if (err) {
                //res.status(299).send(err);
                res.status(200).send({'err': err});
            } else {

                res.status(200).send(success);
            }
        });


    });


    app.get('/api/getChallengerlist/:region', cache.route({ expire: 30 }), (req, res) => {
        const region = req.params.region;

        limiter.removeTokens(2, (err, remainingRequests) => {

            getChallengerList(region, (err, output) => {
                err
                ? res.status(200).send({'err': err})
                : res.status(200).send(output);

            });

        })
    });

    app.get('/api/test', (req, res) => {
        res.send('Hello!');
    });

}
