import React, { PropTypes } from 'react';

import Loading from './Loading';
import Error from './Error';
import ChallengerPlayerWrapper from './ChallengerPlayerWrapper';

function Home (props) {
    return (
        props.isLoading === true
        ? <div><br/><Loading text="Fetching Challenger List"/><br/></div>
        : props.errorMessage
            ? <div><br/><Error text={props.errorMessage} /><br/></div>
            :    <div id="scroll-list">
                <br />
                <h3><b>List of Challenger NA Solo Queue Players</b></h3>
                <br />
                <table className="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th style={{"textAlign":"center"}}>Rank</th>
                            <th style={{"textAlign":"center"}}>Player</th>
                            <th style={{"textAlign":"center"}}>LP</th>
                            <th style={{"textAlign":"center"}}>W/L</th>
                        </tr>
                    </thead>

                    <tbody>
                        {props.blob.map((player, i) => {
                            return <ChallengerPlayerWrapper
                                key={i}
                                rank={i+1}
                                playerName={player.playerOrTeamName}
                                lp={player.leaguePoints}
                                wins={player.wins}
                                losses={player.losses}/>
                        })}
                    </tbody>
                </table>


            </div>
    );
}

Home.propTypes = {
    isLoading    : PropTypes.bool.isRequired,
    errorMessage : PropTypes.string,
    blob         : PropTypes.array
}

export default Home;
