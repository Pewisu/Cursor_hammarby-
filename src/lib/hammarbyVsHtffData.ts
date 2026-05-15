import type { SpiderComparisonAxis } from "@/lib/upcomingOpponentsData";

export interface ComparisonMetric {
  label: string;
  hammarbyValue: number;
  htffValue: number;
  unit: string;
  /** "higher" = higher is better, "lower" = lower is better */
  direction: "higher" | "lower";
  hammarbyRank?: string;
  htffRank?: string;
  note?: string;
}

export interface ComparisonCategory {
  id: string;
  title: string;
  description: string;
  hammarbyVerdict: string;
  htffVerdict: string;
  metrics: ComparisonMetric[];
}

export interface StyleAxis {
  label: string;
  hammarbyPosition: string;
  htffPosition: string;
  leftLabel: string;
  rightLabel: string;
  hammarbyScore: number;
  htffScore: number;
}

export const teamInfo = {
  hammarby: {
    name: "Hammarby",
    league: "Allsvenskan 2026",
    pointsPerMatch: 2.0,
    xPointsPerMatch: 1.95,
    goalsPerMatch: 2.43,
    oppGoalsPerMatch: 0.71,
    xgPerMatch: 2.09,
    oppXgPerMatch: 1.15,
    fieldTilt: 74,
    possession: 65,
    color: "#16a34a",
  },
  htff: {
    name: "Hammarby TFF",
    league: "Ettan Norra 2026",
    pointsPerMatch: 2.29,
    xPointsPerMatch: 2.16,
    goalsPerMatch: 2.71,
    oppGoalsPerMatch: 1.0,
    xgPerMatch: 2.37,
    oppXgPerMatch: 0.88,
    fieldTilt: 69,
    possession: 57,
    color: "#facc15",
  },
};

