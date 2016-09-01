import React from 'react';

import CurrentTableContainer from '../containers/CurrentTableContainer';
import CurrentStatisticsContainer from '../containers/CurrentStatisticsContainer';

function Result(props) {
    return (

        props.incorrectRegion === true
        ? <p>Please input a valid region in the URL</p>
        : <div>

            <h3>
            Showing current game info for: {props.player} ( {props.region} )
            </h3>

            <CurrentTableContainer
            region={props.region}
            name={props.player} />
            <h3>
            Statistics About Players
            </h3>
            <CurrentStatisticsContainer />
        </div>
    )
}

export default Result;
