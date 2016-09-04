import React, { PropTypes } from 'react';

function Search (props) {
    return (

        <form className="navbar-form navbar-right"
        style={{"paddingTop":"15px"}}
        onSubmit = {props.onSubmitSummoner}>
            <div className="form-group">
                <input type="text"
                className="form-control"
                style={{"borderRadius":"0", "margin":"2px"}}
                placeholder="Summoner Name"
                name="summoner"
                value={props.username}
                onChange={props.onTextChange}/>
            </div>
            <select className="form-control"
            style={{"borderRadius":"0", "margin":"2px"}}>
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
            <button type="submit"
            className="btn btn-default"
            style={{"borderRadius":"0", "margin":"2px"}}>
                Search
            </button>
        </form>

    );
}

// ToDo: add proptypes

export default Search;
