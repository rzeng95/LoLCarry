import React, { Component, PropTypes } from 'react';

import Result from '../components/Result';

import { regions } from '../../server/constants';

class ResultContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            incorrectRegion: false
        };
    }
    componentWillMount() {
        // don't care about if player name is invalid; our backend takes care of that
        // however, an incorrect region name won't get us a return from Riot's API
        // if region is invalid, return error message that propagates down
        if (!regions[this.props.params.region]) {
            this.setState({
                incorrectRegion: true
            });
        } else {
            this.setState({
                region: this.props.params.region
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            incorrectRegion: false,
            region: nextProps.params.region,
            player: nextProps.params.player
        });
    }
    render() {
        return (
            <Result
            incorrectRegion={this.state.incorrectRegion}
            player={this.props.params.player}
            region={this.state.region} />
        );
    }
}

export default ResultContainer;
