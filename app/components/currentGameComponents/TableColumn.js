import React, { PropTypes } from 'react';

import Header from './Header';
import Player from './Player';

const TableColumn = (props) =>

    <div className="col-lg-12 col-md-12 col-sm-12 col-sm-12 side-column">
        <table className="table table-bordered">
            <thead>
                <tr>
                    {/* <th>{props.side} Side</th> */}
                    <th><Header side={props.side}/></th>
                </tr>
            </thead>
            <tbody>

                {props.players.map( (player, i) =>
                    <tr key={i}>
                        <td><Player playerBlob={player} /></td>
                    </tr>
                )}

            </tbody>
        </table>
    </div>



export default TableColumn;