export const categories: ComparisonCategory[] = [
  {
    id: "defence",
    title: "Försvar",
    description:
      "Hammarbys höga press och defensiva intensitet jämfört med talanglagets ännu mer aggressiva pressprofil.",
    hammarbyVerdict:
      "Dominant i de flesta defensiva kategorier med ligaledande PPDA och opp. xT. Tillåter dock fler boxskott i förhållande till inträden.",
    htffVerdict:
      "Ännu högre defensiv höjd och bättre duellvinstprocent. Vinner fler bolldueller men spelar i en lägre liga.",
    metrics: [
      {
        label: "PPDA",
        hammarbyValue: 3.94,
        htffValue: 3.98,
        unit: "",
        direction: "lower",
        hammarbyRank: "1:a av 16",
        htffRank: "2:a av 32",
        note: "Nästan identisk pressintensitet – båda lagen tillhör de mest aggressiva i sina respektive ligor.",
      },
      {
        label: "Defensiv intensitet",
        hammarbyValue: 7.81,
        htffValue: 7.23,
        unit: "",
        direction: "higher",
        hammarbyRank: "1:a av 16",
        htffRank: "9:e av 32",
        note: "Hammarby har högre defensiv intensitet, men HTFF:s nivå är fortfarande bra.",
      },
      {
        label: "Defensiva dueller vunna",
        hammarbyValue: 67,
        htffValue: 70,
        unit: "%",
        direction: "higher",
        hammarbyRank: "3:a av 16",
        htffRank: "3:a av 32",
        note: "HTFF vinner fler av sina defensiva dueller – imponerande i en fysisk liga.",
      },
      {
        label: "Defensiv action-höjd",
        hammarbyValue: 45.45,
        htffValue: 47.85,
        unit: "m",
        direction: "higher",
        hammarbyRank: "1:a av 16",
        htffRank: "1:a av 32",
        note: "HTFF försvarar ännu högre upp på planen. Båda lagen är bäst i sin liga.",
      },
      {
        label: "Motståndarens passtempo",
        hammarbyValue: 18.64,
        htffValue: 17.93,
        unit: "",
        direction: "lower",
        hammarbyRank: "5:e av 16",
        htffRank: "12:e av 32",
        note: "HTFF sänker motståndarens tempo mer effektivt.",
      },
      {
        label: "Motståndarens possessions till sista tredjedelen",
        hammarbyValue: 27,
        htffValue: 25,
        unit: "%",
        direction: "lower",
        hammarbyRank: "1:a av 16",
        htffRank: "2:a av 32",
        note: "Båda lagen stänger ner motståndarens framryckning exceptionellt bra.",
      },
      {
        label: "Motståndarens sista tredjedel till box",
        hammarbyValue: 22,
        htffValue: 18,
        unit: "%",
        direction: "lower",
        hammarbyRank: "8:e av 16",
        htffRank: "13:e av 32",
        note: "HTFF är bättre på att stoppa motståndaren från att nå boxen.",
      },
      {
        label: "Motståndarens xT",
        hammarbyValue: 0.86,
        htffValue: 0.78,
        unit: "",
        direction: "lower",
        hammarbyRank: "1:a av 16",
        htffRank: "1:a av 32",
        note: "Båda lagen bäst i sin liga. HTFF tillåter ännu lägre expected threat.",
      },
    ],
  },
  {
    id: "defensive-transition",
    title: "Defensiv omställning",
    description:
      "Hur snabbt och effektivt lagen återerövrar bollen efter bolltapp.",
    hammarbyVerdict:
      "Utmärkt counterpress med snabb återerövring, men HTFF tar tillbaka bollen ännu snabbare.",
    htffVerdict:
      "Exceptionella recoveries inom 5 sekunder och extremt kort tid till defensiv aktion.",
    metrics: [
      {
        label: "Turnovers",
        hammarbyValue: 31.0,
        htffValue: 25.71,
        unit: "/match",
        direction: "lower",
        hammarbyRank: "5:e av 16",
        htffRank: "2:a av 32",
        note: "Hammarby tappar bollen oftare, men det beror delvis på mer aggressivt framåtspel.",
      },
      {
        label: "Turnover-linje (höjd)",
        hammarbyValue: 62.74,
        htffValue: 64.79,
        unit: "m",
        direction: "higher",
        hammarbyRank: "4:e av 16",
        htffRank: "4:e av 32",
        note: "HTFF tappar bollen högre upp – mer pressat motståndarbollinnehav.",
      },
      {
        label: "Recoveries inom 5 sekunder",
        hammarbyValue: 14,
        htffValue: 17,
        unit: "%",
        direction: "higher",
        hammarbyRank: "1:a av 16",
        htffRank: "1:a av 32",
        note: "HTFF utklassar i snabb bollåtereröring. Båda bäst i sina ligor.",
      },
      {
        label: "Tid till defensiv aktion",
        hammarbyValue: 5.52,
        htffValue: 5.0,
        unit: "s",
        direction: "lower",
        hammarbyRank: "5:e av 16",
        htffRank: "4:e av 32",
        note: "HTFF reagerar snabbare efter bolltapp.",
      },
      {
        label: "Tid till recovery",
        hammarbyValue: 8.2,
        htffValue: 7.26,
        unit: "s",
        direction: "lower",
        hammarbyRank: "1:a av 16",
        htffRank: "3:a av 32",
        note: "HTFF återerövrar snabbare, trots att Hammarby leder sin liga.",
      },
      {
        label: "Motståndarens xG inom 10s efter recovery",
        hammarbyValue: 0.17,
        htffValue: 0.11,
        unit: "",
        direction: "lower",
        hammarbyRank: "5:e av 16",
        htffRank: "7:e av 32",
        note: "HTFF släpper till lägre xG i omställningssituationer.",
      },
      {
        label: "Motståndarens xT inom 10s efter recovery",
        hammarbyValue: 0.56,
        htffValue: 0.44,
        unit: "",
        direction: "lower",
        hammarbyRank: "5:e av 16",
        htffRank: "2:a av 32",
        note: "HTFF begränsar motståndarens hot ytterligare i transition.",
      },
    ],
  },
  {
    id: "opp-chance-creation",
    title: "Motståndarens chansskapande",
    description:
      "Hur mycket motståndaren lyckas skapa – boxinträden, skott och xG mot.",
    hammarbyVerdict:
      "Tillåter få boxberöringar men släpper till högt box-till-skott. Insläppta mål är ligans lägsta.",
    htffVerdict:
      "Ännu starkare i att neka motståndaren chanser, med färre boxberöringar och skott emot.",
    metrics: [
      {
        label: "Motståndarens boxberöringar",
        hammarbyValue: 11.86,
        htffValue: 10.43,
        unit: "/match",
        direction: "lower",
        hammarbyRank: "1:a av 16",
        htffRank: "2:a av 32",
        note: "Båda lagen begränsar motståndaren extremt väl i boxen.",
      },
      {
        label: "Motståndarens box-till-skott",
        hammarbyValue: 80,
        htffValue: 74,
        unit: "%",
        direction: "lower",
        hammarbyRank: "16:e av 16",
        htffRank: "23:e av 32",
        note: "En svaghet hos båda – motståndare som väl tar sig in i boxen skjuter ofta.",
      },
      {
        label: "Motståndarens np-skott",
        hammarbyValue: 8.57,
        htffValue: 7.71,
        unit: "/match",
        direction: "lower",
        hammarbyRank: "2:a av 16",
        htffRank: "1:a av 32",
        note: "HTFF tillåter allra minst avslut i sin liga.",
      },
      {
        label: "Motståndarens högkvalitetsskott",
        hammarbyValue: 2.29,
        htffValue: 1.71,
        unit: "/match",
        direction: "lower",
        hammarbyRank: "4:e av 16",
        htffRank: "4:e av 32",
        note: "HTFF tillåter färre farliga skottlägen per match.",
      },
      {
        label: "Motståndarens np xG",
        hammarbyValue: 1.15,
        htffValue: 0.88,
        unit: "/match",
        direction: "lower",
        hammarbyRank: "5:e av 16",
        htffRank: "5:e av 32",
        note: "HTFF har signifikant lägre xG emot – starkare defensiv kvalitet.",
      },
      {
        label: "Motståndarens np-mål",
        hammarbyValue: 0.71,
        htffValue: 1.0,
        unit: "/match",
        direction: "lower",
        hammarbyRank: "1:a av 16",
        htffRank: "8:e av 32",
        note: "Trots lägre xG emot släpper HTFF in fler mål – Hammarby vinner i slutresultat.",
      },
      {
        label: "Motståndarens np xG per skott",
        hammarbyValue: 0.14,
        htffValue: 0.11,
        unit: "",
        direction: "lower",
        hammarbyRank: "16:e av 16",
        htffRank: "15:e av 32",
        note: "Hammarby tillåter hög kvalitet per skott – en potentiell sårbarhet.",
      },
    ],
  },
  {
    id: "attacking-transition",
    title: "Offensiv omställning",
    description:
      "Hur effektivt lagen utnyttjar bollåtererövring för att snabbt skapa hot.",
    hammarbyVerdict:
      "Fenomenal i att snabbt nå sista tredjedelen och boxen efter bollvinning.",
    htffVerdict:
      "Stark attackerande transition med högre xG per omställning men lägre totalt hotvolym.",
    metrics: [
      {
        label: "Recoveries",
        hammarbyValue: 40.43,
        htffValue: 35.29,
        unit: "/match",
        direction: "higher",
        hammarbyRank: "2:a av 16",
        htffRank: "3:a av 32",
        note: "Hammarby vinner tillbaka bollen oftare per match.",
      },
      {
        label: "Recovery-linje (höjd)",
        hammarbyValue: 43.68,
        htffValue: 44.46,
        unit: "m",
        direction: "higher",
        hammarbyRank: "2:a av 16",
        htffRank: "1:a av 32",
        note: "HTFF återerövrar bollen ännu högre upp – bättre startposition för omställningar.",
      },
      {
        label: "Possessions behållna efter 5s",
        hammarbyValue: 34.29,
        htffValue: 28.14,
        unit: "",
        direction: "higher",
        hammarbyRank: "1:a av 16",
        htffRank: "–",
        note: "Hammarby behåller bollen längre efter återerövring.",
      },
      {
        label: "Possessions behållna efter 5s",
        hammarbyValue: 85,
        htffValue: 79,
        unit: "%",
        direction: "higher",
        hammarbyRank: "1:a av 16",
        htffRank: "–",
        note: "Hammarby konverterar en högre andel bollvinster till riktiga anfall.",
      },
      {
        label: "Possessions till sista tredjedelen inom 10s",
        hammarbyValue: 14.57,
        htffValue: 12.43,
        unit: "/match",
        direction: "higher",
        hammarbyRank: "1:a av 16",
        htffRank: "–",
        note: "Hammarby når sista tredjedelen oftare efter bollåtererövring.",
      },
      {
        label: "Possessions till box inom 10s",
        hammarbyValue: 5.71,
        htffValue: 4.14,
        unit: "/match",
        direction: "higher",
        hammarbyRank: "1:a av 16",
        htffRank: "–",
        note: "Hammarby når boxen avsevärt oftare via omställningar.",
      },
      {
        label: "xG inom 10s efter recovery",
        hammarbyValue: 0.35,
        htffValue: 0.41,
        unit: "",
        direction: "higher",
        note: "HTFF skapar bättre skottlägen per omställning, trots lägre totalvolym.",
      },
      {
        label: "xT inom 10s efter recovery",
        hammarbyValue: 0.89,
        htffValue: 0.76,
        unit: "",
        direction: "higher",
        note: "Hammarby genererar mer expected threat per omställning totalt sett.",
      },
    ],
  },
  {
    id: "attack",
    title: "Anfall",
    description:
      "Bollinnehav, uppbyggnad, tempo och penetration mot sista tredjedelen.",
    hammarbyVerdict:
      "Dominant possessionskontroll med högst field tilt i serien. Spelar snabbare och med färre långa bollar.",
    htffVerdict:
      "Lägre bollinnehav men penetrerar sista tredjedelen med liknande frekvens. Använder fler långa bollar.",
    metrics: [
      {
        label: "Bollinnehav",
        hammarbyValue: 65,
        htffValue: 57,
        unit: "%",
        direction: "higher",
        note: "Hammarby dominerar bollinnehavet mer markant i sin liga.",
      },
      {
        label: "Field tilt",
        hammarbyValue: 74,
        htffValue: 69,
        unit: "%",
        direction: "higher",
        note: "Hammarby trycker motståndaren djupare – högre territorial dominans.",
      },
      {
        label: "Lång boll",
        hammarbyValue: 10,
        htffValue: 16,
        unit: "%",
        direction: "lower",
        note: "Hammarby föredrar korta passningar, HTFF spelar mer direkt med långa bollar.",
      },
      {
        label: "Passtempo",
        hammarbyValue: 19.22,
        htffValue: 17.25,
        unit: "",
        direction: "higher",
        note: "Hammarby spelar snabbare – högre passtempo i anfallsfasen.",
      },
      {
        label: "Possessions till sista tredjedelen",
        hammarbyValue: 43,
        htffValue: 44,
        unit: "%",
        direction: "higher",
        note: "Praktiskt taget lika effektiva på att nå sista tredjedelen.",
      },
      {
        label: "Sista tredjedelen till box",
        hammarbyValue: 25,
        htffValue: 24,
        unit: "%",
        direction: "higher",
        note: "Nästan identiskt – båda lagen konverterar inträden till sista tredjedelen väl.",
      },
      {
        label: "xT (expected threat)",
        hammarbyValue: 2.03,
        htffValue: 1.95,
        unit: "",
        direction: "higher",
        note: "Hammarby genererar marginellt mer expected threat per match.",
      },
    ],
  },
  {
    id: "chance-creation",
    title: "Chansskapande",
    description:
      "Skott, boxberöringar och kvaliteten på de chanser lagen skapar.",
    hammarbyVerdict:
      "Mest avslut i serien med hög volym, men lägre xG per skott – många chanser utifrån.",
    htffVerdict:
      "Färre avslut men högre xG per skott och fler högkvalitetschanser. Mer effektivt chansskapande.",
    metrics: [
      {
        label: "Boxberöringar",
        hammarbyValue: 27.57,
        htffValue: 31.71,
        unit: "/match",
        direction: "higher",
        note: "HTFF har fler beröringar i straffområdet per match – mer penetration.",
      },
      {
        label: "Box-till-skott",
        hammarbyValue: 70,
        htffValue: 65,
        unit: "%",
        direction: "higher",
        note: "Hammarby konverterar fler boxinträden till skott.",
      },
      {
        label: "np-skott",
        hammarbyValue: 20.57,
        htffValue: 17.71,
        unit: "/match",
        direction: "higher",
        note: "Hammarby skjuter mest i sin liga – imponerande avslutvolym.",
      },
      {
        label: "Högkvalitetsskott",
        hammarbyValue: 4.0,
        htffValue: 5.43,
        unit: "/match",
        direction: "higher",
        note: "HTFF skapar fler högkvalitativa skottlägen – bättre positioner i box.",
      },
      {
        label: "np xG",
        hammarbyValue: 2.09,
        htffValue: 2.37,
        unit: "/match",
        direction: "higher",
        note: "HTFF har högre förväntade mål per match – skapar bättre chanser.",
      },
      {
        label: "np-mål",
        hammarbyValue: 2.43,
        htffValue: 2.71,
        unit: "/match",
        direction: "higher",
        note: "HTFF gör fler mål per match – imponerande konvertering.",
      },
      {
        label: "np xG per skott",
        hammarbyValue: 0.1,
        htffValue: 0.14,
        unit: "",
        direction: "higher",
        note: "HTFF har 40% högre xG per skott – väljer lägen bättre.",
      },
    ],
  },
  {
    id: "style-details",
    title: "Spelstilsdetaljer",
    description:
      "Hur lagen bygger anfall, penetrerar och spelar sig in i straffområdet.",
    hammarbyVerdict:
      "Spelar kortare, mer possession-baserat med fler crossar. Lägre andel långa bollar.",
    htffVerdict:
      "Mer carries-fokuserat med fler boxinträden via bärande. Spelar mer direkt.",
    metrics: [
      {
        label: "Uppspel från målspark",
        hammarbyValue: 36,
        htffValue: 45,
        unit: "%",
        direction: "higher",
        note: "HTFF spelar kort från målspark oftare – väljer uppbyggnadsspel bakifrån.",
      },
      {
        label: "Framåtpassningar från mitttredjedelen",
        hammarbyValue: 61,
        htffValue: 61,
        unit: "%",
        direction: "higher",
        note: "Exakt samma – båda lagen spelar framåt lika ofta från mittfältet.",
      },
      {
        label: "Crossar per sista-tredjedels-possession",
        hammarbyValue: 0.37,
        htffValue: 0.26,
        unit: "",
        direction: "higher",
        note: "Hammarby crossar oftare – bredare anfallsprofil.",
      },
      {
        label: "Dribblingar per sista-tredjedels-possession",
        hammarbyValue: 0.43,
        htffValue: 0.38,
        unit: "",
        direction: "higher",
        note: "Hammarby dribblar marginellt mer, men båda lagen är aktiva.",
      },
      {
        label: "Boxinträden via crossar",
        hammarbyValue: 28,
        htffValue: 18,
        unit: "%",
        direction: "higher",
        note: "Hammarby når boxen via inlägg betydligt oftare.",
      },
      {
        label: "Boxinträden via carries",
        hammarbyValue: 19,
        htffValue: 25,
        unit: "%",
        direction: "higher",
        note: "HTFF bär sig in i boxen oftare – mer individuellt bärande spel.",
      },
      {
        label: "Skott från uthålliga attacker",
        hammarbyValue: 22,
        htffValue: 11,
        unit: "%",
        direction: "higher",
        note: "Hammarby skapar dubbelt så stor andel skott via uthålliga anfall.",
      },
      {
        label: "Skott från direkta attacker",
        hammarbyValue: 16,
        htffValue: 20,
        unit: "%",
        direction: "higher",
        note: "HTFF avslutar oftare direkt – snabbare omställningar till skott.",
      },
      {
        label: "Skott utanför boxen",
        hammarbyValue: 45,
        htffValue: 41,
        unit: "%",
        direction: "lower",
        note: "Hammarby skjuter oftare utifrån – HTFF har bättre positionsurval.",
      },
    ],
  },
  {
    id: "defensive-style",
    title: "Defensiv spelstil",
    description:
      "Presshöjd, foulprofil och aggressivitet i det defensiva arbetet.",
    hammarbyVerdict:
      "Högt press med mer måttfull fouling-profil jämfört med HTFF.",
    htffVerdict:
      "Ännu högre press med betydligt fler fouls i anfallshalvan och fler recoveries i sista tredjedelen.",
    metrics: [
      {
        label: "Sista-tredjedels-recoveries",
        hammarbyValue: 12,
        htffValue: 16,
        unit: "%",
        direction: "higher",
        note: "HTFF vinner tillbaka bollen i sista tredjedelen avsevärt oftare.",
      },
      {
        label: "Fouls i anfallshalvan",
        hammarbyValue: 68,
        htffValue: 84,
        unit: "%",
        direction: "higher",
        note: "HTFF fouler nästan uteslutande i anfallshalvan – extremt aggressiv presslinje.",
      },
    ],
  },
];

