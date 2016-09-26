import React from 'react';

const Changelog = () =>

    <div id="scroll-list">
        <br />
        <h3><b>Changelog</b></h3>
        <br />

        <h4><b>Sep 25 2016</b></h4>
        <p>
            Challenger List (homepage) now works for every region. New features:<br/>
            - Click on the "eye" next to active challenger names to view their current-game information.<br/>
            - Current-game window now displays ranked statistics about each player's champion (KDA, # games played).<br/>
        </p>

        <h4><b>Sep 22 2016</b></h4>
        <p>
            "The next few days" has changed into "the next few weeks." We've been busy refactoring our code - Our front end now uses Redux.js, and our server handles a lot more computations to reduce our front end code. New features:<br/>
            - Each player's rank is now displayed on the current-game window.<br/>
            - Players below level 30 are displayed correctly.<br/>
            - Champion portraits are displayed correctly.<br/>
            - Custom games, 3v3, and 6v6 matches are displayed correctly. Previously, only 5v5 matches could be displayed.
        </p>

        <h4><b>Sep 4 2016</b></h4>
        <p>
            Added About and Changelog pages. Looking to formally ship working current game analyzer within the next few days.
        </p>

    </div>

export default Changelog;
