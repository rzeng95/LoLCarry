import React, { PropTypes } from 'react';

import Spinner from 'react-spinkit';

const Loading = (props) =>
    <div>
        <h3><b>{props.text}</b></h3>
        <Spinner spinnerName="three-bounce" id="spinner1" />
        <br />
    </div>

Loading.defaultProps = {
    text : 'Loading'
};

Loading.propTypes = {
    text : PropTypes.string.isRequired
}

export default Loading;
