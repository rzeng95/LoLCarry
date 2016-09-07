import React, { PropTypes } from 'react';

import Loading from './Loading';
import Error from './Error';

import Player from './Player';

import CurrentAnalysisContainer from '../containers/CurrentAnalysisContainer';

function CurrentTable (props) {
    return (
        props.isLoading === true
        ? <Loading text="Fetching Current Game Data"/>
        :   props.errorMessage
            ? <Error text={props.errorMessage} />
            :
            <div>
                <h3><b>{props.title}</b></h3>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Blue Side</th>
                            <th>Red Side</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><Player playerBlob={props.blob.participants[0]} /></td>
                            <td><Player playerBlob={props.blob.participants[5]} /></td>
                        </tr>
                        <tr>
                            <td><Player playerBlob={props.blob.participants[1]} /></td>
                            <td><Player playerBlob={props.blob.participants[6]} /></td>
                        </tr>
                        <tr>
                            <td><Player playerBlob={props.blob.participants[2]} /></td>
                            <td><Player playerBlob={props.blob.participants[7]} /></td>
                        </tr>
                        <tr>
                            <td><Player playerBlob={props.blob.participants[3]} /></td>
                            <td><Player playerBlob={props.blob.participants[8]} /></td>
                        </tr>
                        <tr>
                            <td><Player playerBlob={props.blob.participants[4]} /></td>
                            <td><Player playerBlob={props.blob.participants[9]} /></td>
                        </tr>
                    </tbody>
                </table>
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