export const styleComparison: StyleAxis[] = [
  {
    label: "Försvarsstil",
    hammarbyPosition: "Högt press",
    htffPosition: "Högt press",
    leftLabel: "Lågt block",
    rightLabel: "Högt press",
    hammarbyScore: 85,
    htffScore: 90,
  },
  {
    label: "Defensiv omställning",
    hammarbyPosition: "Counterpress",
    htffPosition: "Counterpress",
    leftLabel: "Falla tillbaka",
    rightLabel: "Counterpress",
    hammarbyScore: 80,
    htffScore: 88,
  },
  {
    label: "Offensiv omställning",
    hammarbyPosition: "Blandad",
    htffPosition: "Mer kontrande",
    leftLabel: "Behålla boll",
    rightLabel: "Kontringsanfall",
    hammarbyScore: 45,
    htffScore: 60,
  },
  {
    label: "Anfallsuppbyggnad",
    hammarbyPosition: "Uppbyggnadsspel",
    htffPosition: "Mer direkt",
    leftLabel: "Långa bollar",
    rightLabel: "Uppbyggnad",
    hammarbyScore: 82,
    htffScore: 65,
  },
  {
    label: "Penetration i box",
    hammarbyPosition: "Balanserad",
    htffPosition: "Carries-dominant",
    leftLabel: "Inlägg",
    rightLabel: "Bollbärande",
    hammarbyScore: 45,
    htffScore: 72,
  },
  {
    label: "Chansskapande",
    hammarbyPosition: "Uthålligt",
    htffPosition: "Direkt",
    leftLabel: "Uthålligt",
    rightLabel: "Direkt",
    hammarbyScore: 35,
    htffScore: 65,
  },
  {
    label: "Utfall",
    hammarbyPosition: "Starkt",
    htffPosition: "Starkt",
    leftLabel: "Svagt",
    rightLabel: "Starkt",
    hammarbyScore: 80,
    htffScore: 85,
  },
];

