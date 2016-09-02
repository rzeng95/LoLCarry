import React, { Component, PropTypes } from 'react';

import Loading from './Loading';

function CurrentAnalysis (props) {

    return (
        props.isLoading === true
        ? <Loading text="Fetching Player Analysis"/>
        : <div>
            <h4><b>Player Analysis</b></h4>
            <br />
            <p>Not Available Yet.</p>


        </div>
    );

}

export default CurrentAnalysis;
