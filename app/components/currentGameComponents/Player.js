import React, { PropTypes } from 'react';

import '../../styles/main.css';

import ColumnAlignment from './ColumnAlignment';

import RunesIcon from '../../assets/Runes.png';
import MasteriesIcon from '../../assets/Masteries.png';

const Player = (props) => {
    let rankDisplay;
    props.playerBlob.rank.lp
    ? rankDisplay =
    <td>{props.playerBlob.rank.rank} (<b>{props.playerBlob.rank.lp}</b>)</td>

    : rankDisplay =
    <td>{props.playerBlob.rank.rank}</td>

    return (
        <table className="table table-nested" style={{"backgroundColor":"beige"}}>
            <ColumnAlignment />

            <tbody>
                <tr>
                    {/* summoner name  */}
                    <td>
                        {props.playerBlob.summonerName}
                    </td>

                    {/* champion name and portrait */}
                    <td>
                        <img src={props.playerBlob.championURL}
                             height="25" width="25"
                             style={{float: "left"}} />
                        <p style={{paddingLeft: "10px",float: "left"}}>
                            {props.playerBlob.championName} (<b>{props.playerBlob.championGames}</b>)
                        </p>
                    </td>
                    {rankDisplay}
                    {/* player elo   */}
                    {/* <td>
                        {props.playerBlob.rank.rank} (<b>{props.playerBlob.rank.lp}</b>)
                        {rankDisplay}
                    </td> */}

                    {/* champion KDA   */}
                    <td style={{"textAlign":"center"}}>
                        {props.playerBlob.championKDA}
                    </td>

                    {/* runes  */}
                    <td style={{"textAlign":"center"}}>
                        <img
                        className="small-icon"
                        height="25" width="25"
                        style={{"margin":"0 8px 0 8px"}}
                        src={RunesIcon} />
                        <img
                        className="small-icon"
                        height="25" width="25"
                        style={{"marginLeft":"0 8px 0 8px"}}
                        src={MasteriesIcon} />
                    </td>

                    {/* masteries  */}
                    {/* <td style={{"textAlign":"center"}}>
                        <img className="small-icon" height="25" width="25" src={MasteriesIcon}/>
                    </td> */}
                </tr>
            </tbody>
        </table>
    )
}
export default Player;
