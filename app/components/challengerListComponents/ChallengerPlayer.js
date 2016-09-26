import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const ChallengerPlayer = (props) => {
    let spectate;
    if (props.inGameURL) {
        spectate = <Link to={""+props.inGameURL}><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></Link>
    }

    return (
        <tr>
            <td>{spectate}</td>
            <td>{props.rank}</td>
            <td>{props.playerName}</td>
            <td>{props.lp}</td>
            <td>{props.wins} / {props.losses}</td>

        </tr>
    )
}

ChallengerPlayer.propTypes = {
    rank       : PropTypes.number.isRequired,
    playerName : PropTypes.string.isRequired,
    lp         : PropTypes.number.isRequired,
    wins       : PropTypes.number.isRequired,
    losses     : PropTypes.number.isRequired
}

export default ChallengerPlayer;
