import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ChallengerList from '../components/challengerListComponents/ChallengerList';
import Picker from '../components/challengerListComponents/Picker';

import * as challengerListActions from '../actions/challengerListActions';

class ChallengerListContainer extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.requestChallengerList('na');

    }

    handleChange (nextRegion) {
        this.props.requestChallengerList(nextRegion);
    }

    render() {
        return (
            <div>
            <Picker onChange={this.handleChange} value={this.props.region}/>
            <ChallengerList />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        region: state.challengerList.region
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        requestChallengerList: (region) => dispatch( challengerListActions.requestChallengerListAction(region) )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChallengerListContainer);
//export default connect(mapStateToProps, mapDispatchToProps)(ChallengerListContainer);
