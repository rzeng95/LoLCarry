import React, { PropTypes } from 'react';

const PlayerWrapper = (props) =>

    <tr>
        <td>{props.rank}</td>
        <td>{props.playerName}</td>
        <td>{props.lp}</td>
        <td>{props.wins} / {props.losses}</td>

    </tr>


PlayerWrapper.propTypes = {
    rank       : PropTypes.number.isRequired,
    playerName : PropTypes.string.isRequired,
    lp         : PropTypes.number.isRequired,
    wins       : PropTypes.number.isRequired,
    losses     : PropTypes.number.isRequired
}

export default PlayerWrapper;
