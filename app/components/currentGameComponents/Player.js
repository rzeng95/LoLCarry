import React, { PropTypes } from 'react';

import '../../styles/main.css';

import RunesIcon from '../../assets/Runes.png';
import MasteriesIcon from '../../assets/Masteries.png';
import Champion from './Champion';

const Player = (props) =>

    <table className="table table-nested" style={{"backgroundColor":"beige"}}>
        <colgroup>
            {/* summoner name  */}
            <col className="col-lg-3 col-md-2 col-sm-4 col-xs-4" />

            {/* champion portrait  */}
            <col className="col-lg-1 col-md-1 col-sm-1 col-xs-1" />

            {/* champion name  */}
            <col className="col-lg-1 col-md-2 col-sm-1 col-xs-1" />

            {/* player elo   */}
            <col className="col-lg-3 col-md-3 col-sm-2 col-sm-2" />

            {/* runes  */}
            <col className="col-lg-1 col-md-1 col-sm-1 col-sm-1" />

            {/* masteries  */}
            <col className="col-lg-1 col-md-1 col-sm-1 col-sm-1" />
        </colgroup>
        <tbody>
            <tr>
                <td>
                    {props.playerBlob.summonerName}
                </td>
                <td>
                    <img src={props.playerBlob.championURL}
                         height="25" width="25"
                         style={{float: "left"}} />
                </td>
                <td>
                    {props.playerBlob.championName}
                </td>

                <td>{props.playerBlob.rank.rank}</td>
                <td><img className="small-icon" height="25" width="25" src={RunesIcon}/></td>
                <td><img className="small-icon" height="25" width="25" src={MasteriesIcon}/></td>
            </tr>
        </tbody>
    </table>

export default Player;
