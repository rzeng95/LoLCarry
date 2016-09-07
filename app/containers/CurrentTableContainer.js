import React, { Component, PropTypes } from 'react';

import CurrentTable from '../components/CurrentTable';

import axios from 'axios';

import { gameModes } from '../../server/constants';

class CurrentTableContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading : true,
            region: this.props.region,
            name: this.props.name,
            errorMessage: null,
            title: 'Unknown Game Mode'
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
                if (res.data.gameQueueConfigId) {
                    if (gameModes[res.data.gameQueueConfigId])  {
                        gameTitle = gameModes[res.data.gameQueueConfigId];
                    } else {
                        gameTitle = gameModes[res.data.gameType];
                    }
                }

                this.setState({
                    isLoading : false,
                    blob : res.data,
                    errorMessage: null,
                    title : gameTitle
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
            errorMessage={this.state.errorMessage} />
        );
    }
}

export default CurrentTableContainer;
