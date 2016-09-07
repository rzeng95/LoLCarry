import React, { PropTypes } from 'react';

import Loading from './Loading';

function CurrentAnalysis (props) {
    console.log(props)
    return (
        props.isLoading === true
        ? <Loading text="Fetching Player Analysis"/>
        : props.isRanked === false
            ? <div>
                <h3><b>Player Analysis</b></h3>
                <br />
                <p>Player Analysis is only available for ranked game modes.</p>
            </div>
            : <div>
                <h3><b>Player Analysis</b></h3>
                <br />
                <p>Not Available Yet.</p>


            </div>
    );

}

CurrentAnalysis.propTypes = {
    isLoading : PropTypes.bool.isRequired,
    isRanked : PropTypes.bool
}

export default CurrentAnalysis;
