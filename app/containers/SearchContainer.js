import React, { Component, PropTypes } from 'react';

import Search from '../components/Search';

class SearchContainer extends Component {
    constructor(props) {
        super(props);
        this.handleSubmitSummoner = this.handleSubmitSummoner.bind(this);
    }
    handleSubmitSummoner(e) {
        e.preventDefault();
        let summonerName = e.target.elements[0].value;
        const summonerRegion = e.target.elements[1].value;

        // Remove spaces from summoner name and remove invalid characters
        summonerName = summonerName.replace(/\s+/g, '').toLowerCase();
        summonerName = summonerName.replace(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/gi, '');

        const path = `/${summonerRegion}/${summonerName}`
        this.context.router.push(path);

    }

    render() {
        return (
            <Search onSubmitSummoner={this.handleSubmitSummoner} />
        );
    }
}

SearchContainer.contextTypes = {
    router: PropTypes.object.isRequired
}

/*
SearchContainer.propTypes = {
    summonerName: PropTypes.string.isRequired
};

SearchContainer.defaultProps = {
    summonerName: ''
};
*/


export default SearchContainer;
