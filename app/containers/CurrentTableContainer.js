import React, { Component, PropTypes } from 'react';

import CurrentTable from '../components/CurrentTable';

import axios from 'axios';

class CurrentTableContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading : true,
            region: this.props.region,
            name: this.props.name,
            errorMessage: null
        };
    }

    componentWillReceiveProps(nextProps) {
        axios.get(`/api/getCurrentGame/${nextProps.region}/${nextProps.name}`)
            .then((res) => {
                this.setState({
                    isLoading : false,
                    blob : res.data,
                    region: nextProps.region,
                    name: nextProps.name,
                    errorMessage: null
                });
            })
            .catch((err) => {
                this.setState({
                    isLoading : false,
                    region: nextProps.region,
                    name: nextProps.name,
                    errorMessage: err.response.data
                });
            })

    }

    componentDidMount() {
        axios.get(`/api/getCurrentGame/${this.state.region}/${this.state.name}`)
            .then((res) => {
                this.setState({
                    isLoading : false,
                    blob : res.data,
                    errorMessage: null
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
            errorMessage={this.state.errorMessage} />
        );
    }
}

export default CurrentTableContainer;
