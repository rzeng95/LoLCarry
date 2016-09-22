import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { regions } from '../../server/constants';

import * as currentGameActions from '../actions/currentGameActions';

import CurrentTable from '../components/currentGameComponents/CurrentTable';

class CurrentTableContainer extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.searchForCurrentGame(this.props.params.region, this.props.params.player);
    }
    componentWillReceiveProps(nextProps) {
        this.props.searchForCurrentGame(nextProps.params.region, nextProps.params.player);
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

export default connect(null, mapDispatchToProps)(CurrentTableContainer);
