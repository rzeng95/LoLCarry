import React from 'react';

import CurrentTableContainer from '../containers/CurrentTableContainer';

function Result(props) {
    return (

        props.incorrectRegion === true
        ? <p>Please input a valid region in the URL</p>
        : <div>

            <br />

            <CurrentTableContainer
            region={props.region}
            name={props.player} />

            <br />

        </div>
    )
}

export default Result;
