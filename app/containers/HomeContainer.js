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
                    this.interval = setInterval( function() {
                        this.setState({
                            isLoading : false,
                            blob: res.data,
                            errorMessage: null
                        })
                    }.bind(this), 2800); //temporary to show loads 

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
    componentWillUnmount () {
        clearInterval(this.interval);
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
