import React from 'react';
import { Link } from 'react-router';

import SearchContainer from '../containers/SearchContainer';

import '../styles/main.css';

function Main (props) {
    return (
        <div>

            <div id="header-bar">
                <div className="container">
                    <div className="col-lg-4 col-md-2 col-sm-6 col-xs-12">
                        <Link to='/'><h1>LoLCarry</h1></Link>
                    </div>
                    <div className="col-lg-1 col-md-2 col-sm-3 col-xs-6" id="menu-item">
                        <Link to='/about'><h4 style={{"color":"white"}}>About</h4></Link>
                    </div>
                    <div className="col-lg-1 col-md-2 col-sm-3 col-xs-6" id="menu-item">
                        <Link to='/changelog'><h4 style={{"color":"white"}}>Changelog</h4></Link>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <SearchContainer />
                    </div>
                </div>
            </div>

            <div className="container" id="with-filler">
                {props.children}
            </div>

        </div>

    );

}

export default Main;
