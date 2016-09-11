import React, { Component, PropTypes } from 'react';

import axios from 'axios';

class Champion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isValidChampion: true,
            champName: null
        }
    }

    componentWillReceiveProps(nextProps) {
        this.getChampion(nextProps.cid);
    }

    componentDidMount() {
        this.getChampion(this.props.cid);
        /*
        const url = `/api/getChampion/${this.props.cid}`;
        console.log(url);
        axios.get(url)
            .then((res) => {
                this.setState({
                    isValidChampion: true,
                    champName: res.data
                })
            })
            .catch((err) => {
                console.log('an error happened');
                console.log(err.response.data);
                this.setState({
                    isValidChampion: false,
                    champName: null
                })
            })
        */
    }
    getChampion(id) {
        const url = `/api/getChampion/${id}`;
        //console.log(url);
        axios.get(url)
            .then((res) => {
                this.setState({
                    isValidChampion: true,
                    champName: res.data
                })
            })
            .catch((err) => {
                console.log('an error happened');
                console.log(err.response.data);
                this.setState({
                    isValidChampion: false,
                    champName: null
                })
            })
    }
    render() {
        return (
            this.state.isValidChampion === true
            ? <p>{this.state.champName}</p>
            : <p>Unrecognized</p>
        );
    }
}

export default Champion;
