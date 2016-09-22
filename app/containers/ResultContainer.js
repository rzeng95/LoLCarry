import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { regions } from '../../server/constants';

import * as currentGameActions from '../actions/currentGameActions';

import CurrentTable from '../components/currentGameComponents/CurrentTable';

class ResultContainer extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        const player = this.props.params.player;
        const region = this.props.params.region;

        console.log('resultContainer inputs: ' + region + ' ' + name);

        this.props.searchForCurrentGame(region, player);

    }
    componentWillReceiveProps(nextProps) {
        this.props.searchForCurrentGame(nextProps.params.region, nextProps.params.player)
    }

    render() {
        return (
            <CurrentTable />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchForCurrentGame: (region, name) => dispatch( currentGameActions.searchForCurrentGameAction(region, name) )
    }
}

export default connect(null, mapDispatchToProps)(ResultContainer);