export const spiderAxes: SpiderComparisonAxis[] = [
  {
    label: "PPDA (press)",
    hammarbyValue: "3,94",
    opponentValue: "3,98",
    hammarbyScore: 92,
    opponentScore: 91,
    note: "Nästan identisk pressintensitet – de mest aggressiva i respektive liga.",
  },
  {
    label: "Defensiv action-höjd",
    hammarbyValue: "45,45m",
    opponentValue: "47,85m",
    hammarbyScore: 82,
    opponentScore: 90,
    note: "HTFF försvarar ännu högre. Båda toppar sina ligor.",
  },
  {
    label: "Duellvinstprocent",
    hammarbyValue: "67%",
    opponentValue: "70%",
    hammarbyScore: 78,
    opponentScore: 85,
    note: "HTFF vinner fler dueller procentuellt.",
  },
  {
    label: "Recoveries inom 5s",
    hammarbyValue: "14%",
    opponentValue: "17%",
    hammarbyScore: 75,
    opponentScore: 90,
    note: "HTFF har klart snabbare bollåtereröring.",
  },
  {
    label: "Bollinnehav",
    hammarbyValue: "65%",
    opponentValue: "57%",
    hammarbyScore: 95,
    opponentScore: 72,
    note: "Hammarby dominerar possessionsstatistiken.",
  },
  {
    label: "Field tilt",
    hammarbyValue: "74%",
    opponentValue: "69%",
    hammarbyScore: 95,
    opponentScore: 82,
    note: "Hammarby trycker motståndaren djupare.",
  },
  {
    label: "np xG",
    hammarbyValue: "2,09",
    opponentValue: "2,37",
    hammarbyScore: 80,
    opponentScore: 90,
    note: "HTFF skapar bättre xG per match.",
  },
  {
    label: "np-skott",
    hammarbyValue: "20,57",
    opponentValue: "17,71",
    hammarbyScore: 92,
    opponentScore: 78,
    note: "Hammarby skjuter betydligt oftare.",
  },
  {
    label: "Högkvalitetsskott",
    hammarbyValue: "4,00",
    opponentValue: "5,43",
    hammarbyScore: 70,
    opponentScore: 92,
    note: "HTFF skapar fler farliga skottlägen per match.",
  },
  {
    label: "np-mål",
    hammarbyValue: "2,43",
    opponentValue: "2,71",
    hammarbyScore: 82,
    opponentScore: 90,
    note: "HTFF gör fler mål per match.",
  },
  {
    label: "Motståndarens xG",
    hammarbyValue: "1,15",
    opponentValue: "0,88",
    hammarbyScore: 72,
    opponentScore: 88,
    note: "HTFF tillåter lägre xG emot per match.",
  },
  {
    label: "xT (expected threat)",
    hammarbyValue: "2,03",
    opponentValue: "1,95",
    hammarbyScore: 85,
    opponentScore: 80,
    note: "Hammarby genererar marginellt mer expected threat.",
  },
];

