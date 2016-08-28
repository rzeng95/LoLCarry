import React from 'react';

import CurrentTableContainer from '../containers/CurrentTableContainer';
import CurrentStatisticsContainer from '../containers/CurrentStatisticsContainer';

function Result(props) {
    return (
        <div>
            <h3>
            Showing current game info for: {props.params.player} ( {props.params.region} )
            </h3>

            <CurrentTableContainer />
            <h3>
            Statistics About Players
            </h3>
            <CurrentStatisticsContainer />
        </div>
    )
}

export default Result;
