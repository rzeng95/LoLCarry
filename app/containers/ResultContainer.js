import React, { Component, PropTypes } from 'react';

import Result from '../components/Result';

import { regions } from '../../server/constants';

class ResultContainer extends Component {
    constructor(props) {
        super(props);

        this.incorrectRegion = false;
    }
    componentWillMount() {
        let region = this.props.params.region;

        // don't care about if player name is invalid; our backend takes care of that
        // however, an incorrect region name won't get us a return from Riot's API
        // if region is invalid, return error message that propagates down
        if (!regions[region]) {
            this.incorrectRegion = true;
        }
        
        this.region = region;

    }
    render() {
        return (
            <Result
            incorrectRegion = {this.incorrectRegion}
            player = {this.props.params.player}
            region = {this.region} />
        );
    }
}

export default ResultContainer;
