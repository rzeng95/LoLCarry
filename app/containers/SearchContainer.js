import React, { Component, PropTypes } from 'react';

import Search from '../components/Search';

class SearchContainer extends Component {
    constructor(props) {
        super(props);
        this.handleSubmitSummoner = this.handleSubmitSummoner.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.state = {
            username: ''
        };
    }
    handleTextChange(e) {
        this.setState({
            username: e.target.value
        });
    }
    handleSubmitSummoner(e) {
        e.preventDefault();
        let summonerName = e.target.elements[0].value;
        const summonerRegion = e.target.elements[1].value;

        // Remove spaces from summoner name and remove invalid characters
        summonerName = summonerName.replace(/\s+/g, '').toLowerCase();
        summonerName = summonerName.replace(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/gi, '');

        // reset text field after successful submission
        this.setState({
            username: ''
        });

        // If totally invalid input ('', '!!!', etc, then don't do anything at all)
        if (summonerName === '') return false;

        const path = `/${summonerRegion}/${summonerName}`;
        this.context.router.push(path);
    }

    render() {
        return (
            <Search
            username={this.state.username}
            onTextChange={this.handleTextChange}
            onSubmitSummoner={this.handleSubmitSummoner} />
        );
    }
}

SearchContainer.contextTypes = {
    router: PropTypes.object.isRequired
}

export default SearchContainer;
