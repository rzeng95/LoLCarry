import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const Picker = (props) =>
    <div>
        <br />
        <h3><b>List of

        <span style={{"padding":"0 10px 0 10px"}}>
            <select onChange={e => props.onChange(e.target.value)} value={props.valueRegion}>
                <option value="na">NA</option>
                <option value="br">BR</option>
                <option value="eune">EUNE</option>
                <option value="euw">EUW</option>
                <option value="jp">JP</option>
                <option value="kr">KR</option>
                <option value="lan">LAN</option>
                <option value="las">LAS</option>
                <option value="oce">OCE</option>
                <option value="tr">TR</option>
                <option value="ru">RU</option>
            </select>
        </span>

        Challenger Players

        <span style={{"float":"right"}}>
            <span style={{"padding":"0 10px 0 10px"}}>Show</span>
            <select onChange={e => props.onToggle(e.target.value)} value={props.valueToggle} style={{"width":"130px"}}>
                <option value="SHOW_ALL">All</option>
                <option value="IN_GAME">In-Game</option>
            </select>
        </span>

        </b></h3>

        <br />
    </div>


const mapStateToProps = (state) => {
    return {
        region: state.challengerList.region
    }
}
export default connect(mapStateToProps)(Picker);
