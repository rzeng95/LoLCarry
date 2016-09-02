var helpers = require('./helpers');

var RateLimiter  = require('limiter').RateLimiter;
// Dev key allows us 10 requests per 10 seconds (10 000 ms)
var limiter = new RateLimiter(9, 10000, true);

function handleError(err, callback) {
    var code = err.code;
    var status = err.status;
    var message = err.message;
    var result;

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
            else if (status === 500) result = 'Internal issues. Oops! [4.1]';
            else if (status === 503) result = 'Unable to communicate with Riot API servers.';
            else result = 'Unexpected error: ' + status + ' [4.1]';
            break;
        case 4.2:
            result = 'Unexpected error with server. Try again later [4.2]';
            break;
        default:
            result = '';
    }


    callback(result);

}

// This is purely debug code
function printError(err, src) {
    console.log('\nError detected in: ' + src);
    console.log(err);
    console.log('');
}



module.exports = function(app) {

    // Get current player's game using their summoner ID
    // Catch if the player isn't in a game
    app.get('/api/getCurrentGame/:region/:summonerName', function(req, res) {
        var regionRaw = req.params.region;
        var nameRaw = req.params.summonerName;

        limiter.removeTokens(2, function(err1, remainingRequests) {
            if (remainingRequests < 0) {

                printError('Internal rate limit reached', 'getCurrentGame'); // this is debug code

                res.status(429).send('Internal rate limit reached. Please try again in a few minutes.');
            } else {
                helpers.fetchCurrentGame(regionRaw, nameRaw)
                    .then(function(blob){
                        res.json(blob);
                    })
                    .catch(function(err2){

                        printError(err2, 'getCurrentGame'); // this is debug code

                        handleError(err2, function(msg) {
                            res.status(404).send(msg);
                        });
                    })
            }
        });

    })

    app.get('/api/getChallengerList/:region', function(req,res) {
        limiter.removeTokens(1, function(err1, remainingRequests) {
            if (remainingRequests < 0) {
                printError('Internal rate limit reached', 'getCurrentGame'); // this is debug code

                res.status(429).send('Internal rate limit reached. Please try again in a few minutes.');
            } else {
                helpers.fetchChallengersInGame(req.params.region)
                .then(function(blob) {

                    var challengerList = blob.entries;

                    challengerList.sort(function(a,b) {
                        return b.leaguePoints - a.leaguePoints
                    })

                    res.send(challengerList)
                })
                .catch(function(err2) {
                    handleError(err2, function(msg) {
                        res.status(404).send(msg);
                    });
                })
            }
        });

    })






    app.get('/api/test', function(req, res) {
        res.send("hello");
    })

}
