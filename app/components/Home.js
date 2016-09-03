import React from 'react';

import Loading from './Loading';
import Error from './Error';
import PlayerWrapper from './PlayerWrapper';

function Home(props) {
    return(
        props.isLoading === true
        ? <div><br/><Loading text="Fetching Challenger List"/><br/></div>
        : props.errorMessage
            ? <div><br/><Error text={props.errorMessage} /><br/></div>
            :    <div id="scroll-list">
                <br />
                <h4><b>List of Challenger NA Solo Queue Players</b></h4>
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
                        {props.blob.map(function(player, i){
                            return <PlayerWrapper
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
    )
}

export default Home;
