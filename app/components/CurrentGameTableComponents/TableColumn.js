import React, { PropTypes } from 'react';

import Player from './Player';

const TableColumn = (props) =>

    <div className="col-lg-6 col-md-12 col-sm-12 col-sm-12 side-column">
        <table className="table table-bordered">
            <thead>
                <tr><th>{props.side} Side</th></tr>
            </thead>
            <tbody>
                <tr><td><Player playerBlob={props.player1} /></td></tr>
                <tr><td><Player playerBlob={props.player2} /></td></tr>
                <tr><td><Player playerBlob={props.player3} /></td></tr>
                <tr><td><Player playerBlob={props.player4} /></td></tr>
                <tr><td><Player playerBlob={props.player5} /></td></tr>
            </tbody>
        </table>
    </div>

TableColumn.propTypes = {
    side : PropTypes.string.isRequired
}

export default TableColumn;