export const summaryInsights = [
  {
    title: "Lika: Extremt högt press",
    body: "Båda lagen pressar med identisk intensitet (PPDA ~3,95) och är bland de mest aggressiva i sina respektive ligor. Hammarbys filosofi genomsyrar tydligt talanglaget.",
    tone: "emerald" as const,
  },
  {
    title: "HTFF bättre: Defensiv omställning",
    body: "HTFF återerövrar bollen snabbare (17% inom 5s vs 14%) och har kortare tid till defensiv aktion. Counterpressingen är ännu mer intensiv.",
    tone: "amber" as const,
  },
  {
    title: "Hammarby bättre: Possessionskontroll",
    body: "65% bollinnehav och 74% field tilt visar Hammarbys dominans i att kontrollera spelet via bollen. HTFF ligger på 57% och 69%.",
    tone: "emerald" as const,
  },
  {
    title: "HTFF bättre: Chansskapande kvalitet",
    body: "HTFF skapar högre xG per match (2,37 vs 2,09) och har 40% högre xG per skott – bättre skottlägen snarare än fler skott.",
    tone: "amber" as const,
  },
  {
    title: "Hammarby bättre: Insläppta mål",
    body: "Trots lägre xG emot för HTFF (0,88 vs 1,15) släpper Hammarby in färre faktiska mål (0,71 vs 1,00). Bättre målvaktsspel och/eller matchläsning.",
    tone: "emerald" as const,
  },
  {
    title: "Stilskillnad: Uppbyggnad vs Direkthet",
    body: "Hammarby bygger mer tålmodigt med lägre långbollsandel (10% vs 16%) och fler crossar. HTFF penetrerar boxen via carries (25% vs 19%) och spelar mer direkt.",
    tone: "blue" as const,
  },
];

