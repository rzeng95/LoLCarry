import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';

import '../../styles/main.css';

import ColumnAlignment from './ColumnAlignment';

import RunesIcon from '../../assets/Runes.png';
import MasteriesIcon from '../../assets/Masteries.png';
import bronze from '../../assets/bronze.png';
import silver from '../../assets/silver.png';
import gold from '../../assets/gold.png';
import platinum from '../../assets/platinum.png';
import diamond from '../../assets/diamond.png';
import master from '../../assets/master.png';
import challenger from '../../assets/challenger.png';
import provisional from '../../assets/provisional.png';

import Warlords from '../../assets/6161.png';
import Fervor from '../../assets/6162.png';
import Deathfire from '../../assets/6164.png';

import Stormraiders from '../../assets/6361.png';
import Thunderlords from '../../assets/6362.png';
import Windspeakers from '../../assets/6363.png';

import Grasp from '../../assets/6261.png';
import Strength from '../../assets/6262.png';
import Bond from '../../assets/6263.png';

import NoKeystone from '../../assets/nokeystone.png';


//props.playerBlob.rank.tier
const Player = (props) => {
    let rankDisplay;
    let tierImage;
    let runes;
    let keystone;

    //tierImage = platinum;
    switch(props.playerBlob.rank.tier) {
        case 'bronze':
            tierImage = bronze; break;
        case 'silver':
            tierImage = silver; break;
        case 'gold':
            tierImage = gold; break;
        case 'platinum':
            tierImage = platinum; break;
        case 'diamond':
            tierImage = diamond; break;
        case 'master':
            tierImage = master; break;
        case 'challenger':
            tierImage = challenger; break;
        default:
            tierImage = provisional;
    }

    props.playerBlob.rank.lp
    ? rankDisplay =
    <td>
        <img src={tierImage}
             height="28" width="28"
             style={{float: "left","marginRight":"10px"}} />
        <p>{props.playerBlob.rank.rank} (<b>{props.playerBlob.rank.lp}</b>)</p>
    </td>

    : rankDisplay =
    <td>
        <img src={provisional}
             height="28" width="28"
             style={{float: "left","marginRight":"10px"}} />
        <p>{props.playerBlob.rank.rank}</p>
    </td>

    runes = props.playerBlob.runes.map((rune)=> rune.runeName);

    switch(props.playerBlob.keystoneID) {
        case '6161':
            keystone = Warlords; break;
        case '6162':
            keystone = Fervor; break;
        case '6164':
            keystone = Deathfire; break;
        case '6361':
            keystone = Stormraiders; break;
        case '6362':
            keystone = Thunderlords; break;
        case '6363':
            keystone = Windspeakers; break;
        case '6261':
            keystone = Grasp; break;
        case '6262':
            keystone = Strength; break;
        case '6263':
            keystone = Bond; break;
        default:
            keystone = NoKeystone;
    }

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
                             height="28" width="28"
                             style={{float: "left"}} />
                        <p style={{paddingLeft: "10px","float": "left"}}>
                            {props.playerBlob.championName} (<b>{props.playerBlob.championGames}</b>)
                        </p>
                    </td>

                    {rankDisplay}

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
                        src={RunesIcon}
                        data-tip data-for={"runesTooltip"+props.playerBlob.summonerName} />

                        <img
                        className="small-icon"
                        height="25" width="25"
                        style={{"marginLeft":"0 8px 0 8px"}}
                        src={keystone}
                        data-tip data-for={"masteriesTooltip"+props.playerBlob.summonerName} />

                        <ReactTooltip id={"runesTooltip"+props.playerBlob.summonerName} place="left" type="dark" effect="solid">
                            <p style={{"textAlign":"left"}}><b>Runes</b></p>
                            {props.playerBlob.runes.map((rune, id) =>
                                <p key={id} style={{"textAlign":"left"}}>{rune.count} {rune.runeName}</p>
                            )}

                        </ReactTooltip>

                        <ReactTooltip id={"masteriesTooltip"+props.playerBlob.summonerName} place="left" type="dark" effect="solid">
                            <p style={{"textAlign":"left"}}><b>Masteries</b></p>
                            <p style={{"textAlign":"left"}}>{props.playerBlob.masteryDistribution}</p>
                            <p style={{"textAlign":"left"}}>{props.playerBlob.keystoneName}</p>
                        </ReactTooltip>
                    </td>

                </tr>
            </tbody>
        </table>
    )
}
export default Player;
