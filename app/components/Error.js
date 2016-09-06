import React, { PropTypes } from 'react';

function Error (props) {

    return (
        <h3><b>{props.text}</b></h3>
    );

}

Error.propTypes = {
    text : PropTypes.string.isRequired
}
export default Error;
