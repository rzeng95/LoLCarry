import React, { PropTypes } from 'react';

import Loading from './Loading';
import Error from './Error';

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
                            <td>{props.blob.participants[0].summonerName}</td>
                            <td>{props.blob.participants[5].summonerName}</td>
                        </tr>
                        <tr>
                            <td>{props.blob.participants[1].summonerName}</td>
                            <td>{props.blob.participants[6].summonerName}</td>
                        </tr>
                        <tr>
                            <td>{props.blob.participants[2].summonerName}</td>
                            <td>{props.blob.participants[7].summonerName}</td>
                        </tr>
                        <tr>
                            <td>{props.blob.participants[3].summonerName}</td>
                            <td>{props.blob.participants[8].summonerName}</td>
                        </tr>
                        <tr>
                            <td>{props.blob.participants[4].summonerName}</td>
                            <td>{props.blob.participants[9].summonerName}</td>
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
