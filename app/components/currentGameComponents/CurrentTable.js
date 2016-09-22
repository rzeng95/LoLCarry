import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Loading from '../Loading';
import Error from '../Error';

const CurrentTable = (props) =>
    props.isLoading === true
    ? <Loading text="Fetching Current Game Data"/>
    :
        props.errorMessage
        ? <Error text={props.errorMessage} />
        :
        <div>
            <h3><b>{props.title.participants[0].summonerName}</b></h3>

        </div>


const mapStateToProps = (state) => ({
    isLoading : state.currentGame.isLoading,
    errorMessage : state.currentGame.errorMessage,
    title : state.currentGame.data
})


export default connect(
    mapStateToProps
)(CurrentTable);
