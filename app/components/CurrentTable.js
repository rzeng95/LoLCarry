import React, { Component, PropTypes } from 'react';

class CurrentTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h3>current game info table</h3>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Blue Side</th>
                            <th>Red Side</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Player 1</td>
                            <td>Player 6</td>
                        </tr>
                        <tr>
                            <td>Player 2</td>
                            <td>Player 7</td>
                        </tr>
                        <tr>
                            <td>Player 3</td>
                            <td>Player 8</td>
                        </tr>
                        <tr>
                            <td>Player 4</td>
                            <td>Player 9</td>
                        </tr>
                        <tr>
                            <td>Player 5</td>
                            <td>Player 10</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CurrentTable
