'use strict';

const helpers = require('./helpers');

const ENV = ( process.env.NODE_ENV || 'development' ).trim();

const RateLimiter  = require('limiter').RateLimiter;
// Dev key allows us 10 requests per 10 seconds (10 000 ms)
const limiter = new RateLimiter(9, 10000, true);

function handleError(err, callback) {
    let code = err.code;
    let status = err.status;
    let message = err.message;
    let result = '';

    switch(code) {
        case 1.1:
            if (status === 400) result = 'Invalid request made. Oops! [1.1]';
            else if (status === 401) result = 'Out of date API key. Oops! [1.1]';
            else if (status === 404) result = 'This summoner does not exist.';
            else if (status === 429) result = 'Rate limit exceeded. Oops! [1.1]';
            else if (status === 500) result = 'Internal issues. Oops! [1.1]';
            else if (status === 503) result = 'Unable to communicate with Riot API servers.';
            else result = 'Unexpected error: ' + status + ' [1.1]';
            break;
        case 1.2:
            result = 'Unexpected error with server. Try again later [1.2]';
            break;
        case 2.1:
            if (status === 403) result = 'Forbidden request. Oops! [2.1]';
            else if (status === 404) result = 'This summoner is currently not in-game.';
            else if (status === 429) result = 'Rate limit exceeded. Oops! [2.1]';
            else if (status === 500) result = 'Internal issues. Oops! [2.1]';
            else result = 'Unexpected error: ' + status + ' [2.1]';
            break;
        case 2.2:
            result = 'Unexpected error with server. Try again later [2.2]';
            break;
        case 4.1:
            if (status === 400) result = 'Invalid request made. Oops! [4.1]';
            else if (status === 403) result = 'Forbidden request. Oops! [4.1]';
            else if (status === 429) result = 'Rate limit exceeded. Oops! [4.1]';
            else if (status === 500) result = 'Internal issues. Oops! [4.1]';
            else if (status === 503) result = 'Unable to communicate with Riot API servers.';
            else result = 'Unexpected error: ' + status + ' [4.1]';
            break;
        case 4.2:
            result = 'Unexpected error with server. Try again later [4.2]';
            break;
        case 5.1:
            result = status + '[5.1]';
            break;
        case 5.2:
            result = '[5.2]';
            break;
        default:
            result = '';
    }

    callback(result);

}

// This is purely debug code
function printError(err, src) {
    if (ENV === 'development' || ENV === 'server') {
        console.log(`\nError detected in: ${src}`)
        console.log(err);
        console.log('');
    } else {
        return;
    }
}



module.exports = function(app) {

    // Get current player's game using their summoner ID
    app.get('/api/getCurrentGame/:region/:summonerName', (req, res) => {
        const regionRaw = req.params.region;
        const nameRaw = req.params.summonerName;

        limiter.removeTokens(2, (err1, remainingRequests) => {
            if (remainingRequests < 0) {

                printError('Internal rate limit reached', 'getCurrentGame'); // this is debug code

                res.status(429).send('Internal rate limit reached. Please try again in a few minutes.');
            } else {
                helpers.fetchCurrentGame(regionRaw, nameRaw)
                    .then((blob) => {
                        res.json(blob);
                    })
                    .catch((err2) => {
                        printError(err2, 'getCurrentGame'); // this is debug code

                        handleError(err2, (msg) => {
                            res.status(404).send(msg);
                        });
                    })
            }
        });

    });


    app.get('/api/getChallengerList/:region', (req, res) => {
        limiter.removeTokens(1, (err1, remainingRequests) => {
            if (remainingRequests < 0) {
                printError('Internal rate limit reached', 'getChallengerList'); // this is debug code

                res.status(429).send('Internal rate limit reached. Please try again in a few minutes.');
            } else {
                helpers.fetchChallengersInGame(req.params.region)
                .then((blob) => {
                    let challengerList = blob.entries;

                    challengerList.sort((a,b) => {
                        return b.leaguePoints - a.leaguePoints;
                    });
                    // perhaps this is where we axios spread
                    //axios.spread

                    res.send(challengerList);
                })
                .catch((err2) => {

                    printError(err2, 'getChallengerList'); // this is debug code

                    handleError(err2, (msg) => {
                        res.status(404).send(msg);
                    });

                })
            }
        });

    });


    app.get('/api/getChampion/:id', (req, res) => {
        // no rate limiting required for this endnpoint (serves static data from Riot API)
        helpers.fetchChampionById(req.params.id)
            .then((name) => {
                res.send(name);
            })
            .catch((err) => {
                printError(err, 'getChampion');
                handleError(err, (msg) => {
                    res.status(404).send(msg);
                });
            })

    })


    app.get('/api/test', (req,res) => {
        res.send('Hello!');
    });

}
