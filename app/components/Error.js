import React, { PropTypes } from 'react';

const Error = (props) =>

    <h3><b>{props.text}</b></h3>

Error.propTypes = {
    text : PropTypes.string.isRequired
}
export default Error;
