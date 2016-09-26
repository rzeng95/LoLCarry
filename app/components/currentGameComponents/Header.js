import React, { PropTypes } from 'react';

import ColumnAlignment from './ColumnAlignment';

const Header = (props) =>
    <table className="table table-nested" style={{"backgroundColor":"beige"}}>
        <ColumnAlignment />

        <tbody>
            <tr>
                {/* summoner name  */}
                <th>{props.side} Side</th>

                {/* champion name and portrait */}
                <th>Champion</th>

                {/* player elo   */}
                <th>Rank</th>

                {/* champion KDA   */}
                <th style={{"textAlign":"center"}}>KDA</th>

                {/* runes  */}
                <th style={{"textAlign":"center"}}>R & M</th>

                {/* masteries  */}
                {/* <th style={{"textAlign":"center"}}>Masteries</th> */}

            </tr>
        </tbody>
    </table>

export default Header;
