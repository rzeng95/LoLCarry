import React, { PropTypes } from 'react';

import '../../styles/main.css';

import RunesIcon from '../../assets/Runes.png';
import MasteriesIcon from '../../assets/Masteries.png';

import Champion from './Champion';
import Rank from './Rank';

import '../../styles/main.css';

function Player (props) {
    return (
            <table className="table table-nested" style={{"backgroundColor":"beige"}}>
                <colgroup>
                    <col className="col-lg-3 col-md-3 col-sm-4 col-xs-4" />
                    <col className="col-lg-2 col-md-2 col-sm-2 col-xs-2" />
                    <col className="col-lg-3 col-md-3 col-sm-2 col-sm-2" />
                    <col className="col-lg-1 col-md-1 col-sm-1 col-sm-1" />
                    <col className="col-lg-1 col-md-1 col-sm-1 col-sm-1" />
                </colgroup>
                <tbody>
                    <tr>
                        <td style={{"textAlign":"left"}}>{props.playerBlob.summonerName}</td>
                        <td><Champion cid={props.playerBlob.championId} /></td>
                        <td><Rank pid={props.playerBlob.summonerId} /></td>
                        <td><img className="small-icon" src={RunesIcon}/></td>
                        <td><img className="small-icon" src={MasteriesIcon}/></td>
                    </tr>
                </tbody>
            </table>
    );
}

export default Player;
