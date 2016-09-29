import React from 'react';
import { render } from 'react-dom';
import routes from './config/routes';
import Raven from 'raven-js';

const ENV = ( process.env.NODE_ENV || 'development' ).trim();

if (ENV === 'production') {
    const sentryURL = process.env.SENTRY_URL || require('../SECRET').SENTRY_URL;

    Raven.config(sentryURL).install();
} else {
    console.log('Sentry issue tracking is DISABLED');
}


render(routes, document.getElementById('app'));
