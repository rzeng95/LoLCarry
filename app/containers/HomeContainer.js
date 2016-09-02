import React, { Component, PropTypes } from 'react';

import Home from '../components/Home';

import axios from 'axios';

class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading : true
        }
    }
    componentDidMount() {
        axios.get('/api/getChallengerList/na')
            .then(
                (res) => {

                    this.setState({
                        isLoading : false,
                        blob: res.data,
                        errorMessage: null
                    })

                }

            )
            .catch(
                (err) => {
                    this.setState({
                        isLoading : false,
                        blob: null,
                        errorMessage : err.response.data
                    })
                }
            )

    }
    render() {
        return (
            <Home
            isLoading={this.state.isLoading}
            blob={this.state.blob}
            errorMessage={this.state.errorMessage} />
        );
    }
}

export default HomeContainer;
