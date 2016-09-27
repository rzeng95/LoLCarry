import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Loading from '../Loading';
import Error from '../Error';
import ChallengerPlayer from './ChallengerPlayer';

const ChallengerList = (props) => {
    let tmp = props.data;
    switch(props.view) {
        case 'IN_GAME':
            tmp = props.data.filter((player) => player.inGame === 'IN_GAME');
            break;

        default:
            tmp = props.data;
    }

    return (
        props.isLoading === true
        ? <Loading />
        : props.errorMessage
            ? <div><br/><Error text={props.errorMessage} /><br/></div>
            : <div id="scroll-list">

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
                        {tmp.map((player, i) => {
                            return <ChallengerPlayer
                                key={i}
                                inGame={player.inGame}
                                inGameURL={player.inGameURL}
                                rank={player.ranking}
                                playerName={player.playerOrTeamName}
                                lp={player.leaguePoints}
                                wins={player.wins}
                                losses={player.losses}/>
                        })}
                    </tbody>
                </table>


            </div>
    )
}

const mapStateToProps = (state) => ({
    isLoading : state.challengerList.isLoading,
    errorMessage : state.challengerList.errorMessage,
    data: state.challengerList.data,
    view: state.challengerList.view
})


export default connect(
    mapStateToProps
)(ChallengerList);
