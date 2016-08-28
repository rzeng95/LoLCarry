import React, { Component, PropTypes } from 'react';

import CurrentStatistics from '../components/CurrentStatistics';

import axios from 'axios';

class CurrentStatisticsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading : true
        }
    }
    componentDidMount() {
        console.log('stats component mounted');

        axios.get('/api/test')
            .then(function (res) {
                console.log(res.data);
            })
            .then(
                () => {
                    this.setState({
                        isLoading : true // set to true to test load animation
                    })
                }

            )
            .catch(function(res) {
                if(res instanceof Error) {
                  console.log(res.message);
                } else {
                  console.log(res.data);
                }
            })

    }
    render() {
        return (
            <CurrentStatistics
            isLoading = {this.state.isLoading} />
        );
    }
}

export default CurrentStatisticsContainer;
