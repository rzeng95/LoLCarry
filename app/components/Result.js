import React from 'react';

import Error from './Error'

import CurrentTableContainer from '../containers/CurrentTableContainer';

function Result(props) {
    return (

        props.incorrectRegion === true
        ? <div>
            <br />
            <Error text= "Please input a valid region in the URL" />
            <br />
        </div>

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
