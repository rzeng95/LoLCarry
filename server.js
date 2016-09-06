const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const ENV = ( process.env.NODE_ENV || 'development' ).trim();

const fallback = require('express-history-api-fallback');

app.use(express.static('public'));

if (ENV !== 'test') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

require('./server/api')(app);

if(ENV !== 'server' && ENV !== 'test') {

    if(ENV !== 'production') {
        const webpackDevMiddleware = require('webpack-dev-middleware');
        const webpackHotMiddleware = require('webpack-hot-middleware');
        const webpack = require('webpack');
        const config = require('./webpack.config');
        const compiler = webpack(config);

        var middleware = webpackDevMiddleware(compiler, {
            noInfo: true,
            publicPath: config.output.publicPath
        });

        app.use(middleware);
        app.use(webpackHotMiddleware(compiler));

    }

    app.use(express.static(path.join(__dirname, 'dist')));
    app.use(fallback('index.html', { root: path.join(__dirname + '/dist') }));

    app.get('/', (req,res) => {
        res.sendFile(__dirname + '/dist/index.html');
    });

}

app.listen(PORT, () => {
    console.log(`\nListening on port: ${PORT}`);
    console.log(`Using environment: ${ENV}\n`);
});


// Need this for testing purposes
module.exports = app;
