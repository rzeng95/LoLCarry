import React, { PropTypes } from 'react';

const Champion = (props) =>
    <div style={{textAlign: "center"}}>
        <img src={props.pic} height="20" width="20" style={{float: "left"}}/>
        <p style={{float: "right"}}>{props.name}</p>
    </div>

export default Champion;
