# LoLCarry
### Real-Time League of Legends Match Information Site  

[![Build Status](https://img.shields.io/travis/rzeng95/LoLCarry/master.svg?style=flat-square)](https://travis-ci.org/rzeng95/LoLCarry)
[![Discord Channel](https://img.shields.io/badge/discord-lolcarry-blue.svg?style=flat-square)](https://discord.gg/mKTTFdd)

#### Live Site  
https://www.lolcarry.io  

#### Description  
LoLCarry allows players of the game League of Legends to view in-game information about their current match. By searching up their own username, they can view information about their teammates and opponents, including rank, champion KDA, and runes/masteries setup. The homepage contains a list of challenger (the top 200 ranked) players of each region. 

#### Purpose
I intially designed LoLCarry as a fun project to learn the [React](https://facebook.github.io/react/) library. Along the way, I applied prior knowledge and learned additional libraries to meet my needs. My React app requests data from an Express backend server. This Express server uses Redis to cache repeated requests in order to speed up page renders. As my app became more complex, I realized that I needed [Redux](http://redux.js.org/) to manage state and update each React component efficiently. Redux also allowed for cool features such as the homepage *Show All / In Game* filter. The React side of the app is written exclusively in ES6 syntax, and is transpiled using Webpack/Babel. 

#### Got bugs / feedback / questions?  
Join the discord channel! (Linked above)
