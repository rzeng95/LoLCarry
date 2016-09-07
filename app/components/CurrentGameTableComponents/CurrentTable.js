import React, { PropTypes } from 'react';

import Loading from '../Loading';
import Error from '../Error';

import Player from './Player';
import TableColumn from './TableColumn';

import CurrentAnalysisContainer from '../../containers/CurrentAnalysisContainer';

function CurrentTable (props) {
    return (
        props.isLoading === true
        ? <Loading text="Fetching Current Game Data"/>
        :   props.errorMessage
            ? <Error text={props.errorMessage} />
            :
            <div>
                <h3><b>{props.title}</b></h3>

                <div className="row">
                    <TableColumn
                    side="Blue"
                    player1={props.blob.participants[0]}
                    player2={props.blob.participants[1]}
                    player3={props.blob.participants[2]}
                    player4={props.blob.participants[3]}
                    player5={props.blob.participants[4]} />

                    <TableColumn
                    side="Red"
                    player1={props.blob.participants[5]}
                    player2={props.blob.participants[6]}
                    player3={props.blob.participants[7]}
                    player4={props.blob.participants[8]}
                    player5={props.blob.participants[9]} />
                </div>

                <CurrentAnalysisContainer isRanked={props.isRanked}/>

            </div>
    );

}

CurrentTable.propTypes = {
    isLoading    : PropTypes.bool.isRequired,
    errorMessage : PropTypes.string,
    blob         : PropTypes.object,
    title        : PropTypes.string.isRequired,
    isRanked     : PropTypes.bool
}

export default CurrentTable;
