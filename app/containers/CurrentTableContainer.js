import React, { Component, PropTypes } from 'react';

import CurrentTable from '../components/CurrentTable';

import axios from 'axios';

class CurrentTableContainer extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log('component mounted');
        /*
        axios.get('/api/test')
          .then(function (res) {
            console.log(res);
          })
          .catch(function(res) {
            if(res instanceof Error) {
              console.log(res.message);
            } else {
              console.log(res.data);
            }
          });
          */
    }
    render() {
        return (
            <CurrentTable />
        );
    }
}

export default CurrentTableContainer;
