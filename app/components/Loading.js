import React, { PropTypes } from 'react';

import Spinner from 'react-spinkit';

function Loading (props) {
    return (
        <div>
            <h3><b>{props.text}</b></h3>
            <Spinner spinnerName="rotating-plane" id="spinner1" />
            <Spinner spinnerName="rotating-plane" id="spinner2" />
            <Spinner spinnerName="rotating-plane" id="spinner3" />
            <br />
        </div>
    );
}

Loading.defaultProps = {
    text : 'Loading'
};

Loading.propTypes = {
    text : PropTypes.string.isRequired
}

export default Loading;

/*
class Loading extends Component {
    constructor(props) {
        super(props);

        this.originalText = this.props.text;

        this.state = {
            text: this.originalText
        }
    }
    componentDidMount () {
        const stopper = this.originalText + '...';
        this.interval = setInterval( function() {
            if (this.state.text === stopper) {
                this.setState({
                    text: this.originalText
                });
            } else {
                this.setState({
                    text: this.state.text + '.'
                });
            }
        }.bind(this), 400);
    }
    componentWillUnmount () {
        clearInterval(this.interval);
    }
    render () {
        return (
            <h4><b>{this.state.text}</b></h4>
        )
    }
}

Loading.defaultProps = {
    text: 'Loading'
};


export default Loading;
*/
