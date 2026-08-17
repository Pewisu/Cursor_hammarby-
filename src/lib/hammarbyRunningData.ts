export interface RunningPlayerStat {
  name: string;
  shirtNumber: number;
  position: string;
  distanceMeters: number;
  maxSpeedKmh: number;
  minutesPlayed: number;
  metersPerMinute: number;
}

export interface RunningMatchStat {
  matchId: number;
  round: string;
  date: string;
  sourceUrl: string;
  homeTeam: string;
  awayTeam: string;
  hammarbyWasHome: boolean;
  matchDurationMinutes: number;
  hammarbyTeamDistanceMeters: number;
  hammarbyTeamMinutes: number;
  hammarbyTopSpeedKmh: number;
  players: RunningPlayerStat[];
}

export const hammarbyRunningMatches: RunningMatchStat[] = [
  {
    "matchId": 6529830,
    "round": "Omgång 1",
    "date": "31 mars 2026",
    "sourceUrl": "https://allsvenskan.se/matcher/2026/6529830/hammarby-mot-mjallby-aif",
    "homeTeam": "Hammarby",
    "awayTeam": "Mjällby AIF",
    "hammarbyWasHome": true,
    "matchDurationMinutes": 93.03,
    "hammarbyTeamDistanceMeters": 121832,
    "hammarbyTeamMinutes": 1023.35,
    "hammarbyTopSpeedKmh": 32.26,
    "players": [
      {
        "name": "Markus Karlsson",
        "shirtNumber": 8,
        "position": "Mittfältare",
        "distanceMeters": 12948,
        "maxSpeedKmh": 27.39,
        "minutesPlayed": 93.03,
        "metersPerMinute": 139.18
      },
      {
        "name": "Paulos Abraham",
        "shirtNumber": 7,
        "position": "Anfallare",
        "distanceMeters": 12210,
        "maxSpeedKmh": 32.26,
        "minutesPlayed": 89.55,
        "metersPerMinute": 136.35
      },
      {
        "name": "Hampus Skoglund",
        "shirtNumber": 2,
        "position": "Back",
        "distanceMeters": 11653,
        "maxSpeedKmh": 29.85,
        "minutesPlayed": 93.03,
        "metersPerMinute": 125.26
      },
      {
        "name": "Frederik Winther",
        "shirtNumber": 3,
        "position": "Back",
        "distanceMeters": 11570,
        "maxSpeedKmh": 29.53,
        "minutesPlayed": 93.03,
        "metersPerMinute": 124.36
      },
      {
        "name": "Ibrahima Fofana",
        "shirtNumber": 17,
        "position": "Mittfältare",
        "distanceMeters": 11210,
        "maxSpeedKmh": 30.52,
        "minutesPlayed": 93.03,
        "metersPerMinute": 120.49
      },
      {
        "name": "Nahir Besara",
        "shirtNumber": 20,
        "position": "Mittfältare",
        "distanceMeters": 10784,
        "maxSpeedKmh": 28.16,
        "minutesPlayed": 89.47,
        "metersPerMinute": 120.54
      },
      {
        "name": "Oscar Johansson",
        "shirtNumber": 11,
        "position": "Mittfältare",
        "distanceMeters": 10650,
        "maxSpeedKmh": 29.88,
        "minutesPlayed": 78.12,
        "metersPerMinute": 136.33
      },
      {
        "name": "Victor Eriksson",
        "shirtNumber": 4,
        "position": "Back",
        "distanceMeters": 10243,
        "maxSpeedKmh": 29.77,
        "minutesPlayed": 93.03,
        "metersPerMinute": 110.1
      },
      {
        "name": "Victor Lind",
        "shirtNumber": 9,
        "position": "Anfallare",
        "distanceMeters": 8777,
        "maxSpeedKmh": 31.19,
        "minutesPlayed": 65.43,
        "metersPerMinute": 134.14
      },
      {
        "name": "Montader Madjed",
        "shirtNumber": 26,
        "position": "Anfallare",
        "distanceMeters": 8726,
        "maxSpeedKmh": 28.05,
        "minutesPlayed": 78.13,
        "metersPerMinute": 111.68
      },
      {
        "name": "Warner Hahn",
        "shirtNumber": 1,
        "position": "Målvakt",
        "distanceMeters": 4632,
        "maxSpeedKmh": 25.36,
        "minutesPlayed": 93.03,
        "metersPerMinute": 49.79
      },
      {
        "name": "Noah Persson",
        "shirtNumber": 16,
        "position": "Anfallare",
        "distanceMeters": 3936,
        "maxSpeedKmh": 29.31,
        "minutesPlayed": 27.6,
        "metersPerMinute": 142.61
      },
      {
        "name": "Oscar Steinke Brånby",
        "shirtNumber": 31,
        "position": "Back",
        "distanceMeters": 1795,
        "maxSpeedKmh": 28.29,
        "minutesPlayed": 14.9,
        "metersPerMinute": 120.47
      },
      {
        "name": "Frank Junior Adjei",
        "shirtNumber": 28,
        "position": "Mittfältare",
        "distanceMeters": 1757,
        "maxSpeedKmh": 26.76,
        "minutesPlayed": 14.92,
        "metersPerMinute": 117.79
      },
      {
        "name": "Sourou Kone",
        "shirtNumber": 21,
        "position": "Mittfältare",
        "distanceMeters": 492,
        "maxSpeedKmh": 23.23,
        "minutesPlayed": 3.57,
        "metersPerMinute": 137.94
      },
      {
        "name": "Elohim Kabore",
        "shirtNumber": 29,
        "position": "Anfallare",
        "distanceMeters": 449,
        "maxSpeedKmh": 23.13,
        "minutesPlayed": 3.48,
        "metersPerMinute": 128.9
      }
    ]
  },
  {
    "matchId": 6529842,
    "round": "Omgång 2",
    "date": "13 april 2026",
    "sourceUrl": "https://allsvenskan.se/matcher/2026/6529842/ik-sirius-mot-hammarby",
    "homeTeam": "IK Sirius",
    "awayTeam": "Hammarby",
    "hammarbyWasHome": false,
    "matchDurationMinutes": 93.67,
    "hammarbyTeamDistanceMeters": 116883,
    "hammarbyTeamMinutes": 1030.35,
    "hammarbyTopSpeedKmh": 32.52,
    "players": [
      {
        "name": "Markus Karlsson",
        "shirtNumber": 8,
        "position": "Mittfältare",
        "distanceMeters": 12157,
        "maxSpeedKmh": 31.06,
        "minutesPlayed": 93.67,
        "metersPerMinute": 129.79
      },
      {
        "name": "Hampus Skoglund",
        "shirtNumber": 2,
        "position": "Back",
        "distanceMeters": 11966,
        "maxSpeedKmh": 31.64,
        "minutesPlayed": 93.67,
        "metersPerMinute": 127.75
      },
      {
        "name": "Frederik Winther",
        "shirtNumber": 3,
        "position": "Back",
        "distanceMeters": 11412,
        "maxSpeedKmh": 31.48,
        "minutesPlayed": 93.67,
        "metersPerMinute": 121.84
      },
      {
        "name": "Nahir Besara",
        "shirtNumber": 20,
        "position": "Mittfältare",
        "distanceMeters": 10653,
        "maxSpeedKmh": 29.63,
        "minutesPlayed": 93.67,
        "metersPerMinute": 113.73
      },
      {
        "name": "Oscar Johansson",
        "shirtNumber": 11,
        "position": "Mittfältare",
        "distanceMeters": 10319,
        "maxSpeedKmh": 29.64,
        "minutesPlayed": 76.53,
        "metersPerMinute": 134.83
      },
      {
        "name": "Victor Eriksson",
        "shirtNumber": 4,
        "position": "Back",
        "distanceMeters": 10280,
        "maxSpeedKmh": 32.52,
        "minutesPlayed": 93.67,
        "metersPerMinute": 109.75
      },
      {
        "name": "Victor Lind",
        "shirtNumber": 9,
        "position": "Anfallare",
        "distanceMeters": 9512,
        "maxSpeedKmh": 32.44,
        "minutesPlayed": 76.42,
        "metersPerMinute": 124.48
      },
      {
        "name": "Montader Madjed",
        "shirtNumber": 26,
        "position": "Anfallare",
        "distanceMeters": 8951,
        "maxSpeedKmh": 27.13,
        "minutesPlayed": 81.78,
        "metersPerMinute": 109.45
      },
      {
        "name": "Ibrahima Fofana",
        "shirtNumber": 6,
        "position": "Mittfältare",
        "distanceMeters": 7805,
        "maxSpeedKmh": 28.69,
        "minutesPlayed": 62.8,
        "metersPerMinute": 124.28
      },
      {
        "name": "Elohim Kabore",
        "shirtNumber": 29,
        "position": "Anfallare",
        "distanceMeters": 7612,
        "maxSpeedKmh": 31.76,
        "minutesPlayed": 62.75,
        "metersPerMinute": 121.31
      },
      {
        "name": "Paulos Abraham",
        "shirtNumber": 7,
        "position": "Anfallare",
        "distanceMeters": 4076,
        "maxSpeedKmh": 28.68,
        "minutesPlayed": 30.92,
        "metersPerMinute": 131.84
      },
      {
        "name": "Tesfaldet Tekie",
        "shirtNumber": 5,
        "position": "Mittfältare",
        "distanceMeters": 3963,
        "maxSpeedKmh": 28.09,
        "minutesPlayed": 30.87,
        "metersPerMinute": 128.39
      },
      {
        "name": "Warner Hahn",
        "shirtNumber": 1,
        "position": "Målvakt",
        "distanceMeters": 2553,
        "maxSpeedKmh": 22,
        "minutesPlayed": 93.67,
        "metersPerMinute": 27.26
      },
      {
        "name": "Oliver Jordan Hagen",
        "shirtNumber": 15,
        "position": "Anfallare",
        "distanceMeters": 2162,
        "maxSpeedKmh": 31.48,
        "minutesPlayed": 17.25,
        "metersPerMinute": 125.33
      },
      {
        "name": "Noah Persson",
        "shirtNumber": 16,
        "position": "Anfallare",
        "distanceMeters": 2061,
        "maxSpeedKmh": 27.35,
        "minutesPlayed": 17.13,
        "metersPerMinute": 120.29
      },
      {
        "name": "Frank Junior Adjei",
        "shirtNumber": 28,
        "position": "Mittfältare",
        "distanceMeters": 1401,
        "maxSpeedKmh": 26.27,
        "minutesPlayed": 11.88,
        "metersPerMinute": 117.9
      }
    ]
  },
  {
    "matchId": 6529847,
    "round": "Omgång 3",
    "date": "18 april 2026",
    "sourceUrl": "https://allsvenskan.se/matcher/2026/6529847/hammarby-mot-orgryte-is",
    "homeTeam": "Hammarby",
    "awayTeam": "Örgryte",
    "hammarbyWasHome": true,
    "matchDurationMinutes": 92,
    "hammarbyTeamDistanceMeters": 121459,
    "hammarbyTeamMinutes": 1013,
    "hammarbyTopSpeedKmh": 32.28,
    "players": [
      {
        "name": "Markus Karlsson",
        "shirtNumber": 8,
        "position": "Mittfältare",
        "distanceMeters": 12375,
        "maxSpeedKmh": 30.15,
        "minutesPlayed": 92,
        "metersPerMinute": 134.51
      },
      {
        "name": "Hampus Skoglund",
        "shirtNumber": 2,
        "position": "Back",
        "distanceMeters": 12181,
        "maxSpeedKmh": 31.16,
        "minutesPlayed": 92,
        "metersPerMinute": 132.4
      },
      {
        "name": "Victor Lind",
        "shirtNumber": 9,
        "position": "Anfallare",
        "distanceMeters": 11523,
        "maxSpeedKmh": 30.82,
        "minutesPlayed": 92,
        "metersPerMinute": 125.25
      },
      {
        "name": "Frederik Winther",
        "shirtNumber": 3,
        "position": "Back",
        "distanceMeters": 11355,
        "maxSpeedKmh": 28.95,
        "minutesPlayed": 92,
        "metersPerMinute": 123.42
      },
      {
        "name": "Noah Persson",
        "shirtNumber": 16,
        "position": "Anfallare",
        "distanceMeters": 10520,
        "maxSpeedKmh": 31.72,
        "minutesPlayed": 78,
        "metersPerMinute": 134.87
      },
      {
        "name": "Victor Eriksson",
        "shirtNumber": 4,
        "position": "Back",
        "distanceMeters": 10320,
        "maxSpeedKmh": 31.07,
        "minutesPlayed": 92,
        "metersPerMinute": 112.17
      },
      {
        "name": "Oscar Johansson",
        "shirtNumber": 11,
        "position": "Mittfältare",
        "distanceMeters": 8259,
        "maxSpeedKmh": 28.75,
        "minutesPlayed": 59,
        "metersPerMinute": 139.98
      },
      {
        "name": "Paulos Abraham",
        "shirtNumber": 7,
        "position": "Anfallare",
        "distanceMeters": 8051,
        "maxSpeedKmh": 32.28,
        "minutesPlayed": 59,
        "metersPerMinute": 136.46
      },
      {
        "name": "Montader Madjed",
        "shirtNumber": 26,
        "position": "Anfallare",
        "distanceMeters": 7983,
        "maxSpeedKmh": 31.96,
        "minutesPlayed": 71,
        "metersPerMinute": 112.44
      },
      {
        "name": "Nahir Besara",
        "shirtNumber": 20,
        "position": "Mittfältare",
        "distanceMeters": 7069,
        "maxSpeedKmh": 28.77,
        "minutesPlayed": 59,
        "metersPerMinute": 119.81
      },
      {
        "name": "Tesfaldet Tekie",
        "shirtNumber": 5,
        "position": "Mittfältare",
        "distanceMeters": 4604,
        "maxSpeedKmh": 25.32,
        "minutesPlayed": 33,
        "metersPerMinute": 139.52
      },
      {
        "name": "Frank Junior Adjei",
        "shirtNumber": 28,
        "position": "Mittfältare",
        "distanceMeters": 4346,
        "maxSpeedKmh": 27.92,
        "minutesPlayed": 33,
        "metersPerMinute": 131.7
      },
      {
        "name": "Warner Hahn",
        "shirtNumber": 1,
        "position": "Målvakt",
        "distanceMeters": 4333,
        "maxSpeedKmh": 19.58,
        "minutesPlayed": 92,
        "metersPerMinute": 47.1
      },
      {
        "name": "Nikola Vasic",
        "shirtNumber": 19,
        "position": "Anfallare",
        "distanceMeters": 3865,
        "maxSpeedKmh": 29.4,
        "minutesPlayed": 33,
        "metersPerMinute": 117.12
      },
      {
        "name": "Oliver Jordan Hagen",
        "shirtNumber": 15,
        "position": "Anfallare",
        "distanceMeters": 2776,
        "maxSpeedKmh": 31.15,
        "minutesPlayed": 22,
        "metersPerMinute": 126.18
      },
      {
        "name": "Oscar Steinke Brånby",
        "shirtNumber": 31,
        "position": "Back",
        "distanceMeters": 1899,
        "maxSpeedKmh": 29.64,
        "minutesPlayed": 14,
        "metersPerMinute": 135.64
      }
    ]
  },
  {
    "matchId": 6529853,
    "round": "Omgång 4",
    "date": "22 april 2026",
    "sourceUrl": "https://allsvenskan.se/matcher/2026/6529853/hammarby-mot-halmstads-bk",
    "homeTeam": "Hammarby",
    "awayTeam": "Halmstad",
    "hammarbyWasHome": true,
    "matchDurationMinutes": 98,
    "hammarbyTeamDistanceMeters": 126740,
    "hammarbyTeamMinutes": 1077,
    "hammarbyTopSpeedKmh": 32.63,
    "players": [
      {
        "name": "Hampus Skoglund",
        "shirtNumber": 2,
        "position": "Back",
        "distanceMeters": 13024,
        "maxSpeedKmh": 32.63,
        "minutesPlayed": 98,
        "metersPerMinute": 132.9
      },
      {
        "name": "Noah Persson",
        "shirtNumber": 16,
        "position": "Anfallare",
        "distanceMeters": 13023,
        "maxSpeedKmh": 30.41,
        "minutesPlayed": 98,
        "metersPerMinute": 132.89
      },
      {
        "name": "Markus Karlsson",
        "shirtNumber": 8,
        "position": "Mittfältare",
        "distanceMeters": 12696,
        "maxSpeedKmh": 27.57,
        "minutesPlayed": 98,
        "metersPerMinute": 129.55
      },
      {
        "name": "Paulos Abraham",
        "shirtNumber": 7,
        "position": "Anfallare",
        "distanceMeters": 12150,
        "maxSpeedKmh": 29.1,
        "minutesPlayed": 89,
        "metersPerMinute": 136.52
      },
      {
        "name": "Frederik Winther",
        "shirtNumber": 3,
        "position": "Back",
        "distanceMeters": 12120,
        "maxSpeedKmh": 29.96,
        "minutesPlayed": 98,
        "metersPerMinute": 123.67
      },
      {
        "name": "Victor Eriksson",
        "shirtNumber": 4,
        "position": "Back",
        "distanceMeters": 11223,
        "maxSpeedKmh": 30.8,
        "minutesPlayed": 98,
        "metersPerMinute": 114.52
      },
      {
        "name": "Nahir Besara",
        "shirtNumber": 20,
        "position": "Mittfältare",
        "distanceMeters": 10235,
        "maxSpeedKmh": 28.14,
        "minutesPlayed": 89,
        "metersPerMinute": 115
      },
      {
        "name": "Victor Lind",
        "shirtNumber": 9,
        "position": "Anfallare",
        "distanceMeters": 8692,
        "maxSpeedKmh": 31.27,
        "minutesPlayed": 71,
        "metersPerMinute": 122.42
      },
      {
        "name": "Oscar Johansson",
        "shirtNumber": 11,
        "position": "Mittfältare",
        "distanceMeters": 8083,
        "maxSpeedKmh": 29.37,
        "minutesPlayed": 59,
        "metersPerMinute": 137
      },
      {
        "name": "Oliver Jordan Hagen",
        "shirtNumber": 15,
        "position": "Anfallare",
        "distanceMeters": 6795,
        "maxSpeedKmh": 32.32,
        "minutesPlayed": 59,
        "metersPerMinute": 115.17
      },
      {
        "name": "Warner Hahn",
        "shirtNumber": 1,
        "position": "Målvakt",
        "distanceMeters": 4760,
        "maxSpeedKmh": 23.62,
        "minutesPlayed": 98,
        "metersPerMinute": 48.57
      },
      {
        "name": "Frank Junior Adjei",
        "shirtNumber": 28,
        "position": "Mittfältare",
        "distanceMeters": 4354,
        "maxSpeedKmh": 31.72,
        "minutesPlayed": 39,
        "metersPerMinute": 111.64
      },
      {
        "name": "Montader Madjed",
        "shirtNumber": 26,
        "position": "Anfallare",
        "distanceMeters": 4110,
        "maxSpeedKmh": 28.02,
        "minutesPlayed": 39,
        "metersPerMinute": 105.38
      },
      {
        "name": "Nikola Vasic",
        "shirtNumber": 19,
        "position": "Anfallare",
        "distanceMeters": 3291,
        "maxSpeedKmh": 28.77,
        "minutesPlayed": 26,
        "metersPerMinute": 126.58
      },
      {
        "name": "Wilson Lindberg",
        "shirtNumber": 22,
        "position": "Mittfältare",
        "distanceMeters": 1169,
        "maxSpeedKmh": 25.45,
        "minutesPlayed": 9,
        "metersPerMinute": 129.89
      },
      {
        "name": "Oscar Steinke Brånby",
        "shirtNumber": 31,
        "position": "Back",
        "distanceMeters": 1015,
        "maxSpeedKmh": 28.34,
        "minutesPlayed": 9,
        "metersPerMinute": 112.78
      }
    ]
  },
  {
    "matchId": 6529862,
    "round": "Omgång 5",
    "date": "26 april 2026",
    "sourceUrl": "https://allsvenskan.se/matcher/2026/6529862/djurgardens-if-mot-hammarby",
    "homeTeam": "Djurgården",
    "awayTeam": "Hammarby",
    "hammarbyWasHome": false,
    "matchDurationMinutes": 100,
    "hammarbyTeamDistanceMeters": 124216,
    "hammarbyTeamMinutes": 1099,
    "hammarbyTopSpeedKmh": 33.58,
    "players": [
      {
        "name": "Paulos Abraham",
        "shirtNumber": 7,
        "position": "Anfallare",
        "distanceMeters": 13499,
        "maxSpeedKmh": 30.12,
        "minutesPlayed": 100,
        "metersPerMinute": 134.99
      },
      {
        "name": "Oscar Johansson",
        "shirtNumber": 11,
        "position": "Mittfältare",
        "distanceMeters": 12845,
        "maxSpeedKmh": 30.7,
        "minutesPlayed": 99,
        "metersPerMinute": 129.75
      },
      {
        "name": "Hampus Skoglund",
        "shirtNumber": 2,
        "position": "Back",
        "distanceMeters": 12468,
        "maxSpeedKmh": 30.29,
        "minutesPlayed": 100,
        "metersPerMinute": 124.68
      },
      {
        "name": "Markus Karlsson",
        "shirtNumber": 8,
        "position": "Mittfältare",
        "distanceMeters": 12327,
        "maxSpeedKmh": 28.57,
        "minutesPlayed": 100,
        "metersPerMinute": 123.27
      },
      {
        "name": "Frederik Winther",
        "shirtNumber": 3,
        "position": "Back",
        "distanceMeters": 11918,
        "maxSpeedKmh": 30.78,
        "minutesPlayed": 100,
        "metersPerMinute": 119.18
      },
      {
        "name": "Ibrahima Fofana",
        "shirtNumber": 6,
        "position": "Mittfältare",
        "distanceMeters": 11764,
        "maxSpeedKmh": 30.79,
        "minutesPlayed": 100,
        "metersPerMinute": 117.64
      },
      {
        "name": "Nahir Besara",
        "shirtNumber": 20,
        "position": "Mittfältare",
        "distanceMeters": 10906,
        "maxSpeedKmh": 28.18,
        "minutesPlayed": 100,
        "metersPerMinute": 109.06
      },
      {
        "name": "Victor Eriksson",
        "shirtNumber": 4,
        "position": "Back",
        "distanceMeters": 10720,
        "maxSpeedKmh": 33.58,
        "minutesPlayed": 100,
        "metersPerMinute": 107.2
      },
      {
        "name": "Victor Lind",
        "shirtNumber": 9,
        "position": "Anfallare",
        "distanceMeters": 8790,
        "maxSpeedKmh": 30.86,
        "minutesPlayed": 70,
        "metersPerMinute": 125.57
      },
      {
        "name": "Montader Madjed",
        "shirtNumber": 26,
        "position": "Anfallare",
        "distanceMeters": 8467,
        "maxSpeedKmh": 27.97,
        "minutesPlayed": 84,
        "metersPerMinute": 100.8
      },
      {
        "name": "Warner Hahn",
        "shirtNumber": 1,
        "position": "Målvakt",
        "distanceMeters": 5107,
        "maxSpeedKmh": 25.36,
        "minutesPlayed": 100,
        "metersPerMinute": 51.07
      },
      {
        "name": "Noah Persson",
        "shirtNumber": 16,
        "position": "Anfallare",
        "distanceMeters": 3390,
        "maxSpeedKmh": 30.17,
        "minutesPlayed": 29,
        "metersPerMinute": 116.9
      },
      {
        "name": "Oliver Jordan Hagen",
        "shirtNumber": 15,
        "position": "Anfallare",
        "distanceMeters": 1938,
        "maxSpeedKmh": 28.74,
        "minutesPlayed": 16,
        "metersPerMinute": 121.13
      },
      {
        "name": "Frank Junior Adjei",
        "shirtNumber": 28,
        "position": "Mittfältare",
        "distanceMeters": 77,
        "maxSpeedKmh": 13.9,
        "minutesPlayed": 1,
        "metersPerMinute": 77
      }
    ]
  },
  {
    "matchId": 6529870,
    "round": "Omgång 6",
    "date": "3 maj 2026",
    "sourceUrl": "https://allsvenskan.se/matcher/2026/6529870/hammarby-mot-vasteras-sk",
    "homeTeam": "Hammarby",
    "awayTeam": "Västerås SK",
    "hammarbyWasHome": true,
    "matchDurationMinutes": 96,
    "hammarbyTeamDistanceMeters": 118960,
    "hammarbyTeamMinutes": 1048,
    "hammarbyTopSpeedKmh": 33.3,
    "players": [
      {
        "name": "Paulos Abraham",
        "shirtNumber": 7,
        "position": "Anfallare",
        "distanceMeters": 12412,
        "maxSpeedKmh": 30.81,
        "minutesPlayed": 88,
        "metersPerMinute": 141.05
      },
      {
        "name": "Frederik Winther",
        "shirtNumber": 3,
        "position": "Back",
        "distanceMeters": 12269,
        "maxSpeedKmh": 28.68,
        "minutesPlayed": 96,
        "metersPerMinute": 127.8
      },
      {
        "name": "Hampus Skoglund",
        "shirtNumber": 2,
        "position": "Back",
        "distanceMeters": 12012,
        "maxSpeedKmh": 30.83,
        "minutesPlayed": 96,
        "metersPerMinute": 125.12
      },
      {
        "name": "Markus Karlsson",
        "shirtNumber": 8,
        "position": "Mittfältare",
        "distanceMeters": 11887,
        "maxSpeedKmh": 28.32,
        "minutesPlayed": 88,
        "metersPerMinute": 135.08
      },
      {
        "name": "Frank Junior Adjei",
        "shirtNumber": 28,
        "position": "Mittfältare",
        "distanceMeters": 11782,
        "maxSpeedKmh": 33.3,
        "minutesPlayed": 96,
        "metersPerMinute": 122.73
      },
      {
        "name": "Ibrahima Fofana",
        "shirtNumber": 17,
        "position": "Mittfältare",
        "distanceMeters": 11698,
        "maxSpeedKmh": 31.02,
        "minutesPlayed": 96,
        "metersPerMinute": 121.85
      },
      {
        "name": "Victor Eriksson",
        "shirtNumber": 4,
        "position": "Back",
        "distanceMeters": 10124,
        "maxSpeedKmh": 30.34,
        "minutesPlayed": 96,
        "metersPerMinute": 105.46
      },
      {
        "name": "Victor Lind",
        "shirtNumber": 9,
        "position": "Anfallare",
        "distanceMeters": 9859,
        "maxSpeedKmh": 32.48,
        "minutesPlayed": 96,
        "metersPerMinute": 102.7
      },
      {
        "name": "Montader Madjed",
        "shirtNumber": 26,
        "position": "Anfallare",
        "distanceMeters": 9348,
        "maxSpeedKmh": 32.38,
        "minutesPlayed": 91,
        "metersPerMinute": 102.73
      },
      {
        "name": "Nahir Besara",
        "shirtNumber": 20,
        "position": "Mittfältare",
        "distanceMeters": 9267,
        "maxSpeedKmh": 26.64,
        "minutesPlayed": 79,
        "metersPerMinute": 117.3
      },
      {
        "name": "Warner Hahn",
        "shirtNumber": 1,
        "position": "Målvakt",
        "distanceMeters": 4643,
        "maxSpeedKmh": 18.48,
        "minutesPlayed": 96,
        "metersPerMinute": 48.36
      },
      {
        "name": "Noah Persson",
        "shirtNumber": 16,
        "position": "Anfallare",
        "distanceMeters": 2002,
        "maxSpeedKmh": 28.22,
        "minutesPlayed": 17,
        "metersPerMinute": 117.76
      },
      {
        "name": "Nikola Vasic",
        "shirtNumber": 19,
        "position": "Anfallare",
        "distanceMeters": 995,
        "maxSpeedKmh": 24.81,
        "minutesPlayed": 8,
        "metersPerMinute": 124.38
      },
      {
        "name": "Dennis Collander",
        "shirtNumber": 14,
        "position": "Mittfältare",
        "distanceMeters": 662,
        "maxSpeedKmh": 32.69,
        "minutesPlayed": 5,
        "metersPerMinute": 132.4
      }
    ]
  },
  {
    "matchId": 6529878,
    "round": "Omgång 7",
    "date": "9 maj 2026",
    "sourceUrl": "https://allsvenskan.se/matcher/2026/6529878/ifk-goteborg-mot-hammarby",
    "homeTeam": "IFK Göteborg",
    "awayTeam": "Hammarby",
    "hammarbyWasHome": false,
    "matchDurationMinutes": 97.4,
    "hammarbyTeamDistanceMeters": 122727,
    "hammarbyTeamMinutes": 1071.4,
    "hammarbyTopSpeedKmh": 33.25,
    "players": [
      {
        "name": "Markus Karlsson",
        "shirtNumber": 8,
        "position": "Mittfältare",
        "distanceMeters": 12811,
        "maxSpeedKmh": 30.5,
        "minutesPlayed": 97.4,
        "metersPerMinute": 131.53
      },
      {
        "name": "Hampus Skoglund",
        "shirtNumber": 2,
        "position": "Back",
        "distanceMeters": 12266,
        "maxSpeedKmh": 30.57,
        "minutesPlayed": 97.4,
        "metersPerMinute": 125.93
      },
      {
        "name": "Frank Junior Adjei",
        "shirtNumber": 28,
        "position": "Mittfältare",
        "distanceMeters": 12201,
        "maxSpeedKmh": 31.08,
        "minutesPlayed": 97.4,
        "metersPerMinute": 125.27
      },
      {
        "name": "Frederik Winther",
        "shirtNumber": 3,
        "position": "Back",
        "distanceMeters": 11223,
        "maxSpeedKmh": 30.84,
        "minutesPlayed": 97.4,
        "metersPerMinute": 115.23
      },
      {
        "name": "Victor Eriksson",
        "shirtNumber": 4,
        "position": "Back",
        "distanceMeters": 10798,
        "maxSpeedKmh": 33.25,
        "minutesPlayed": 97.4,
        "metersPerMinute": 110.86
      },
      {
        "name": "Noah Persson",
        "shirtNumber": 16,
        "position": "Anfallare",
        "distanceMeters": 10228,
        "maxSpeedKmh": 28.65,
        "minutesPlayed": 81.53,
        "metersPerMinute": 125.45
      },
      {
        "name": "Victor Lind",
        "shirtNumber": 9,
        "position": "Anfallare",
        "distanceMeters": 9096,
        "maxSpeedKmh": 30.43,
        "minutesPlayed": 73.15,
        "metersPerMinute": 124.35
      },
      {
        "name": "Nahir Besara",
        "shirtNumber": 20,
        "position": "Mittfältare",
        "distanceMeters": 8585,
        "maxSpeedKmh": 29.79,
        "minutesPlayed": 73.17,
        "metersPerMinute": 117.33
      },
      {
        "name": "Paulos Abraham",
        "shirtNumber": 7,
        "position": "Anfallare",
        "distanceMeters": 8488,
        "maxSpeedKmh": 29.35,
        "minutesPlayed": 60.43,
        "metersPerMinute": 140.46
      },
      {
        "name": "Montader Madjed",
        "shirtNumber": 26,
        "position": "Anfallare",
        "distanceMeters": 8388,
        "maxSpeedKmh": 30.27,
        "minutesPlayed": 81.65,
        "metersPerMinute": 102.73
      },
      {
        "name": "Warner Hahn",
        "shirtNumber": 1,
        "position": "Målvakt",
        "distanceMeters": 4849,
        "maxSpeedKmh": 23.14,
        "minutesPlayed": 97.4,
        "metersPerMinute": 49.78
      },
      {
        "name": "Nikola Vasic",
        "shirtNumber": 19,
        "position": "Anfallare",
        "distanceMeters": 4483,
        "maxSpeedKmh": 30.46,
        "minutesPlayed": 36.97,
        "metersPerMinute": 121.26
      },
      {
        "name": "Oscar Johansson",
        "shirtNumber": 11,
        "position": "Mittfältare",
        "distanceMeters": 2997,
        "maxSpeedKmh": 31.63,
        "minutesPlayed": 24.23,
        "metersPerMinute": 123.69
      },
      {
        "name": "Oscar Steinke Brånby",
        "shirtNumber": 31,
        "position": "Back",
        "distanceMeters": 2717,
        "maxSpeedKmh": 32.75,
        "minutesPlayed": 24.25,
        "metersPerMinute": 112.04
      },
      {
        "name": "Oliver Jordan Hagen",
        "shirtNumber": 15,
        "position": "Anfallare",
        "distanceMeters": 1881,
        "maxSpeedKmh": 28.59,
        "minutesPlayed": 15.75,
        "metersPerMinute": 119.43
      },
      {
        "name": "Ibrahima Fofana",
        "shirtNumber": 17,
        "position": "Mittfältare",
        "distanceMeters": 1716,
        "maxSpeedKmh": 31.39,
        "minutesPlayed": 15.87,
        "metersPerMinute": 108.13
      }
    ]
  },
  {
    "matchId": 6529886,
    "round": "Omgång 8",
    "date": "17 maj 2026",
    "sourceUrl": "https://allsvenskan.se/matcher/2026/6529886/hammarby-mot-malmo-ff",
    "homeTeam": "Hammarby",
    "awayTeam": "Malmö FF",
    "hammarbyWasHome": true,
    "matchDurationMinutes": 94,
    "hammarbyTeamDistanceMeters": 123291,
    "hammarbyTeamMinutes": 1034,
    "hammarbyTopSpeedKmh": 33.03,
    "players": [
      {
        "name": "Markus Karlsson",
        "shirtNumber": 8,
        "position": "Mittfältare",
        "distanceMeters": 12873,
        "maxSpeedKmh": 31.8,
        "minutesPlayed": 94,
        "metersPerMinute": 136.95
      },
      {
        "name": "Hampus Skoglund",
        "shirtNumber": 2,
        "position": "Back",
        "distanceMeters": 12347,
        "maxSpeedKmh": 31.15,
        "minutesPlayed": 94,
        "metersPerMinute": 131.35
      },
      {
        "name": "Frederik Winther",
        "shirtNumber": 3,
        "position": "Back",
        "distanceMeters": 11643,
        "maxSpeedKmh": 30.76,
        "minutesPlayed": 94,
        "metersPerMinute": 123.86
      },
      {
        "name": "Nahir Besara",
        "shirtNumber": 20,
        "position": "Mittfältare",
        "distanceMeters": 11402,
        "maxSpeedKmh": 26.84,
        "minutesPlayed": 94,
        "metersPerMinute": 121.3
      },
      {
        "name": "Victor Eriksson",
        "shirtNumber": 4,
        "position": "Back",
        "distanceMeters": 10574,
        "maxSpeedKmh": 32.8,
        "minutesPlayed": 94,
        "metersPerMinute": 112.49
      },
      {
        "name": "Montader Madjed",
        "shirtNumber": 26,
        "position": "Anfallare",
        "distanceMeters": 9125,
        "maxSpeedKmh": 32.78,
        "minutesPlayed": 81,
        "metersPerMinute": 112.65
      },
      {
        "name": "Noah Persson",
        "shirtNumber": 16,
        "position": "Anfallare",
        "distanceMeters": 9023,
        "maxSpeedKmh": 33.03,
        "minutesPlayed": 70,
        "metersPerMinute": 128.9
      },
      {
        "name": "Paulos Abraham",
        "shirtNumber": 7,
        "position": "Anfallare",
        "distanceMeters": 8867,
        "maxSpeedKmh": 30.41,
        "minutesPlayed": 63,
        "metersPerMinute": 140.75
      },
      {
        "name": "Frank Junior Adjei",
        "shirtNumber": 28,
        "position": "Mittfältare",
        "distanceMeters": 8856,
        "maxSpeedKmh": 32.29,
        "minutesPlayed": 70,
        "metersPerMinute": 126.51
      },
      {
        "name": "Tesfaldet Tekie",
        "shirtNumber": 5,
        "position": "Mittfältare",
        "distanceMeters": 8345,
        "maxSpeedKmh": 32.08,
        "minutesPlayed": 63,
        "metersPerMinute": 132.46
      },
      {
        "name": "Warner Hahn",
        "shirtNumber": 1,
        "position": "Målvakt",
        "distanceMeters": 4692,
        "maxSpeedKmh": 20.38,
        "minutesPlayed": 94,
        "metersPerMinute": 49.91
      },
      {
        "name": "Oscar Johansson",
        "shirtNumber": 11,
        "position": "Mittfältare",
        "distanceMeters": 4540,
        "maxSpeedKmh": 28.38,
        "minutesPlayed": 31,
        "metersPerMinute": 146.45
      },
      {
        "name": "Elohim Kabore",
        "shirtNumber": 29,
        "position": "Anfallare",
        "distanceMeters": 3946,
        "maxSpeedKmh": 30.61,
        "minutesPlayed": 31,
        "metersPerMinute": 127.29
      },
      {
        "name": "Victor Lind",
        "shirtNumber": 9,
        "position": "Anfallare",
        "distanceMeters": 3048,
        "maxSpeedKmh": 30.04,
        "minutesPlayed": 24,
        "metersPerMinute": 127
      },
      {
        "name": "Ibrahima Fofana",
        "shirtNumber": 6,
        "position": "Mittfältare",
        "distanceMeters": 2995,
        "maxSpeedKmh": 31.54,
        "minutesPlayed": 24,
        "metersPerMinute": 124.79
      },
      {
        "name": "Oliver Jordan Hagen",
        "shirtNumber": 15,
        "position": "Anfallare",
        "distanceMeters": 1534,
        "maxSpeedKmh": 25.57,
        "minutesPlayed": 13,
        "metersPerMinute": 118
      }
    ]
  },
  {
    "matchId": 6529894,
    "round": "Omgång 9",
    "date": "24 maj 2026",
    "sourceUrl": "https://allsvenskan.se/matcher/2026/6529894/hammarby-mot-aik",
    "homeTeam": "Hammarby",
    "awayTeam": "AIK",
    "hammarbyWasHome": true,
    "matchDurationMinutes": 102,
    "hammarbyTeamDistanceMeters": 120679,
    "hammarbyTeamMinutes": 1122,
    "hammarbyTopSpeedKmh": 33.6,
    "players": [
      {
        "name": "Paulos Abraham",
        "shirtNumber": 7,
        "position": "Anfallare",
        "distanceMeters": 12455,
        "maxSpeedKmh": 32.62,
        "minutesPlayed": 102,
        "metersPerMinute": 122.11
      },
      {
        "name": "Markus Karlsson",
        "shirtNumber": 8,
        "position": "Mittfältare",
        "distanceMeters": 12166,
        "maxSpeedKmh": 30.63,
        "minutesPlayed": 102,
        "metersPerMinute": 119.27
      },
      {
        "name": "Frederik Winther",
        "shirtNumber": 3,
        "position": "Back",
        "distanceMeters": 11782,
        "maxSpeedKmh": 29.72,
        "minutesPlayed": 102,
        "metersPerMinute": 115.51
      },
      {
        "name": "Ibrahima Fofana",
        "shirtNumber": 17,
        "position": "Mittfältare",
        "distanceMeters": 10998,
        "maxSpeedKmh": 31.62,
        "minutesPlayed": 102,
        "metersPerMinute": 107.82
      },
      {
        "name": "Nahir Besara",
        "shirtNumber": 20,
        "position": "Mittfältare",
        "distanceMeters": 10941,
        "maxSpeedKmh": 26.5,
        "minutesPlayed": 102,
        "metersPerMinute": 107.26
      },
      {
        "name": "Tesfaldet Tekie",
        "shirtNumber": 5,
        "position": "Mittfältare",
        "distanceMeters": 10514,
        "maxSpeedKmh": 30.54,
        "minutesPlayed": 88,
        "metersPerMinute": 119.48
      },
      {
        "name": "Oscar Johansson",
        "shirtNumber": 11,
        "position": "Mittfältare",
        "distanceMeters": 10513,
        "maxSpeedKmh": 33.6,
        "minutesPlayed": 83,
        "metersPerMinute": 126.66
      },
      {
        "name": "Victor Eriksson",
        "shirtNumber": 4,
        "position": "Back",
        "distanceMeters": 9589,
        "maxSpeedKmh": 29.39,
        "minutesPlayed": 88,
        "metersPerMinute": 108.97
      },
      {
        "name": "Noah Persson",
        "shirtNumber": 16,
        "position": "Anfallare",
        "distanceMeters": 8800,
        "maxSpeedKmh": 31.14,
        "minutesPlayed": 69,
        "metersPerMinute": 127.54
      },
      {
        "name": "Montader Madjed",
        "shirtNumber": 26,
        "position": "Anfallare",
        "distanceMeters": 8649,
        "maxSpeedKmh": 27.37,
        "minutesPlayed": 83,
        "metersPerMinute": 104.2
      },
      {
        "name": "Warner Hahn",
        "shirtNumber": 1,
        "position": "Målvakt",
        "distanceMeters": 5006,
        "maxSpeedKmh": 31.64,
        "minutesPlayed": 102,
        "metersPerMinute": 49.08
      },
      {
        "name": "Victor Lind",
        "shirtNumber": 9,
        "position": "Anfallare",
        "distanceMeters": 3016,
        "maxSpeedKmh": 29.9,
        "minutesPlayed": 33,
        "metersPerMinute": 91.39
      },
      {
        "name": "Wilson Lindberg",
        "shirtNumber": 22,
        "position": "Mittfältare",
        "distanceMeters": 2046,
        "maxSpeedKmh": 28.36,
        "minutesPlayed": 19,
        "metersPerMinute": 107.68
      },
      {
        "name": "Oliver Jordan Hagen",
        "shirtNumber": 15,
        "position": "Anfallare",
        "distanceMeters": 1814,
        "maxSpeedKmh": 29.69,
        "minutesPlayed": 19,
        "metersPerMinute": 95.47
      },
      {
        "name": "Nikola Vasic",
        "shirtNumber": 19,
        "position": "Anfallare",
        "distanceMeters": 1457,
        "maxSpeedKmh": 29.28,
        "minutesPlayed": 14,
        "metersPerMinute": 104.07
      },
      {
        "name": "Oscar Steinke Brånby",
        "shirtNumber": 31,
        "position": "Back",
        "distanceMeters": 1319,
        "maxSpeedKmh": 29.09,
        "minutesPlayed": 14,
        "metersPerMinute": 94.21
      }
    ]
  },
  {
    "matchId": 6529904,
    "round": "Omgång 10",
    "date": "31 maj 2026",
    "sourceUrl": "https://allsvenskan.se/matcher/2026/6529904/bk-hacken-mot-hammarby",
    "homeTeam": "Häcken",
    "awayTeam": "Hammarby",
    "hammarbyWasHome": false,
    "matchDurationMinutes": 99,
    "hammarbyTeamDistanceMeters": 122736,
    "hammarbyTeamMinutes": 1086,
    "hammarbyTopSpeedKmh": 33.62,
    "players": [
      {
        "name": "Markus Karlsson",
        "shirtNumber": 8,
        "position": "Mittfältare",
        "distanceMeters": 12502,
        "maxSpeedKmh": 33.03,
        "minutesPlayed": 99,
        "metersPerMinute": 126.28
      },
      {
        "name": "Paulos Abraham",
        "shirtNumber": 7,
        "position": "Anfallare",
        "distanceMeters": 12193,
        "maxSpeedKmh": 32.74,
        "minutesPlayed": 99,
        "metersPerMinute": 123.16
      },
      {
        "name": "Noah Persson",
        "shirtNumber": 16,
        "position": "Anfallare",
        "distanceMeters": 12098,
        "maxSpeedKmh": 33.62,
        "minutesPlayed": 99,
        "metersPerMinute": 122.2
      },
      {
        "name": "Hampus Skoglund",
        "shirtNumber": 2,
        "position": "Back",
        "distanceMeters": 11819,
        "maxSpeedKmh": 32.15,
        "minutesPlayed": 90,
        "metersPerMinute": 131.32
      },
      {
        "name": "Victor Lind",
        "shirtNumber": 9,
        "position": "Anfallare",
        "distanceMeters": 11712,
        "maxSpeedKmh": 30.66,
        "minutesPlayed": 99,
        "metersPerMinute": 118.3
      },
      {
        "name": "Frederik Winther",
        "shirtNumber": 3,
        "position": "Back",
        "distanceMeters": 11604,
        "maxSpeedKmh": 31.41,
        "minutesPlayed": 99,
        "metersPerMinute": 117.21
      },
      {
        "name": "Victor Eriksson",
        "shirtNumber": 4,
        "position": "Back",
        "distanceMeters": 10833,
        "maxSpeedKmh": 30.93,
        "minutesPlayed": 99,
        "metersPerMinute": 109.42
      },
      {
        "name": "Nahir Besara",
        "shirtNumber": 20,
        "position": "Mittfältare",
        "distanceMeters": 10744,
        "maxSpeedKmh": 26.69,
        "minutesPlayed": 91,
        "metersPerMinute": 118.07
      },
      {
        "name": "Tesfaldet Tekie",
        "shirtNumber": 5,
        "position": "Mittfältare",
        "distanceMeters": 8445,
        "maxSpeedKmh": 28.78,
        "minutesPlayed": 65,
        "metersPerMinute": 129.92
      },
      {
        "name": "Montader Madjed",
        "shirtNumber": 26,
        "position": "Anfallare",
        "distanceMeters": 8291,
        "maxSpeedKmh": 31.15,
        "minutesPlayed": 76,
        "metersPerMinute": 109.09
      },
      {
        "name": "Warner Hahn",
        "shirtNumber": 1,
        "position": "Målvakt",
        "distanceMeters": 4678,
        "maxSpeedKmh": 20.56,
        "minutesPlayed": 99,
        "metersPerMinute": 47.25
      },
      {
        "name": "Oscar Johansson",
        "shirtNumber": 11,
        "position": "Mittfältare",
        "distanceMeters": 3853,
        "maxSpeedKmh": 28.05,
        "minutesPlayed": 33,
        "metersPerMinute": 116.76
      },
      {
        "name": "Oliver Jordan Hagen",
        "shirtNumber": 15,
        "position": "Anfallare",
        "distanceMeters": 2323,
        "maxSpeedKmh": 32.19,
        "minutesPlayed": 22,
        "metersPerMinute": 105.59
      },
      {
        "name": "Dennis Collander",
        "shirtNumber": 14,
        "position": "Mittfältare",
        "distanceMeters": 1154,
        "maxSpeedKmh": 30.73,
        "minutesPlayed": 8,
        "metersPerMinute": 144.25
      },
      {
        "name": "Nikola Vasic",
        "shirtNumber": 19,
        "position": "Anfallare",
        "distanceMeters": 867,
        "maxSpeedKmh": 26.76,
        "minutesPlayed": 8,
        "metersPerMinute": 108.38
      }
    ]
  },
  {
    "matchId": 6529911,
    "round": "Omgång 11",
    "date": "5 juli 2026",
    "sourceUrl": "https://allsvenskan.se/matcher/2026/6529911/if-elfsborg-mot-hammarby",
    "homeTeam": "Elfsborg",
    "awayTeam": "Hammarby",
    "hammarbyWasHome": false,
    "matchDurationMinutes": 93,
    "hammarbyTeamDistanceMeters": 122871,
    "hammarbyTeamMinutes": 1024,
    "hammarbyTopSpeedKmh": 33.42,
    "players": [
      {
        "name": "Markus Karlsson",
        "shirtNumber": 8,
        "position": "Mittfältare",
        "distanceMeters": 13013,
        "maxSpeedKmh": 29,
        "minutesPlayed": 93,
        "metersPerMinute": 139.92
      },
      {
        "name": "Noah Persson",
        "shirtNumber": 16,
        "position": "Anfallare",
        "distanceMeters": 12124,
        "maxSpeedKmh": 29.46,
        "minutesPlayed": 93,
        "metersPerMinute": 130.37
      },
      {
        "name": "Tesfaldet Tekie",
        "shirtNumber": 5,
        "position": "Mittfältare",
        "distanceMeters": 12063,
        "maxSpeedKmh": 29.52,
        "minutesPlayed": 93,
        "metersPerMinute": 129.71
      },
      {
        "name": "Victor Lind",
        "shirtNumber": 9,
        "position": "Anfallare",
        "distanceMeters": 11713,
        "maxSpeedKmh": 33.42,
        "minutesPlayed": 93,
        "metersPerMinute": 125.95
      },
      {
        "name": "Paulos Abraham",
        "shirtNumber": 7,
        "position": "Anfallare",
        "distanceMeters": 11438,
        "maxSpeedKmh": 31.08,
        "minutesPlayed": 83,
        "metersPerMinute": 137.81
      },
      {
        "name": "Frederik Winther",
        "shirtNumber": 3,
        "position": "Back",
        "distanceMeters": 11407,
        "maxSpeedKmh": 27.88,
        "minutesPlayed": 93,
        "metersPerMinute": 122.66
      },
      {
        "name": "Victor Eriksson",
        "shirtNumber": 4,
        "position": "Back",
        "distanceMeters": 11232,
        "maxSpeedKmh": 29.21,
        "minutesPlayed": 93,
        "metersPerMinute": 120.77
      },
      {
        "name": "Hampus Skoglund",
        "shirtNumber": 2,
        "position": "Back",
        "distanceMeters": 10269,
        "maxSpeedKmh": 30.63,
        "minutesPlayed": 83,
        "metersPerMinute": 123.72
      },
      {
        "name": "Montader Madjed",
        "shirtNumber": 26,
        "position": "Anfallare",
        "distanceMeters": 9358,
        "maxSpeedKmh": 31.82,
        "minutesPlayed": 83,
        "metersPerMinute": 112.75
      },
      {
        "name": "Nahir Besara",
        "shirtNumber": 20,
        "position": "Mittfältare",
        "distanceMeters": 9083,
        "maxSpeedKmh": 30.76,
        "minutesPlayed": 75,
        "metersPerMinute": 121.11
      },
      {
        "name": "Warner Hahn",
        "shirtNumber": 1,
        "position": "Målvakt",
        "distanceMeters": 4188,
        "maxSpeedKmh": 17.66,
        "minutesPlayed": 93,
        "metersPerMinute": 45.03
      },
      {
        "name": "Oscar Johansson",
        "shirtNumber": 11,
        "position": "Mittfältare",
        "distanceMeters": 2744,
        "maxSpeedKmh": 27.19,
        "minutesPlayed": 19,
        "metersPerMinute": 144.42
      },
      {
        "name": "Elohim Kabore",
        "shirtNumber": 29,
        "position": "Anfallare",
        "distanceMeters": 1615,
        "maxSpeedKmh": 25.02,
        "minutesPlayed": 10,
        "metersPerMinute": 161.5
      },
      {
        "name": "Frank Junior Adjei",
        "shirtNumber": 28,
        "position": "Mittfältare",
        "distanceMeters": 1569,
        "maxSpeedKmh": 24.43,
        "minutesPlayed": 10,
        "metersPerMinute": 156.9
      },
      {
        "name": "Ibrahima Fofana",
        "shirtNumber": 17,
        "position": "Mittfältare",
        "distanceMeters": 1430,
        "maxSpeedKmh": 24.72,
        "minutesPlayed": 10,
        "metersPerMinute": 143
      }
    ]
  },
  {
    "matchId": 6529918,
    "round": "Omgång 12",
    "date": "12 juli 2026",
    "sourceUrl": "https://allsvenskan.se/matcher/2026/6529918/hammarby-mot-kalmar-ff",
    "homeTeam": "Hammarby",
    "awayTeam": "Kalmar FF",
    "hammarbyWasHome": true,
    "matchDurationMinutes": 93.73,
    "hammarbyTeamDistanceMeters": 130392,
    "hammarbyTeamMinutes": 1031.03,
    "hammarbyTopSpeedKmh": 34.26,
    "players": [
      {
        "name": "Markus Karlsson",
        "shirtNumber": 8,
        "position": "Mittfältare",
        "distanceMeters": 13933,
        "maxSpeedKmh": 34.01,
        "minutesPlayed": 93.73,
        "metersPerMinute": 148.65
      },
      {
        "name": "Noah Persson",
        "shirtNumber": 16,
        "position": "Anfallare",
        "distanceMeters": 12644,
        "maxSpeedKmh": 33.11,
        "minutesPlayed": 93.73,
        "metersPerMinute": 134.9
      },
      {
        "name": "Hampus Skoglund",
        "shirtNumber": 2,
        "position": "Back",
        "distanceMeters": 12418,
        "maxSpeedKmh": 32.08,
        "minutesPlayed": 93.73,
        "metersPerMinute": 132.49
      },
      {
        "name": "Victor Eriksson",
        "shirtNumber": 4,
        "position": "Back",
        "distanceMeters": 12168,
        "maxSpeedKmh": 32.67,
        "minutesPlayed": 93.73,
        "metersPerMinute": 129.82
      },
      {
        "name": "Frederik Winther",
        "shirtNumber": 3,
        "position": "Back",
        "distanceMeters": 12168,
        "maxSpeedKmh": 28.87,
        "minutesPlayed": 93.73,
        "metersPerMinute": 129.82
      },
      {
        "name": "Nahir Besara",
        "shirtNumber": 20,
        "position": "Mittfältare",
        "distanceMeters": 12004,
        "maxSpeedKmh": 29.66,
        "minutesPlayed": 93.73,
        "metersPerMinute": 128.07
      },
      {
        "name": "Paulos Abraham",
        "shirtNumber": 7,
        "position": "Anfallare",
        "distanceMeters": 11220,
        "maxSpeedKmh": 32.6,
        "minutesPlayed": 77.4,
        "metersPerMinute": 144.96
      },
      {
        "name": "Montader Madjed",
        "shirtNumber": 26,
        "position": "Anfallare",
        "distanceMeters": 9190,
        "maxSpeedKmh": 29.88,
        "minutesPlayed": 77.4,
        "metersPerMinute": 118.73
      },
      {
        "name": "Tesfaldet Tekie",
        "shirtNumber": 5,
        "position": "Mittfältare",
        "distanceMeters": 8712,
        "maxSpeedKmh": 26.6,
        "minutesPlayed": 62.5,
        "metersPerMinute": 139.39
      },
      {
        "name": "Victor Lind",
        "shirtNumber": 9,
        "position": "Anfallare",
        "distanceMeters": 8433,
        "maxSpeedKmh": 34.26,
        "minutesPlayed": 62.5,
        "metersPerMinute": 134.93
      },
      {
        "name": "Warner Hahn",
        "shirtNumber": 1,
        "position": "Målvakt",
        "distanceMeters": 4469,
        "maxSpeedKmh": 21.34,
        "minutesPlayed": 93.73,
        "metersPerMinute": 47.68
      },
      {
        "name": "Oscar Johansson",
        "shirtNumber": 11,
        "position": "Mittfältare",
        "distanceMeters": 4458,
        "maxSpeedKmh": 29.44,
        "minutesPlayed": 31.23,
        "metersPerMinute": 142.75
      },
      {
        "name": "Frank Junior Adjei",
        "shirtNumber": 28,
        "position": "Mittfältare",
        "distanceMeters": 4138,
        "maxSpeedKmh": 31.82,
        "minutesPlayed": 31.23,
        "metersPerMinute": 132.5
      },
      {
        "name": "Elohim Kabore",
        "shirtNumber": 29,
        "position": "Anfallare",
        "distanceMeters": 2322,
        "maxSpeedKmh": 32.26,
        "minutesPlayed": 16.33,
        "metersPerMinute": 142.19
      },
      {
        "name": "Oliver Jordan Hagen",
        "shirtNumber": 15,
        "position": "Anfallare",
        "distanceMeters": 2197,
        "maxSpeedKmh": 31.48,
        "minutesPlayed": 16.33,
        "metersPerMinute": 134.54
      }
    ]
  },
  {
    "matchId": 6529926,
    "round": "Omgång 13",
    "date": "19 juli 2026",
    "sourceUrl": "https://allsvenskan.se/matcher/2026/6529926/hammarby-mot-degerfors-if",
    "homeTeam": "Hammarby",
    "awayTeam": "Degerfors",
    "hammarbyWasHome": true,
    "matchDurationMinutes": 93.25,
    "hammarbyTeamDistanceMeters": 136388,
    "hammarbyTeamMinutes": 1025.75,
    "hammarbyTopSpeedKmh": 33.39,
    "players": [
      {
        "name": "Markus Karlsson",
        "shirtNumber": 8,
        "position": "Mittfältare",
        "distanceMeters": 14038,
        "maxSpeedKmh": 29.55,
        "minutesPlayed": 93.25,
        "metersPerMinute": 150.54
      },
      {
        "name": "Oscar Johansson",
        "shirtNumber": 11,
        "position": "Mittfältare",
        "distanceMeters": 13917,
        "maxSpeedKmh": 32.64,
        "minutesPlayed": 93.25,
        "metersPerMinute": 149.24
      },
      {
        "name": "Hampus Skoglund",
        "shirtNumber": 2,
        "position": "Back",
        "distanceMeters": 13068,
        "maxSpeedKmh": 30.97,
        "minutesPlayed": 93.25,
        "metersPerMinute": 140.14
      },
      {
        "name": "Ibrahima Fofana",
        "shirtNumber": 17,
        "position": "Mittfältare",
        "distanceMeters": 12948,
        "maxSpeedKmh": 33.39,
        "minutesPlayed": 93.25,
        "metersPerMinute": 138.85
      },
      {
        "name": "Noah Persson",
        "shirtNumber": 16,
        "position": "Anfallare",
        "distanceMeters": 12758,
        "maxSpeedKmh": 31.05,
        "minutesPlayed": 84.77,
        "metersPerMinute": 150.5
      },
      {
        "name": "Frederik Winther",
        "shirtNumber": 3,
        "position": "Back",
        "distanceMeters": 12111,
        "maxSpeedKmh": 29.68,
        "minutesPlayed": 84.77,
        "metersPerMinute": 142.88
      },
      {
        "name": "Montader Madjed",
        "shirtNumber": 26,
        "position": "Anfallare",
        "distanceMeters": 11904,
        "maxSpeedKmh": 30.06,
        "minutesPlayed": 93.25,
        "metersPerMinute": 127.66
      },
      {
        "name": "Paulos Abraham",
        "shirtNumber": 7,
        "position": "Anfallare",
        "distanceMeters": 11388,
        "maxSpeedKmh": 32.78,
        "minutesPlayed": 75.87,
        "metersPerMinute": 150.11
      },
      {
        "name": "Victor Lind",
        "shirtNumber": 9,
        "position": "Anfallare",
        "distanceMeters": 10505,
        "maxSpeedKmh": 31.26,
        "minutesPlayed": 75.87,
        "metersPerMinute": 138.46
      },
      {
        "name": "Nahir Besara",
        "shirtNumber": 20,
        "position": "Mittfältare",
        "distanceMeters": 8417,
        "maxSpeedKmh": 29.26,
        "minutesPlayed": 63.78,
        "metersPerMinute": 131.96
      },
      {
        "name": "Warner Hahn",
        "shirtNumber": 1,
        "position": "Målvakt",
        "distanceMeters": 4846,
        "maxSpeedKmh": 25.84,
        "minutesPlayed": 93.25,
        "metersPerMinute": 51.97
      },
      {
        "name": "Tesfaldet Tekie",
        "shirtNumber": 5,
        "position": "Mittfältare",
        "distanceMeters": 4713,
        "maxSpeedKmh": 33.05,
        "minutesPlayed": 29.47,
        "metersPerMinute": 159.89
      },
      {
        "name": "Frank Junior Adjei",
        "shirtNumber": 28,
        "position": "Mittfältare",
        "distanceMeters": 2565,
        "maxSpeedKmh": 27.73,
        "minutesPlayed": 17.38,
        "metersPerMinute": 147.58
      },
      {
        "name": "Elohim Kabore",
        "shirtNumber": 29,
        "position": "Anfallare",
        "distanceMeters": 2166,
        "maxSpeedKmh": 33.15,
        "minutesPlayed": 17.38,
        "metersPerMinute": 124.63
      },
      {
        "name": "Björn Hedlöf",
        "shirtNumber": 33,
        "position": "Back",
        "distanceMeters": 779,
        "maxSpeedKmh": 21.86,
        "minutesPlayed": 8.48,
        "metersPerMinute": 91.86
      },
      {
        "name": "Waylon Ramon Renecke",
        "shirtNumber": 24,
        "position": "Back",
        "distanceMeters": 765,
        "maxSpeedKmh": 24.09,
        "minutesPlayed": 8.48,
        "metersPerMinute": 90.21
      }
    ]
  },
  {
    "matchId": 6529936,
    "round": "Omgång 14",
    "date": "26 juli 2026",
    "sourceUrl": "https://allsvenskan.se/matcher/2026/6529936/if-brommapojkarna-mot-hammarby",
    "homeTeam": "Brommapojkarna",
    "awayTeam": "Hammarby",
    "hammarbyWasHome": false,
    "matchDurationMinutes": 94,
    "hammarbyTeamDistanceMeters": 122443,
    "hammarbyTeamMinutes": 1035,
    "hammarbyTopSpeedKmh": 32.86,
    "players": [
      {
        "name": "Markus Karlsson",
        "shirtNumber": 8,
        "position": "Mittfältare",
        "distanceMeters": 12690,
        "maxSpeedKmh": 28.18,
        "minutesPlayed": 94,
        "metersPerMinute": 135
      },
      {
        "name": "Hampus Skoglund",
        "shirtNumber": 2,
        "position": "Back",
        "distanceMeters": 11921,
        "maxSpeedKmh": 30.92,
        "minutesPlayed": 94,
        "metersPerMinute": 126.82
      },
      {
        "name": "Frederik Winther",
        "shirtNumber": 3,
        "position": "Back",
        "distanceMeters": 11714,
        "maxSpeedKmh": 31.36,
        "minutesPlayed": 94,
        "metersPerMinute": 124.62
      },
      {
        "name": "Victor Lind",
        "shirtNumber": 9,
        "position": "Anfallare",
        "distanceMeters": 11620,
        "maxSpeedKmh": 30.31,
        "minutesPlayed": 94,
        "metersPerMinute": 123.62
      },
      {
        "name": "Ibrahima Fofana",
        "shirtNumber": 6,
        "position": "Mittfältare",
        "distanceMeters": 11483,
        "maxSpeedKmh": 32.86,
        "minutesPlayed": 94,
        "metersPerMinute": 122.16
      },
      {
        "name": "Frank Junior Adjei",
        "shirtNumber": 28,
        "position": "Mittfältare",
        "distanceMeters": 10841,
        "maxSpeedKmh": 28.03,
        "minutesPlayed": 84,
        "metersPerMinute": 129.06
      },
      {
        "name": "Paulos Abraham",
        "shirtNumber": 7,
        "position": "Anfallare",
        "distanceMeters": 10111,
        "maxSpeedKmh": 31.92,
        "minutesPlayed": 76,
        "metersPerMinute": 133.04
      },
      {
        "name": "Montader Madjed",
        "shirtNumber": 26,
        "position": "Anfallare",
        "distanceMeters": 8992,
        "maxSpeedKmh": 31.24,
        "minutesPlayed": 84,
        "metersPerMinute": 107.05
      },
      {
        "name": "Waylon Ramon Renecke",
        "shirtNumber": 24,
        "position": "Back",
        "distanceMeters": 8150,
        "maxSpeedKmh": 28.45,
        "minutesPlayed": 62,
        "metersPerMinute": 131.45
      },
      {
        "name": "Tesfaldet Tekie",
        "shirtNumber": 5,
        "position": "Mittfältare",
        "distanceMeters": 8050,
        "maxSpeedKmh": 27.35,
        "minutesPlayed": 62,
        "metersPerMinute": 129.84
      },
      {
        "name": "Noah Persson",
        "shirtNumber": 16,
        "position": "Anfallare",
        "distanceMeters": 4336,
        "maxSpeedKmh": 31.76,
        "minutesPlayed": 32,
        "metersPerMinute": 135.5
      },
      {
        "name": "Warner Hahn",
        "shirtNumber": 1,
        "position": "Målvakt",
        "distanceMeters": 3966,
        "maxSpeedKmh": 22.18,
        "minutesPlayed": 94,
        "metersPerMinute": 42.19
      },
      {
        "name": "Nahir Besara",
        "shirtNumber": 20,
        "position": "Mittfältare",
        "distanceMeters": 3900,
        "maxSpeedKmh": 26.44,
        "minutesPlayed": 32,
        "metersPerMinute": 121.88
      },
      {
        "name": "Amin Boudri",
        "shirtNumber": 17,
        "position": "Anfallare",
        "distanceMeters": 2700,
        "maxSpeedKmh": 27.13,
        "minutesPlayed": 19,
        "metersPerMinute": 142.11
      },
      {
        "name": "Oscar Johansson",
        "shirtNumber": 11,
        "position": "Mittfältare",
        "distanceMeters": 1409,
        "maxSpeedKmh": 26.22,
        "minutesPlayed": 10,
        "metersPerMinute": 140.9
      },
      {
        "name": "Oliver Jordan Hagen",
        "shirtNumber": 15,
        "position": "Anfallare",
        "distanceMeters": 1278,
        "maxSpeedKmh": 27.11,
        "minutesPlayed": 10,
        "metersPerMinute": 127.8
      }
    ]
  },
  {
    "matchId": 6529944,
    "round": "Omgång 15",
    "date": "20 maj 2026",
    "sourceUrl": "https://allsvenskan.se/matcher/2026/6529944/gais-mot-hammarby",
    "homeTeam": "GAIS",
    "awayTeam": "Hammarby",
    "hammarbyWasHome": false,
    "matchDurationMinutes": 97,
    "hammarbyTeamDistanceMeters": 123427,
    "hammarbyTeamMinutes": 1046,
    "hammarbyTopSpeedKmh": 33.18,
    "players": [
      {
        "name": "Oscar Johansson",
        "shirtNumber": 11,
        "position": "Mittfältare",
        "distanceMeters": 13176,
        "maxSpeedKmh": 30.3,
        "minutesPlayed": 97,
        "metersPerMinute": 135.84
      },
      {
        "name": "Markus Karlsson",
        "shirtNumber": 8,
        "position": "Mittfältare",
        "distanceMeters": 12775,
        "maxSpeedKmh": 28.2,
        "minutesPlayed": 97,
        "metersPerMinute": 131.7
      },
      {
        "name": "Victor Lind",
        "shirtNumber": 9,
        "position": "Anfallare",
        "distanceMeters": 12108,
        "maxSpeedKmh": 31.78,
        "minutesPlayed": 97,
        "metersPerMinute": 124.82
      },
      {
        "name": "Ibrahima Fofana",
        "shirtNumber": 6,
        "position": "Mittfältare",
        "distanceMeters": 11621,
        "maxSpeedKmh": 31.02,
        "minutesPlayed": 97,
        "metersPerMinute": 119.8
      },
      {
        "name": "Paulos Abraham",
        "shirtNumber": 7,
        "position": "Anfallare",
        "distanceMeters": 11237,
        "maxSpeedKmh": 29.56,
        "minutesPlayed": 85,
        "metersPerMinute": 132.2
      },
      {
        "name": "Victor Eriksson",
        "shirtNumber": 4,
        "position": "Back",
        "distanceMeters": 11141,
        "maxSpeedKmh": 31.83,
        "minutesPlayed": 97,
        "metersPerMinute": 114.86
      },
      {
        "name": "Hampus Skoglund",
        "shirtNumber": 2,
        "position": "Back",
        "distanceMeters": 9440,
        "maxSpeedKmh": 33.18,
        "minutesPlayed": 73,
        "metersPerMinute": 129.32
      },
      {
        "name": "Frederik Winther",
        "shirtNumber": 3,
        "position": "Back",
        "distanceMeters": 9406,
        "maxSpeedKmh": 29.23,
        "minutesPlayed": 73,
        "metersPerMinute": 128.85
      },
      {
        "name": "Elohim Kabore",
        "shirtNumber": 29,
        "position": "Anfallare",
        "distanceMeters": 8949,
        "maxSpeedKmh": 28.44,
        "minutesPlayed": 65,
        "metersPerMinute": 137.68
      },
      {
        "name": "Montader Madjed",
        "shirtNumber": 26,
        "position": "Anfallare",
        "distanceMeters": 6555,
        "maxSpeedKmh": 30.49,
        "minutesPlayed": 65,
        "metersPerMinute": 100.85
      },
      {
        "name": "Warner Hahn",
        "shirtNumber": 1,
        "position": "Målvakt",
        "distanceMeters": 5595,
        "maxSpeedKmh": 24.39,
        "minutesPlayed": 97,
        "metersPerMinute": 57.68
      },
      {
        "name": "Nahir Besara",
        "shirtNumber": 20,
        "position": "Mittfältare",
        "distanceMeters": 3589,
        "maxSpeedKmh": 26.07,
        "minutesPlayed": 33,
        "metersPerMinute": 108.76
      },
      {
        "name": "Noah Persson",
        "shirtNumber": 16,
        "position": "Anfallare",
        "distanceMeters": 3084,
        "maxSpeedKmh": 29.48,
        "minutesPlayed": 25,
        "metersPerMinute": 123.36
      },
      {
        "name": "Oliver Jordan Hagen",
        "shirtNumber": 15,
        "position": "Anfallare",
        "distanceMeters": 2810,
        "maxSpeedKmh": 31.46,
        "minutesPlayed": 25,
        "metersPerMinute": 112.4
      },
      {
        "name": "Nikola Vasic",
        "shirtNumber": 19,
        "position": "Anfallare",
        "distanceMeters": 1369,
        "maxSpeedKmh": 27.14,
        "minutesPlayed": 12,
        "metersPerMinute": 114.08
      },
      {
        "name": "Frank Junior Adjei",
        "shirtNumber": 28,
        "position": "Mittfältare",
        "distanceMeters": 1065,
        "maxSpeedKmh": 28.35,
        "minutesPlayed": 8,
        "metersPerMinute": 133.13
      }
    ]
  },
  {
    "matchId": 6529949,
    "round": "Omgång 16",
    "date": "9 augusti 2026",
    "sourceUrl": "https://allsvenskan.se/matcher/2026/6529949/hammarby-mot-bk-hacken",
    "homeTeam": "Hammarby",
    "awayTeam": "Häcken",
    "hammarbyWasHome": true,
    "matchDurationMinutes": 95,
    "hammarbyTeamDistanceMeters": 122448,
    "hammarbyTeamMinutes": 1045,
    "hammarbyTopSpeedKmh": 34.16,
    "players": [
      {
        "name": "Markus Karlsson",
        "shirtNumber": 8,
        "position": "Mittfältare",
        "distanceMeters": 12755,
        "maxSpeedKmh": 28.76,
        "minutesPlayed": 95,
        "metersPerMinute": 134.26
      },
      {
        "name": "Paulos Abraham",
        "shirtNumber": 7,
        "position": "Anfallare",
        "distanceMeters": 11939,
        "maxSpeedKmh": 31.96,
        "minutesPlayed": 86,
        "metersPerMinute": 138.83
      },
      {
        "name": "Hampus Skoglund",
        "shirtNumber": 2,
        "position": "Back",
        "distanceMeters": 11924,
        "maxSpeedKmh": 30.21,
        "minutesPlayed": 95,
        "metersPerMinute": 125.52
      },
      {
        "name": "Frank Junior Adjei",
        "shirtNumber": 28,
        "position": "Mittfältare",
        "distanceMeters": 11723,
        "maxSpeedKmh": 32.56,
        "minutesPlayed": 95,
        "metersPerMinute": 123.4
      },
      {
        "name": "Ibrahima Fofana",
        "shirtNumber": 17,
        "position": "Mittfältare",
        "distanceMeters": 11326,
        "maxSpeedKmh": 33.93,
        "minutesPlayed": 95,
        "metersPerMinute": 119.22
      },
      {
        "name": "Waylon Ramon Renecke",
        "shirtNumber": 24,
        "position": "Back",
        "distanceMeters": 10990,
        "maxSpeedKmh": 34.05,
        "minutesPlayed": 95,
        "metersPerMinute": 115.68
      },
      {
        "name": "Noah Persson",
        "shirtNumber": 16,
        "position": "Anfallare",
        "distanceMeters": 9520,
        "maxSpeedKmh": 32.71,
        "minutesPlayed": 75,
        "metersPerMinute": 126.93
      },
      {
        "name": "Montader Madjed",
        "shirtNumber": 26,
        "position": "Anfallare",
        "distanceMeters": 8877,
        "maxSpeedKmh": 32.1,
        "minutesPlayed": 86,
        "metersPerMinute": 103.22
      },
      {
        "name": "Amin Boudri",
        "shirtNumber": 17,
        "position": "Anfallare",
        "distanceMeters": 8165,
        "maxSpeedKmh": 30.03,
        "minutesPlayed": 66,
        "metersPerMinute": 123.71
      },
      {
        "name": "Victor Lind",
        "shirtNumber": 9,
        "position": "Anfallare",
        "distanceMeters": 8073,
        "maxSpeedKmh": 34.16,
        "minutesPlayed": 66,
        "metersPerMinute": 122.32
      },
      {
        "name": "Warner Hahn",
        "shirtNumber": 1,
        "position": "Målvakt",
        "distanceMeters": 4821,
        "maxSpeedKmh": 20.78,
        "minutesPlayed": 95,
        "metersPerMinute": 50.75
      },
      {
        "name": "Oscar Johansson",
        "shirtNumber": 11,
        "position": "Mittfältare",
        "distanceMeters": 4015,
        "maxSpeedKmh": 28.57,
        "minutesPlayed": 29,
        "metersPerMinute": 138.45
      },
      {
        "name": "Tesfaldet Tekie",
        "shirtNumber": 5,
        "position": "Mittfältare",
        "distanceMeters": 3949,
        "maxSpeedKmh": 25.97,
        "minutesPlayed": 29,
        "metersPerMinute": 136.17
      },
      {
        "name": "Oscar Steinke Brånby",
        "shirtNumber": 31,
        "position": "Back",
        "distanceMeters": 2618,
        "maxSpeedKmh": 29.74,
        "minutesPlayed": 20,
        "metersPerMinute": 130.9
      },
      {
        "name": "Oliver Jordan Hagen",
        "shirtNumber": 15,
        "position": "Anfallare",
        "distanceMeters": 1263,
        "maxSpeedKmh": 27.51,
        "minutesPlayed": 9,
        "metersPerMinute": 140.33
      },
      {
        "name": "Suwaibou Kebbeh",
        "shirtNumber": 30,
        "position": "Anfallare",
        "distanceMeters": 1226,
        "maxSpeedKmh": 31.6,
        "minutesPlayed": 9,
        "metersPerMinute": 136.22
      }
    ]
  }
];
