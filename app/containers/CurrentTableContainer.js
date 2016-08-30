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
        console.log('table component mounted');
        axios.get(`/api/getCurrentGame/${this.props.region}/${this.props.name}`)
            .then(function (res) {
                console.log(res.data);
                return res;
            })
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
                    console.log(err)
                }
            )

    }
    render() {
        return (
            <CurrentTable
            isLoading = {this.state.isLoading}
            blob={this.state.blob} />
        );
    }
}

export default CurrentTableContainer;
