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

        limiter.removeTokens(2, (err1, remainingRequests) => {

                helpers.fetchCurrentGame(regionRaw, nameRaw)

        });

    });


    app.get('/api/test', (req,res) => {
        res.send('Hello!');
    });

}
