'use strict';

const helpers = require('./helpers');

const ENV = ( process.env.NODE_ENV || 'development' ).trim();

const RateLimiter  = require('limiter').RateLimiter;
// Dev key allows us 10 requests per 10 seconds (10 000 ms)
const limiter = new RateLimiter(9, 10000);

module.exports = function(app) {

    // Get current player's game using their summoner ID
    app.get('/api/getCurrentGame/:region/:summonerName', (req, res) => {
        const regionRaw = req.params.region;
        const nameRaw = req.params.summonerName;

        limiter.removeTokens(2, (err, remainingRequests) => {

                helpers.fetchCurrentGame(regionRaw, nameRaw, (error, json) => {
                    // Status 299 is our custom http code that we will use to represent failure
                    // (e.g. valid summoner not in game), instead of a direct 404
                    error === null ? res.status(200).send(json) : res.status(299).send(error);

                })

        });

    });


    app.get('/api/test', (req,res) => {
        res.send('Hello!');
    });

}
