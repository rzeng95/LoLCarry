const constants = {
    regions: {
        'br'   : 'BR1',
        'eune' : 'EUN1',
        'euw'  : 'EUW1',
        'jp'   : 'JP1',
        'kr'   : 'KR',
        'lan'  : 'LA1',
        'las'  : 'LA2',
        'na'   : 'NA1',
        'oce'  : 'OC1',
        'tr'   : 'TR1',
        'ru'   : 'RU'
    },

    apiVersions: {
        summonerByNameVersion : 1.4,
        challengerListVersion : 2.5,
        championStaticVersion : 1.2
    },

    gameModes: {
        0   : 'Custom Game',
        2   : 'Normal 5v5',
        4   : 'Ranked 5v5',
        8   : 'Normal 3v3',
        14  : 'Normal 5v5',
        16  : 'Dominion',
        17  : 'Dominion',
        25  : 'Dominion',
        31  : '5v5 Co-op vs AI',
        32  : '5v5 Co-op vs AI',
        33  : '5v5 Co-op vs AI',
        41  : 'Ranked 3v3',
        42  : 'Ranked 5v5',
        52  : '3v3 Co-op vs AI',
        61  : 'Normal 5v5',
        65  : 'ARAM',
        70  : 'One for All',
        72  : 'Snowdown Showdown 1v1',
        73  : 'Snowdown Showdown 2v2',
        75  : 'Hexakill Summoner\'s Rift',
        76  : 'URF 5v5',
        78  : 'One for All Mirror',
        83  : 'Co-op vs AI URF',
        91  : 'Doom Bots',
        92  : 'Doom Bots',
        93  : 'Doom Bots',
        96  : 'Ascension',
        98  : 'Hexakill Twisted Treeline',
        100 : 'Butcher\'s Bridge',
        300 : 'King Poro',
        310 : 'Nemesis Draft',
        313 : 'Black Market Brawlers',
        315 : 'Nexus Siege',
        317 : 'Definitely Not Dominion',
        400 : 'Normal 5v5',
        410 : 'Ranked 5v5'
    },

    rankedModes: [4, 42, 410]

}

module.exports = constants;
