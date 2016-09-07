import React, { PropTypes } from 'react';

function CurrentTableHeader (props) {
    return (
        <table className="table table-nested table-header" style={{"backgroundColor":"beige"}}>
            <colgroup>
            <col className="col-md-3" />
            <col className="col-md-2" />
            <col className="col-md-3" />
            <col className="col-md-1" />
            <col className="col-md-1" />
            </colgroup>
            <thead>
                <tr>
                    <th>{props.side} Side</th>
                    <th>Champion</th>
                    <th>Rank</th>
                    <th>Runes</th>
                    <th>Masteries</th>
                </tr>
            </thead>
        </table>
    );
}

CurrentTableHeader.propTypes = {
    side : PropTypes.string.isRequired
}
export default CurrentTableHeader;
