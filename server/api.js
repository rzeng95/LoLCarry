var helpers = require('./helpers');




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
            else if (status === 500) result = 'Internal issues. Oops! [1.1]';
            else result = 'Unexpected error: ' + status + ' [2.1]';
            break;
        case 2.2:
            result = 'Unexpected error with server. Try again later [2.2]';
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

        helpers.fetchCurrentGame(regionRaw, nameRaw)
            .then(function(blob){
                res.json(blob);
            })
            .catch(function(err){

                printError(err, 'getCurrentGame'); // this is debug code

                handleError(err, function(msg) {
                    res.status(404).send(msg);
                });
            })
    })

    app.get('/api/test', function(req, res) {
        res.send("hello");
    })

}
