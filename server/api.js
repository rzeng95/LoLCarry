var helpers = require('./helpers');

module.exports = function(app) {

    // Get current player's game using their summoner ID
    // Catch if the player isn't in a game
    app.get('/api/getCurrentGame/:region/:summonerName', function(req, res) {
        var regionRaw = req.params.region;
        var nameRaw = req.params.summonerName;

        helpers.fetchCurrentGame(regionRaw, nameRaw)
            .then(function(blob){
                res.json(blob)
            })

    })

    app.get('/api/test', function(req, res) {
        res.send("hello");
    })

}
