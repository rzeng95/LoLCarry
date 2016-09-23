import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ChallengerList from '../components/challengerListComponents/ChallengerList';

import * as challengerListActions from '../actions/challengerListActions';

class ChallengerListContainer extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.requestChallengerList('na');
    }
    render() {
        return (
            <ChallengerList />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestChallengerList: (region, name) => dispatch( challengerListActions.requestChallengerListAction(region) )
    }
}

export default connect(null, mapDispatchToProps)(ChallengerListContainer);
