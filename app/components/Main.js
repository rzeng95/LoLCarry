import React from 'react';
import { Link } from 'react-router';

import '../styles/main.css';
//require('../styles/main.css');

export default React.createClass({
    render () {
        return(

            <div className='main-container'>
                    <Link to='/'><h1>LoLCarry</h1></Link>
                {this.props.children}
            </div>
        )
    }

});
