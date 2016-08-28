import React, { Component, PropTypes } from 'react';

import Loading from './Loading';

function CurrentStatistics (props) {

    return (
        props.isLoading === true
        ? <Loading text="Fetching Player Statistics"/>
        : <div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Statistics</th>
                    </tr>
                </thead>
                <tbody>
                {/* ToDo: make this a loop */}
                    <tr>
                        <td>Player 1 Name</td>
                        <td>Player 1 Statistics</td>
                    </tr>
                    <tr>
                        <td>Player 2 Name</td>
                        <td>Player 2 Statistics</td>
                    </tr>
                    <tr>
                        <td>Player 3 Name</td>
                        <td>Player 3 Statistics</td>
                    </tr>
                    <tr>
                        <td>Player 4 Name</td>
                        <td>Player 4 Statistics</td>
                    </tr>
                    <tr>
                        <td>Player 5 Name</td>
                        <td>Player 5 Statistics</td>
                    </tr>
                    <tr>
                        <td>Player 6 Name</td>
                        <td>Player 6 Statistics</td>
                    </tr>
                    <tr>
                        <td>Player 7 Name</td>
                        <td>Player 7 Statistics</td>
                    </tr>
                    <tr>
                        <td>Player 8 Name</td>
                        <td>Player 8 Statistics</td>
                    </tr>
                    <tr>
                        <td>Player 9 Name</td>
                        <td>Player 9 Statistics</td>
                    </tr>
                    <tr>
                        <td>Player 10 Name</td>
                        <td>Player 10 Statistics</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

}

export default CurrentStatistics;
