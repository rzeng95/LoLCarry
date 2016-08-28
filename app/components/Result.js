import React from 'react';

import CurrentTableContainer from '../containers/CurrentTableContainer';
import CurrentStatistics from './CurrentStatistics';

function Result(props) {
    return (
        <div>
            <h3>
            Showing current game info for: {props.params.player} ( {props.params.region} )
            </h3>

            <CurrentTableContainer />
            <CurrentStatistics />
        </div>
    )
}

export default Result;
