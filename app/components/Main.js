import React from 'react';

export default React.createClass({
    render () {
        return(

            <div className='main-container'>
                <p className='text-primary'>Main.js wraps everything...</p>
                {this.props.children}
            </div>
        )
    }

});
