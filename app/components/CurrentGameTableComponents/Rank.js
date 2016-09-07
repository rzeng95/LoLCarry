import React, { Component, PropTypes } from 'react';

class Rank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUnranked: true
        }
    }

    render() {
        return (
            this.state.isUnranked === true
            ? <p>Unranked</p>
            : <p>Lots of LP</p>
        );
    }

}

export default Rank;
