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

                }); //end limiter
            },
            function fetchParticipantsWrapper(blob, cb) {

                limiter.removeTokens(1, (err, remainingRequests) => {

                    helpers.fetchParticipants(blob, cleanedRegion, (err, json) => {
                        if (err) {
                            cb(err, null);
                        } else {
                            cb(null, json);
                        }

                    })

                });

            }

        ], (err, success) => {
            if (err) {
                res.status(299).send(err);
            } else {

                res.status(200).send(success);
            }
        });


    });


    app.get('/api/test', (req,res) => {
        res.send('Hello!');
    });

}
