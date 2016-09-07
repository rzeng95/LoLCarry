import React, { Component, PropTypes } from 'react';

import CurrentTable from '../components/CurrentGameTableComponents/CurrentTable';

import axios from 'axios';

import { gameModes, rankedModes } from '../../server/constants';

class CurrentTableContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading : true,
            region: this.props.region,
            name: this.props.name,
            errorMessage: null,
            title: 'Unknown Game Mode',
            isRanked: false
        };
    }
    // this updates the current game table if user enters a new search
    componentWillReceiveProps(nextProps) {
        this.getCurrentGame(nextProps.region, nextProps.name);
    }

    componentDidMount() {
        this.getCurrentGame(this.state.region, this.state.name);
    }

    getCurrentGame(region, name) {
        axios.get(`/api/getCurrentGame/${region}/${name}`)
            .then((res) => {
                let gameTitle = 'Custom Game';
                let isRanked = false;
                if (res.data.gameQueueConfigId) {
                    if (gameModes[res.data.gameQueueConfigId])  {
                        gameTitle = gameModes[res.data.gameQueueConfigId];
                    } else {
                        gameTitle = gameModes[res.data.gameType];
                    }
                }
                if (rankedModes.indexOf(res.data.gameQueueConfigId) !== -1) {
                    isRanked = true;
                } else {
                    isRanked = false;
                }
                this.setState({
                    isLoading : false,
                    blob : res.data,
                    errorMessage: null,
                    title : gameTitle,
                    isRanked : isRanked
                });
            })
            .catch((err) => {
                this.setState({
                    isLoading : false,
                    errorMessage : err.response.data
                });
            })

    }

    render() {
        return (
            <CurrentTable
            isLoading={this.state.isLoading}
            blob={this.state.blob}
            title={this.state.title}
            errorMessage={this.state.errorMessage}
            isRanked={this.state.isRanked}/>
        );
    }
}

export default CurrentTableContainer;
