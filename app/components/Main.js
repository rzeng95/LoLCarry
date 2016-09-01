import React from 'react';
import { Link } from 'react-router';

import SearchContainer from '../containers/SearchContainer';

import '../styles/main.css';

function Main(props) {
    return(
        <div>

            <div className="row" style={{ "backgroundColor":"#212121", "color":"#FFFFFF", "height":"80px" }}>
                <div className="container">
                    <div className="col-xs-2 col-md-2">
                        <Link to='/'><h1>LoLCarry</h1></Link>
                    </div>
                    <div className="col-xs-10 col-md-10">
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
