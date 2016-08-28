import React, { PropTypes } from 'react';

function Search (props) {
    return (
        <form className="form-inline" onSubmit = {props.onSubmitSummoner}>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Summoner Name" />
            </div>
            <select className="form-control">
                <option value="na">NA</option>
                <option value="kr">KR</option>
            </select>
            <button type="submit" className="btn btn-default">
                Search
            </button>
        </form>
    );
}

// ToDo: add proptypes

export default Search;
