import React from 'react';

function PlayerWrapper(props) {
    return (
        <tr>
            <td>{props.rank}</td>
            <td>{props.playerName}</td>
            <td>{props.lp}</td>
            <td>{props.wins} / {props.losses}</td>

        </tr>
    )
}
export default PlayerWrapper;
