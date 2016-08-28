import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
    render () {
        return(

            <div className='main-container'>
                <h1>
                    <Link to='/'>LoLCarry</Link>
                </h1>
                {this.props.children}
            </div>
        )
    }

});
