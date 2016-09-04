import React, { Component, PropTypes } from 'react';

import Loading from './Loading';

function CurrentAnalysis (props) {

    return (
        props.isLoading === true
        ? <Loading text="Fetching Player Analysis"/>
        : <div>
            <h3><b>Player Analysis</b></h3>
            <br />
            <p>Not Available Yet.</p>


        </div>
    );

}

export default CurrentAnalysis;
