import React, { Component, PropTypes } from 'react';

class Champion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isValidChampion: false
        }
    }

    render() {
        return (
            this.state.isValidChampion === true
            ? <p>Placeholder</p>
            : <p>Unrecognized</p>
        );
    }
}

export default Champion;
