import React, { Component, PropTypes } from 'react';

import CurrentTable from '../components/CurrentTable';

import axios from 'axios';

class CurrentTableContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading : true
        }
    }
    componentDidMount() {
        axios.get(`/api/getCurrentGame/${this.props.region}/${this.props.name}`)
            .then(
                (res) => {
                    this.setState({
                        isLoading : false, // set to true to test load animation,
                        blob : res.data
                    })
                }

            )
            .catch(
                (err) => {
                    this.errorMessage = err.response.data;
                    this.setState({
                        isLoading : false
                    })
                }
            )

    }
    render() {
        return (
            <CurrentTable
            isLoading = {this.state.isLoading}
            blob={this.state.blob}
            errorMessage={this.errorMessage} />
        );
    }
}

export default CurrentTableContainer;
