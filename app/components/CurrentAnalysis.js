import React, { PropTypes } from 'react';

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

CurrentAnalysis.propTypes = {
    isLoading : PropTypes.bool.isRequired
}

export default CurrentAnalysis;
