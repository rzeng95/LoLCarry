'use strict';

const async = require('async');

const helpers = require('./helpers');

const ENV = ( process.env.NODE_ENV || 'development' ).trim();

const RateLimiter  = require('limiter').RateLimiter;
// Dev key allows us 10 requests per 10 seconds (10 000 ms)
const limiter = new RateLimiter(10, 10000);

module.exports = function(app) {

    // Get current player's game using their summoner ID
    app.get('/api/getCurrentGame/:region/:summonerName', (req, res) => {
        const regionRaw = req.params.region;
        const nameRaw = req.params.summonerName;


        async.waterfall([
            function fetchCurrentGameWrapper(cb) {
                limiter.removeTokens(2, (err, remainingRequests) => {
                    // console.log('fetchCurrentGameWrapper');
                    // console.log(err);
                    // console.log(remainingRequests);
                    helpers.fetchCurrentGame(regionRaw, nameRaw, (err, json) => {
                        if (err) {
                            cb(err, null);
                        } else {
                            cb(null, json);
                        }

                    }); // end helpers.fetchCurrentGame

                }); //end limiter
            },
            function fetchParticipantsWrapper(blob, cb) {

                limiter.removeTokens(10, (err, remainingRequests) => {
                    // console.log('fetchParticipantsWrapper');
                    // console.log(err);
                    // console.log(remainingRequests);
                    // helpers.fetchParticipants(blob, (err, json) => {
                    //
                    // })
                    cb(null, blob);
                });

            }

        ], (err, success) => {
            if (err) {
                res.status(299).send(err);
            } else {

                res.status(200).send(success);
            }
        });

        /*
        limiter.removeTokens(2, (err, remainingRequests) => {
            if (err) {
                res.status(500).send('Internal Server Error');
            } else {
                helpers.fetchCurrentGame(regionRaw, nameRaw, (error, json) => {
                    // Status 299 is our custom http code that we will use to represent failure
                    // (e.g. valid summoner not in game), instead of a direct 404
                    if (error !== null) {
                        res.status(299).send(error);
                    } else {

                        limiter.removeTokens(3, (err, remainingRequests) => {

                            helpers.fetchGameParticipants(json, (error, players) => {

                            })
                            //placeholder
                            res.status(200).send(json);
                        })
                    }

                })
            }

        });
        */

    });


    app.get('/api/test', (req,res) => {
        res.send('Hello!');
    });

}
