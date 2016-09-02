import React, { Component, PropTypes } from 'react';

import CurrentAnalysis from '../components/CurrentAnalysis';

import axios from 'axios';

class CurrentAnalysisContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading : true
        }
    }
    componentDidMount() {
        axios.get('/api/test')
            .then(function (res) {
                console.log(res.data);
            })
            .then(
                () => {
                    this.setState({
                        isLoading : false
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
            <CurrentAnalysis
            isLoading = {this.state.isLoading} />
        );
    }
}

export default CurrentAnalysisContainer;
