import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Loading from '../Loading';
import Error from '../Error';
import TableColumn from './TableColumn';

const CurrentTable = (props) =>

    props.isLoading === true
    ? <Loading text="Fetching Current Game Data"/>
    :
        props.errorMessage
        ? <Error text={props.errorMessage} />
        :
        <div>
            <h3><b>{props.title}</b></h3>

            <div className="row">
                <TableColumn
                side="Blue"
                players={props.blueSideParticipants} />

                <TableColumn
                side="Red"
                players={props.redSideParticipants} />

            </div>

            {/* <p>ToDO: Player Analysis</p> */}


        </div>

const mapStateToProps = (state) => ({
    isLoading : state.currentGame.isLoading,
    errorMessage : state.currentGame.errorMessage,
    title : state.currentGame.data.gameTitle,
    blueSideParticipants : state.currentGame.data.blueSideParticipants,
    redSideParticipants : state.currentGame.data.redSideParticipants
})


export default connect(
    mapStateToProps
)(CurrentTable);
