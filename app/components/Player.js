import React, { PropTypes } from 'react';

import '../styles/main.css';

import RunesIcon from '../assets/Runes.png';
import MasteriesIcon from '../assets/Masteries.png';

function Player (props) {
    return (

        <table className="table table-nested" style={{"backgroundColor":"beige"}}>
            <colgroup>
                <col className="col-md-3" />
                <col className="col-md-2" />
                <col className="col-md-3" />
                <col className="col-md-1" />
                <col className="col-md-1" />
            </colgroup>
            <tbody>
                <tr>
                    <td style={{"text-align":"left"}}>{props.playerBlob.summonerName}</td>
                    <td>PLACEHOLDER</td>
                    <td>PLACEHOLDER</td>
                    <td><img className="small-icon" src={RunesIcon}/></td>
                    <td><img className="small-icon" src={MasteriesIcon}/></td>
                </tr>
            </tbody>
        </table>

    );
}

export default Player;
