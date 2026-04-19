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
  }
];