export const glossary = [
  {
    term: "PPDA (Passes Per Defensive Action)",
    explanation:
      "Antal passningar motståndaren tillåts spela per defensiv aktion. Lägre = mer aggressiv press.",
  },
  {
    term: "xT (Expected Threat)",
    explanation:
      "Modell som mäter hur mycket ett lag ökar sannolikheten att göra mål genom bollrörelser.",
  },
  {
    term: "np xG (Non-Penalty Expected Goals)",
    explanation:
      "Förväntade mål exklusive straffar, baserat på skottläge och kvalitet.",
  },
  {
    term: "Field tilt",
    explanation:
      "Andel av matchens aktivitet som sker i motståndarens tredjedel. Högre = mer territorial dominans.",
  },
  {
    term: "Defensive action height",
    explanation:
      "Genomsnittlig höjd (i meter från eget mål) där laget gör defensiva aktioner.",
  },
  {
    term: "Recovery",
    explanation:
      "Situation där laget vinner tillbaka bollen efter att ha förlorat den.",
  },
  {
    term: "Turnover",
    explanation:
      "Bollförlust, antingen genom misslyckad passning, misslyckat mottagande eller dribbling.",
  },
  {
    term: "Counterpress",
    explanation:
      "Strategi att omedelbart pressa efter bolltapp för att snabbt återerövra bollen.",
  },
];
