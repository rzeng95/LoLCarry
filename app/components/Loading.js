import React, { Component, PropTypes } from 'react';

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
            <p><b>{this.state.text}</b></p>
        )
    }
}

Loading.defaultProps = {
    text: 'Loading'
};


export default Loading;
