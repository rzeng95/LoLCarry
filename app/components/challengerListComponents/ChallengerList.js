import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Loading from '../Loading';
import Error from '../Error';
import ChallengerPlayer from './ChallengerPlayer';

const ChallengerList = (props) =>
    props.isLoading === true
    ? <div><br/><Loading text="Fetching Challenger List"/><br/></div>
    : props.errorMessage
        ? <div><br/><Error text={props.errorMessage} /><br/></div>
        : <div id="scroll-list">
            <br />
            <h3><b>List of Challenger NA Solo Queue Players</b></h3>
            <br />
            <table className="table table-bordered text-center">
                <thead>
                    <tr>
                        <th style={{"textAlign":"center"}}><span className="glyphicon glyphicon-eye-open"></span></th>
                        <th style={{"textAlign":"center"}}>Rank</th>
                        <th style={{"textAlign":"center"}}>Player</th>
                        <th style={{"textAlign":"center"}}>LP</th>
                        <th style={{"textAlign":"center"}}>W/L</th>
                    </tr>
                </thead>

                <tbody>
                    {props.data.map((player, i) => {
                        return <ChallengerPlayer
                            key={i}
                            inGame={player.inGame}
                            inGameURL={player.inGameURL}
                            rank={i+1}
                            playerName={player.playerOrTeamName}
                            lp={player.leaguePoints}
                            wins={player.wins}
                            losses={player.losses}/>
                    })}
                </tbody>
            </table>


        </div>



const mapStateToProps = (state) => ({
    isLoading : state.challengerList.isLoading,
    errorMessage : state.challengerList.errorMessage,
    data: state.challengerList.data
})


export default connect(
    mapStateToProps
)(ChallengerList);
