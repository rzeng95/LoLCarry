var path = require('path');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;
var ENV = ( process.env.NODE_ENV || 'development' ).trim();

var fallback = require('express-history-api-fallback');

var bodyParser = require('body-parser');
var morgan = require('morgan');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./server/api')(app);

if(ENV.trim() !== 'production') {
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var webpack = require('webpack');
    var config = require('./webpack.config');
    var compiler = webpack(config);

    var middleware = webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, 'dist')));
app.use(fallback('index.html', { root: path.join(__dirname + '/dist') }))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html')
});


app.listen(PORT, function(error) {
    if (error) {
        console.error(error);
    } else {
        console.info('\nListening on port: %s', PORT);
        console.info('Using environment: %s\n', ENV);
    }
});
