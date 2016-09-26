import React, { PropTypes } from 'react';

const ColumnAlignment = (props) =>
    <colgroup>
        {/* summoner name  */}
        <col className="col-lg-2 col-md-2 col-sm-3 col-xs-3" />

        {/* champion name and portrait */}
        <col className="col-lg-2 col-md-2 col-sm-3 col-xs-3" />

        {/* player elo   */}
        <col className="col-lg-3 col-md-3 col-sm-2 col-xs-3" />

        {/* champion KDA   */}
        <col className="col-lg-1 col-md-3 col-sm-3 col-xs-3" />

        {/* runes  */}
        <col className="col-lg-2 col-md-1 col-sm-1 col-xs-1" />

        {/* masteries  */}
        {/* <col className="col-lg-1 col-md-1 col-sm-1 col-xs-1" /> */}
    </colgroup>

export default ColumnAlignment;
