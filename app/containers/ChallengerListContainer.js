import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ChallengerList from '../components/challengerListComponents/ChallengerList';
import Picker from '../components/challengerListComponents/Picker';

import * as challengerListActions from '../actions/challengerListActions';

class ChallengerListContainer extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    componentDidMount() {
        this.props.requestChallengerList('na');
    }

    handleChange (nextRegion) {
        this.props.requestChallengerList(nextRegion);
    }
    handleToggle (nextInstr) {
        if (this.props.view !== nextInstr)
            this.props.toggleVisibility(nextInstr);

    }

    render() {
        return (
            <div>
            <Picker
            onChange={this.handleChange} valueRegion={this.props.region}
            onToggle={this.handleToggle} valueToggle={this.props.view}/>
            <ChallengerList />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        region: state.challengerList.region,
        view: state.challengerList.view
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        requestChallengerList: (region) => dispatch( challengerListActions.requestChallengerListAction(region) ),
        toggleVisibility: (nextInstr) => dispatch(
        challengerListActions.toggleVisibilityAction(nextInstr) )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChallengerListContainer);
