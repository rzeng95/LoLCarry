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

        axios.get('/api/test')
            .then(function (res) {
                console.log(res.data);
            })
            .then(
                () => {
                    this.setState({
                        isLoading : false // set to true to test load animation
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
            <CurrentTable
            isLoading = {this.state.isLoading} />
        );
    }
}

export default CurrentTableContainer;
