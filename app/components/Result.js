import React from 'react';

import CurrentTable from './CurrentTable';
import CurrentStatistics from './CurrentStatistics';

function Result(props) {
    return (
        <div>
            <h3>
            Showing current game info for: {props.params.player} ( {props.params.region} )
            </h3>

            <CurrentTable />
            <CurrentStatistics />
        </div>
    )
}

export default Result;
