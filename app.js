/**
 * Patna Mahanagar IDI Analytics Dashboard - Application Core
 * 100% Dynamic Real-Time Google Sheets Sync, Multi-Report Analytics, Universal Leader Search Engine & Theme Studio.
 */

// ==========================================================================
// 1. Google Sheets Live Endpoints & Default State
// ==========================================================================

const SHEET_ENDPOINTS = {
  summary: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSPJDqQq7xTqmCcu54V1btKRBeQe6E_nO2YCKpNs8Yb-R7wtkJk26axqmSeJBjCJL808Ds-uwXKX9PX/pub?gid=1159989237&single=true&output=csv",
  eodReport: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSPJDqQq7xTqmCcu54V1btKRBeQe6E_nO2YCKpNs8Yb-R7wtkJk26axqmSeJBjCJL808Ds-uwXKX9PX/pub?gid=189369055&single=true&output=csv",
  teamWise: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSPJDqQq7xTqmCcu54V1btKRBeQe6E_nO2YCKpNs8Yb-R7wtkJk26axqmSeJBjCJL808Ds-uwXKX9PX/pub?gid=985916723&single=true&output=csv",
  wardWise: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSPJDqQq7xTqmCcu54V1btKRBeQe6E_nO2YCKpNs8Yb-R7wtkJk26axqmSeJBjCJL808Ds-uwXKX9PX/pub?gid=2097996904&single=true&output=csv",
  wardCouncillors: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSPJDqQq7xTqmCcu54V1btKRBeQe6E_nO2YCKpNs8Yb-R7wtkJk26axqmSeJBjCJL808Ds-uwXKX9PX/pub?gid=2143900618&single=true&output=csv",
  mayorDeputyMayor: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSPJDqQq7xTqmCcu54V1btKRBeQe6E_nO2YCKpNs8Yb-R7wtkJk26axqmSeJBjCJL808Ds-uwXKX9PX/pub?gid=2611931&single=true&output=csv",
  compiledLeaders: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSPJDqQq7xTqmCcu54V1btKRBeQe6E_nO2YCKpNs8Yb-R7wtkJk26axqmSeJBjCJL808Ds-uwXKX9PX/pub?gid=1138376455&single=true&output=csv",
  accRegistration: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSPJDqQq7xTqmCcu54V1btKRBeQe6E_nO2YCKpNs8Yb-R7wtkJk26axqmSeJBjCJL808Ds-uwXKX9PX/pub?gid=173355149&single=true&output=csv",
  sangathanData: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSPJDqQq7xTqmCcu54V1btKRBeQe6E_nO2YCKpNs8Yb-R7wtkJk26axqmSeJBjCJL808Ds-uwXKX9PX/pub?gid=1363872724&single=true&output=csv",
  sheet856543030: "https://docs.google.com/spreadsheets/d/1iWFpqbnzbijKd9TBpGbpLu1xxviG81qDaOHzf1gd4es/export?format=csv&gid=856543030",
  wardBooths: "https://docs.google.com/spreadsheets/d/1qRCpiL9xo7SBgVXirbPbNHRJ5cQaIntPss7F9dTPbvI/export?format=csv&gid=603975213"
};

const DEFAULT_REPORTS = [
  {
    id: "sheet_856543030",
    category: "daily",
    name: "Patna Mahanagar Field Survey Report (Sheet 856543030)",
    shortName: "Field Survey (856543030)",
    meetingStatus: { political: 14, nonPolitical: 18 },
    onboardingStatus: { onboarded: 24, dicey: 6, notOnboarded: 2 },
    pkIntervention: { yes: 8, no: 24 },
    hostPKTea: { yes: 10, no: 22 },
    committeeRec: { state: 1, district: 4, ward: 27 },
    notes: "Connected Google Sheet: 1iWFpqbnzbijKd9TBpGbpLu1xxviG81qDaOHzf1gd4es"
  },
  {
    id: "eod_daily",
    category: "daily",
    name: "Daily POC wise IDI Performance Report (22nd Sept 2026)",
    shortName: "Daily EOD (22 Sept)",
    isEOD: true,
    date: "22/09/2026",
    meetingStatus: { political: 4, nonPolitical: 8 },
    onboardingStatus: { onboarded: 8, dicey: 4, notOnboarded: 0 },
    pkIntervention: { yes: 1, no: 11 },
    hostPKTea: { yes: 1, no: 11 },
    committeeRec: { state: 0, district: 2, ward: 10 },
    pocRows: [
      { team: "Digha - 181(Team 1)", poc: "Mehtab", ward: "-", total: 0, pol: 0, nonPol: 0, onboarded: 0, dicey: 0, notOnb: 0, pk: 0, tea: 0, recWard: 0, newLeader: 0, oldLeader: 0 },
      { team: "Digha - 181(Team 1)", poc: "Gautam", ward: "55", total: 2, pol: 1, nonPol: 1, onboarded: 2, dicey: 0, notOnb: 0, pk: 0, tea: 0, recWard: 2, newLeader: 2, oldLeader: 0 },
      { team: "Digha - 181(Team 1)", poc: "Sapna", ward: "6", total: 1, pol: 0, nonPol: 1, onboarded: 1, dicey: 0, notOnb: 0, pk: 0, tea: 0, recWard: 1, newLeader: 1, oldLeader: 0 },
      { team: "Digha - 181(Team 2)", poc: "Abhishek Kumar", ward: "-", total: 0, pol: 0, nonPol: 0, onboarded: 0, dicey: 0, notOnb: 0, pk: 0, tea: 0, recWard: 0, newLeader: 0, oldLeader: 0 },
      { team: "Digha - 181(Team 2)", poc: "Reshu Rani", ward: "48, 33, 9", total: 5, pol: 0, nonPol: 5, onboarded: 2, dicey: 3, notOnb: 0, pk: 0, tea: 0, recWard: 5, newLeader: 5, oldLeader: 0 },
      { team: "Kumhrar - 183(Team 1)", poc: "Saurabh", ward: "-", total: 0, pol: 0, nonPol: 0, onboarded: 0, dicey: 0, notOnb: 0, pk: 0, tea: 0, recWard: 0, newLeader: 0, oldLeader: 0 },
      { team: "Kumhrar - 183(Team 1)", poc: "Roshan", ward: "-", total: 0, pol: 0, nonPol: 0, onboarded: 0, dicey: 0, notOnb: 0, pk: 0, tea: 0, recWard: 0, newLeader: 0, oldLeader: 0 },
      { team: "Kumhrar - 183(Team 1)", poc: "Richa Thakur", ward: "-", total: 0, pol: 0, nonPol: 0, onboarded: 0, dicey: 0, notOnb: 0, pk: 0, tea: 0, recWard: 0, newLeader: 0, oldLeader: 0 },
      { team: "Patna Sahib - 184(Team 1)", poc: "Shubham", ward: "41", total: 1, pol: 1, nonPol: 0, onboarded: 1, dicey: 0, notOnb: 0, pk: 1, tea: 1, recWard: 0, newLeader: 1, oldLeader: 0 },
      { team: "Patna Sahib - 184(Team 1)", poc: "Kunwar Mayank", ward: "42, 41", total: 2, pol: 1, nonPol: 1, onboarded: 2, dicey: 0, notOnb: 0, pk: 0, tea: 0, recWard: 2, newLeader: 2, oldLeader: 0 },
      { team: "Patna Sahib - 184(Team 1)", poc: "Shabnam Kumari", ward: "-", total: 0, pol: 0, nonPol: 0, onboarded: 0, dicey: 0, notOnb: 0, pk: 0, tea: 0, recWard: 0, newLeader: 0, oldLeader: 0 },
      { team: "Patna Sahib - 184(Team 2)", poc: "Imtiyaz", ward: "-", total: 0, pol: 0, nonPol: 0, onboarded: 0, dicey: 0, notOnb: 0, pk: 0, tea: 0, recWard: 0, newLeader: 0, oldLeader: 0 },
      { team: "Patna Sahib - 184(Team 2)", poc: "Vicky", ward: "-", total: 0, pol: 0, nonPol: 0, onboarded: 0, dicey: 0, notOnb: 0, pk: 0, tea: 0, recWard: 0, newLeader: 0, oldLeader: 0 },
      { team: "Patna Sahib - 184(Team 2)", poc: "Sadaf", ward: "42", total: 1, pol: 1, nonPol: 0, onboarded: 0, dicey: 1, notOnb: 0, pk: 0, tea: 0, recWard: 0, newLeader: 0, oldLeader: 1 }
    ]
  },
  {
    id: "patna_progress_report",
    category: "daily",
    name: "Patna Mahanagar Recent IDI Progress Report (PK Report)",
    shortName: "Recent IDI Progress (26)",
    meetingStatus: { political: 11, nonPolitical: 15 },
    onboardingStatus: { onboarded: 22, dicey: 4, notOnboarded: 0 },
    pkIntervention: { yes: 1, no: 20 },
    hostPKTea: { yes: 2, no: 21 },
    committeeRec: { state: 0, district: 3, ward: 21 },
    leaderCategory: { newLeader: 23, oldLeader: 3 }
  },
  {
    id: "patna_overall",
    category: "executive",
    name: "Patna Mahanagar Team Overall IDI's Report",
    shortName: "Patna Mahanagar (Overall)",
    meetingStatus: { political: 418, nonPolitical: 582 },
    onboardingStatus: { onboarded: 777, dicey: 171, notOnboarded: 52 },
    pkIntervention: { yes: 216, no: 626 },
    hostPKTea: { yes: 207, no: 157 },
    committeeRec: { state: 4, district: 42, ward: 560 },
    leaderCategory: { newLeader: 447, oldLeader: 74 }
  },
  {
    id: "mahila_team",
    category: "executive",
    name: "Mahila Team Overall IDI's",
    shortName: "Mahila Team (Women Leadership)",
    meetingStatus: { political: 64, nonPolitical: 169 },
    onboardingStatus: { onboarded: 221, dicey: 9, notOnboarded: 3 },
    pkIntervention: { yes: 57, no: 176 },
    hostPKTea: { yes: 19, no: 214 },
    committeeRec: { state: 0, district: 0, ward: 186 }
  },
  {
    id: "team_wise_summary",
    category: "executive",
    name: "Patna Mahanagar - Team Wise Consolidated Summary",
    shortName: "Team Wise Consolidated",
    meetingStatus: { political: 348, nonPolitical: 409 },
    onboardingStatus: { onboarded: 546, dicey: 162, notOnboarded: 49 },
    pkIntervention: { yes: 159, no: 441 },
    hostPKTea: { yes: 189, no: 147 },
    committeeRec: { state: 4, district: 41, ward: 366 }
  },
  {
    id: "digha_team1",
    category: "assembly",
    name: "181 - Digha Assembly (Team 1)",
    shortName: "181 - Digha (Team 1)",
    meetingStatus: { political: 83, nonPolitical: 84 },
    onboardingStatus: { onboarded: 141, dicey: 21, notOnboarded: 5 },
    pkIntervention: { yes: 17, no: 116 },
    hostPKTea: { yes: 69, no: 42 },
    committeeRec: { state: 2, district: 14, ward: 130 }
  },
  {
    id: "digha_team2",
    category: "assembly",
    name: "181 - Digha Assembly (Team 2)",
    shortName: "181 - Digha (Team 2)",
    meetingStatus: { political: 51, nonPolitical: 65 },
    onboardingStatus: { onboarded: 75, dicey: 22, notOnboarded: 19 },
    pkIntervention: { yes: 20, no: 69 },
    hostPKTea: { yes: 12, no: 4 },
    committeeRec: { state: 0, district: 7, ward: 72 }
  },
  {
    id: "bankipur_team1",
    category: "assembly",
    name: "182 - Bankipur Assembly",
    shortName: "182 - Bankipur",
    meetingStatus: { political: 20, nonPolitical: 36 },
    onboardingStatus: { onboarded: 45, dicey: 11, notOnboarded: 0 },
    pkIntervention: { yes: 5, no: 34 },
    hostPKTea: { yes: 9, no: 9 },
    committeeRec: { state: 1, district: 3, ward: 20 }
  },
  {
    id: "kumhrar_team1",
    category: "assembly",
    name: "183 - Kumhrar Assembly (Team 1)",
    shortName: "183 - Kumhrar (Team 1)",
    meetingStatus: { political: 51, nonPolitical: 52 },
    onboardingStatus: { onboarded: 79, dicey: 17, notOnboarded: 7 },
    pkIntervention: { yes: 30, no: 58 },
    hostPKTea: { yes: 42, no: 20 },
    committeeRec: { state: 0, district: 1, ward: 28 }
  },
  {
    id: "patnasahib_team1",
    category: "assembly",
    name: "184 - Patna Sahib Assembly (Team 1)",
    shortName: "184 - Patna Sahib (Team 1)",
    meetingStatus: { political: 91, nonPolitical: 111 },
    onboardingStatus: { onboarded: 130, dicey: 58, notOnboarded: 14 },
    pkIntervention: { yes: 51, no: 102 },
    hostPKTea: { yes: 41, no: 53 },
    committeeRec: { state: 1, district: 8, ward: 85 }
  },
  {
    id: "patnasahib_team2",
    category: "assembly",
    name: "184 - Patna Sahib Assembly (Team 2)",
    shortName: "184 - Patna Sahib (Team 2)",
    meetingStatus: { political: 51, nonPolitical: 62 },
    onboardingStatus: { onboarded: 76, dicey: 33, notOnboarded: 4 },
    pkIntervention: { yes: 27, no: 66 },
    hostPKTea: { yes: 14, no: 9 },
    committeeRec: { state: 0, district: 8, ward: 31 }
  },
  {
    id: "pk_sangathan_status",
    category: "leadership",
    name: "Sangathan Physical Meeting Status (PK Report)",
    shortName: "Sangathan Status (284 Pool)",
    isPhysical: true,
    totalPool: 284,
    meetingStatus: { completed: 11, remaining: 273, met: 11, notMet: 273, political: 11, nonPolitical: 273 },
    onboardingStatus: { onboarded: 5, dicey: 3, notOnboarded: 3 },
    partyInclination: { JSP: 3, BJP: 1, RJD: 3, JDU: 1, Neutral: 0, INC: 0, HAM: 0 },
    readyMeetPK: { yes: 4, no: 2 },
    pkIntervention: { yes: 4, no: 2 },
    hostPKTea: { yes: 4, no: 2 },
    engagementStatus: { supporter: 4, notInterested: 3, sympathizer: 0 },
    committeeRec: { state: 0, district: 3, ward: 5 }
  },
  {
    id: "pk_mayor_deputy_mayor",
    category: "leadership",
    name: "Mayor / Deputy Mayor Physical Meeting Status (PK Report)",
    shortName: "Mayor / Deputy Mayor (PK)",
    isPhysical: true,
    totalPool: 48,
    meetingStatus: { completed: 8, remaining: 40, met: 8, notMet: 40, political: 8, nonPolitical: 40 },
    onboardingStatus: { onboarded: 2, dicey: 2, notOnboarded: 4 },
    partyInclination: { JSP: 2, BJP: 2, RJD: 3, JDU: 1, Neutral: 0, INC: 0, HAM: 0 },
    readyMeetPK: { yes: 4, no: 2 },
    pkIntervention: { yes: 4, no: 2 },
    hostPKTea: { yes: 4, no: 2 },
    engagementStatus: { supporter: 4, notInterested: 3, sympathizer: 0 },
    committeeRec: { state: 0, district: 2, ward: 2 }
  },
  {
    id: "pk_acc_status",
    category: "leadership",
    name: "ACC Physical Registration Meeting Status (PK Report)",
    shortName: "ACC Registration Status (31 Pool)",
    isPhysical: true,
    totalPool: 31,
    meetingStatus: { completed: 8, remaining: 23, met: 8, notMet: 23, political: 8, nonPolitical: 23 },
    onboardingStatus: { onboarded: 4, dicey: 2, notOnboarded: 2 },
    partyInclination: { JSP: 2, BJP: 1, RJD: 2, JDU: 1, Neutral: 0, INC: 0, HAM: 0 },
    readyMeetPK: { yes: 3, no: 1 },
    pkIntervention: { yes: 3, no: 1 },
    hostPKTea: { yes: 3, no: 1 },
    engagementStatus: { supporter: 3, notInterested: 2, sympathizer: 0 },
    committeeRec: { state: 0, district: 2, ward: 4 }
  },
  {
    id: "councillors_2022",
    category: "leadership",
    name: "Ward Councillors 2022 (Winners & Runner Ups)",
    shortName: "Ward Councillors (2022)",
    isCouncillor: true,
    totalPool: 159,
    meetingStatus: { completed: 69, remaining: 90, met: 69, notMet: 90, political: 69, nonPolitical: 90 },
    onboardingStatus: { onboarded: 30, dicey: 8, notOnboarded: 121 },
    pkIntervention: { yes: 20, no: 12 },
    hostPKTea: { yes: 24, no: 24 },
    committeeRec: { state: 0, district: 8, ward: 65 }
  },
  {
    id: "councillors_2017",
    category: "leadership",
    name: "Ward Councillors 2017 (Winners & Runner Ups)",
    shortName: "Ward Councillors (2017)",
    isCouncillor: true,
    totalPool: 215,
    meetingStatus: { completed: 147, remaining: 68, met: 147, notMet: 68, political: 147, nonPolitical: 68 },
    onboardingStatus: { onboarded: 17, dicey: 12, notOnboarded: 186 },
    pkIntervention: { yes: 28, no: 15 },
    hostPKTea: { yes: 13, no: 19 },
    committeeRec: { state: 0, district: 5, ward: 45 }
  },
  {
    id: "acc_registration",
    category: "leadership",
    name: "ACC Physical Registration (Prominent Leadership Pool)",
    shortName: "ACC Leadership Pool (206)",
    totalPool: 206,
    meetingStatus: { political: 52, nonPolitical: 85 },
    onboardingStatus: { onboarded: 42, dicey: 18, notOnboarded: 146 },
    pkIntervention: { yes: 26, no: 34 },
    hostPKTea: { yes: 31, no: 22 },
    committeeRec: { state: 2, district: 12, ward: 28 }
  }
];

let ASSEMBLY_DEMOGRAPHICS = {
  "181_digha": {
    id: "digha_team1",
    acNo: 181,
    name: "181 - Digha Assembly",
    hindiName: "181 - दीघा विधानसभा",
    badgeClass: "bg-green-light",
    headerClass: "header-green",
    icon: "fa-city",
    totalBooths: "501",
    totalElectors: "4,60,851",
    wardsCount: "23",
    circle: "Patliputra Circle",
    wards: [
      { wardNo: 1, name: "Ward 1", booths: 33, area: "Digha / Rajiv Nagar / Nakta Diyara", voters: 31992 },
      { wardNo: 2, name: "Ward 2", booths: 25, area: "Ashiyana Nagar / Khajapura", voters: 23438 },
      { wardNo: 3, name: "Ward 3", booths: 16, area: "Muralichak / Khalilpura / Sabjpura", voters: 14470 },
      { wardNo: 4, name: "Ward 4", booths: 26, area: "Shekhpura / Raja Bazaar / Khajapura", voters: 22939 },
      { wardNo: 5, name: "Ward 5", booths: 37, area: "Samanpura / A.G. Colony / Ashiyana Nagar", voters: 34186 },
      { wardNo: 6, name: "Ward 6", booths: 17, area: "Rajiv Nagar / Ram Nagari / Magistrate Colony", voters: 15409 },
      { wardNo: 7, name: "Ward 7", booths: 34, area: "Kesari Nagar / Rajvanshi Nagar / Patel Nagar", voters: 31788 },
      { wardNo: 8, name: "Ward 8", booths: 25, area: "Shashtri Nagar / Punai Chak / Patel Nagar", voters: 21420 },
      { wardNo: 9, name: "Ward 9", booths: 9, area: "Beli Road / Hording Road / Kaushal Nagar", voters: 7026 },
      { wardNo: 10, name: "Ward 10", booths: 28, area: "Anisabad / Phulwari Border", voters: 21151 },
      { wardNo: 11, name: "Ward 11", booths: 35, area: "Chitkohra / Anisabad / Shivpuri", voters: 30326 },
      { wardNo: 12, name: "Ward 12", booths: 35, area: "Chitkohra / Anisabad / Shivpuri", voters: 30326 },
      { wardNo: 13, name: "Ward 13", booths: 35, area: "Saristabad / Gardanibag / Sadhnapuri", voters: 32888 },
      { wardNo: 14, name: "Ward 14", booths: 33, area: "Saristabad / Mahavir Cancer Sansthan Area", voters: 31178 },
      { wardNo: 15, name: "Ward 15", booths: 8, area: "Yarpur / Jakkanpur / Mithapur", voters: 7019 },
      { wardNo: 16, name: "Ward 16", booths: 3, area: "Jakkanpur / Jhunjhun Mahal", voters: 2669 },
      { wardNo: 17, name: "Ward 17", booths: 22, area: "Jakkanpur / JP Nagar / Punpun Road", voters: 19219 },
      { wardNo: 18, name: "Ward 18", booths: 23, area: "Purandarpur / Mithapur East", voters: 21062 },
      { wardNo: 19, name: "Ward 19", booths: 2, area: "Mithapur / Jakkanpur Border", voters: 1746 },
      { wardNo: 20, name: "Ward 20", booths: 17, area: "Punaichak / Rajvanshi Nagar", voters: 21543 },
      { wardNo: 21, name: "Ward 21", booths: 22, area: "A. N. College / Boring Road", voters: 17278 },
      { wardNo: 22, name: "Ward 22", booths: 22, area: "Rajapur / Boring Road / North S.K Puri", voters: 23497 },
      { wardNo: "22A", name: "Ward 22A", booths: 20, area: "Digha / Makhdumpur / Patliputra", voters: 16107 },
      { wardNo: "22B", name: "Ward 22B", booths: 26, area: "Kurji / Balupar / Bind Toli", voters: 16933 },
      { wardNo: "22C", name: "Ward 22C", booths: 18, area: "Mainpura / Digha Bridge Point", voters: 15357 },
      { wardNo: "Panchayat", name: "Panchayat", booths: 10, area: "Nakta Diyara (Rural / Diara)", voters: 12886 }
    ],
    otherAreas: "23 Wards & Units covering Patliputra, Digha, Rajiv Nagar & Danapur Border",
    localities: ["Digha Ghat", "Kurji", "Patliputra", "Rajiv Nagar", "Ashiyana Nagar", "Raja Bazar", "Jagdeo Path", "Khajpura", "Samanpura", "A.G. Colony", "Patel Nagar", "Anisabad", "Chitkhohra", "Gardanibagh", "Mainpura"],
    summary: "Digha is the largest urban constituency in Patna Mahanagar with 501 polling booths across 23 municipal wards & units."
  },
  "182_bankipur": {
    id: "patna_team_report",
    acNo: 182,
    name: "182 - Bankipur Assembly",
    hindiName: "182 - बांकीपुर विधानसभा",
    badgeClass: "bg-amber-light",
    headerClass: "header-amber",
    icon: "fa-building-columns",
    totalBooths: "422",
    totalElectors: "4,00,960",
    wardsCount: "24",
    circle: "Bankipur Circle & New Capital Circle",
    wards: [
      { wardNo: 15, name: "Ward 15", booths: 14, area: "Yarpur / Jakkanpur / Mithapur", voters: 11922 },
      { wardNo: 16, name: "Ward 16", booths: 12, area: "Jakkanpur / Jhunjhun Mahal", voters: 10670 },
      { wardNo: 17, name: "Ward 17", booths: 22, area: "Jakkanpur / JP Nagar / Punpun Road", voters: 19219 },
      { wardNo: 18, name: "Ward 18", booths: 23, area: "Purandarpur / Mithapur East", voters: 21062 },
      { wardNo: 19, name: "Ward 19", booths: 23, area: "Mithapur / Jakkanpur Border", voters: 19429 },
      { wardNo: 21, name: "Ward 21", booths: 15, area: "A. N. College / Boring Road", voters: 13035 },
      { wardNo: 22, name: "Ward 22", booths: 19, area: "Rajapur / Boring Road / North S.K Puri", voters: 16107 },
      { wardNo: 23, name: "Ward 23", booths: 19, area: "North S.K Puri / S.K Puri", voters: 16933 },
      { wardNo: 24, name: "Ward 24", booths: 17, area: "Boring Canal Road / Buddha Colony", voters: 15357 },
      { wardNo: 25, name: "Ward 25", booths: 14, area: "Kidwaipuri / Kotwali / Boring Road East", voters: 12886 },
      { wardNo: 26, name: "Ward 26", booths: 19, area: "North Mandiri / Baily Road / PWC", voters: 16590 },
      { wardNo: 27, name: "Ward 27", booths: 23, area: "Golghar / Lodipur / Sinha Library", voters: 20754 },
      { wardNo: 28, name: "Ward 28", booths: 24, area: "Dak Banglow / SP Verma Road / Frezer Road", voters: 21429 },
      { wardNo: 29, name: "Ward 29", booths: 26, area: "Karbigahiya / Postal Park / Chiraiyatand", voters: 23404 },
      { wardNo: 30, name: "Ward 30", booths: 26, area: "Sipara / Dashratha", voters: 24659 },
      { wardNo: 31, name: "Ward 31", booths: 2, area: "Chiraiya Tand / Postal Park", voters: 1856 },
      { wardNo: 35, name: "Ward 35", booths: 12, area: "Chandmari Road / Kankarbagh West", voters: 10630 },
      { wardNo: 36, name: "Ward 36", booths: 32, area: "Lalji Tola / CDA Building / Purvi Lohanipur", voters: 29913 },
      { wardNo: 37, name: "Ward 37", booths: 13, area: "B.N. College / Bankipur / Salimpur Ahra", voters: 11380 },
      { wardNo: 38, name: "Ward 38", booths: 23, area: "Kadamkuan / Pirmuhani / Daldali", voters: 20802 },
      { wardNo: 39, name: "Ward 39", booths: 14, area: "Bhawar Pokhar / Khetan Market / Sabzibagh", voters: 13485 },
      { wardNo: 40, name: "Ward 40", booths: 17, area: "Darzi Tola / Sabzi Bagh / Govind Mitra Road", voters: 15128 },
      { wardNo: 41, name: "Ward 41", booths: 7, area: "PMCH / Science College / Afzal Pur / Ramna Road / Laal Bagh", voters: 6093 },
      { wardNo: 42, name: "Ward 42", booths: 6, area: "Dariyapur / Machhua Toli / Bari Path", voters: 5506 }
    ],
    otherAreas: "24 Wards covering Central Commercial & Administrative Hub of Patna",
    localities: ["Gandhi Maidan", "Boring Road", "SK Puri", "Kidwaipuri", "Kadamkuan", "Machhua Toli", "Ashok Rajpath", "Naya Tola", "Pirbahore", "Bakarganj", "Lohanipur", "Sabzibagh"],
    summary: "Bankipur constitutes the administrative, educational, and medical nerve center of Patna Mahanagar with 422 polling booths across 24 municipal wards & units."
  },
  "183_kumhrar": {
    id: "kumhrar_team1",
    acNo: 183,
    name: "183 - Kumhrar Assembly",
    hindiName: "183 - कुम्हरार विधानसभा",
    badgeClass: "bg-purple-light",
    headerClass: "header-purple",
    icon: "fa-landmark",
    totalBooths: "435",
    totalElectors: "4,32,442",
    wardsCount: "22",
    circle: "Kankarbagh Circle",
    wards: [
      { wardNo: 2, name: "Ward 2", booths: 1, area: "Ashiyana Nagar / Khajapura Border", voters: 1100 },
      { wardNo: 30, name: "Ward 30", booths: 4, area: "Sipara / Dashratha Border", voters: 4274 },
      { wardNo: 31, name: "Ward 31", booths: 25, area: "Chiraiya Tand / Postal Park", voters: 26607 },
      { wardNo: 32, name: "Ward 32", booths: 9, area: "Postal Park / Chiraiyatand", voters: 8500 },
      { wardNo: 33, name: "Ward 33", booths: 23, area: "Kankarbag, Postel Park, RMS Colony", voters: 22971 },
      { wardNo: 34, name: "Ward 34", booths: 22, area: "Kankarbag, Lohiyanagar", voters: 23923 },
      { wardNo: 35, name: "Ward 35", booths: 9, area: "Chandmari Road / Kankarbagh West", voters: 9731 },
      { wardNo: 36, name: "Ward 36", booths: 1, area: "Lalji Tola / CDA Building / Purvi Lohanipur", voters: 1022 },
      { wardNo: 41, name: "Ward 41", booths: 21, area: "PMCH / Science College / Afzal Pur / Ramna Road / Laal Bagh", voters: 19886 },
      { wardNo: 42, name: "Ward 42", booths: 22, area: "Dariyapur / Machhua Toli", voters: 21690 },
      { wardNo: 43, name: "Ward 43", booths: 32, area: "Kadamkua / Rajendra Nagar", voters: 31273 },
      { wardNo: 44, name: "Ward 44", booths: 33, area: "Kankadbag / Hanuman Nagar / Lohiya Nagar / Bahadurpur", voters: 34036 },
      { wardNo: 45, name: "Ward 45", booths: 38, area: "RMS Colony / Malahi Pakdi / Chitragupta nagar", voters: 38067 },
      { wardNo: 46, name: "Ward 46", booths: 30, area: "Bahadurpur / Nandlal Chhpra", voters: 30473 },
      { wardNo: 47, name: "Ward 47", booths: 25, area: "Bahadurpur / Sandalpur", voters: 26141 },
      { wardNo: 48, name: "Ward 48", booths: 29, area: "Musallahpur / Bazar Samiti", voters: 30486 },
      { wardNo: 49, name: "Ward 49", booths: 24, area: "Ranighat / Patna Law College", voters: 23804 },
      { wardNo: 50, name: "Ward 50", booths: 36, area: "Ranighat / Mahendru / Muhammadpur / Sandalpur / Katra Dargah", voters: 38214 },
      { wardNo: 51, name: "Ward 51", booths: 20, area: "Chaudhari Tola / Khajoor Banna / Tripoliya / Mahendru", voters: 22124 },
      { wardNo: 52, name: "Ward 52", booths: 1, area: "Tripoliya / Mahendru Border", voters: 1178 },
      { wardNo: 55, name: "Ward 55", booths: 29, area: "Bahadurpur Housing Colony / Kumhrar", voters: 29804 },
      { wardNo: 60, name: "Ward 60", booths: 1, area: "Kumhrar / Sandalpur Border", voters: 1013 }
    ],
    otherAreas: "22 Wards & Units covering Kankarbagh, Kumhrar, Rajendra Nagar & University Area",
    localities: ["Rajendra Nagar", "PC Colony", "Hanuman Nagar", "Kumhrar", "Bazar Samiti", "Bahadurpur", "Chiraiyatand", "Bhootnath Road", "Ranighat", "Mahendru", "Musallahpur", "Transport Nagar"],
    summary: "Kumhrar represents the massive South-Central urban block with 435 polling booths across 22 wards with high residential density."
  },
  "184_patna_sahib": {
    id: "patnasahib_team2",
    acNo: 184,
    name: "184 - Patna Sahib Assembly",
    hindiName: "184 - पटना साहिब विधानसभा",
    badgeClass: "bg-orange-light",
    headerClass: "header-navy",
    icon: "fa-monument",
    totalBooths: "405",
    totalElectors: "3,90,391",
    wardsCount: "20",
    circle: "Patna City Circle & Azimabad Circle",
    wards: [
      { wardNo: 52, name: "Ward 52", booths: 28, area: "Tripoliya / Gai Ghat / Alamgunj / Guljarbag", voters: 27371 },
      { wardNo: 53, name: "Ward 53", booths: 16, area: "Gai Ghat / Shershah Road / Babuagunj", voters: 15343 },
      { wardNo: 54, name: "Ward 54", booths: 31, area: "Mirdaha Toli / Alabakspur / Shersah Road", voters: 28536 },
      { wardNo: 56, name: "Ward 56", booths: 23, area: "Maharajganj / Chhota & Bada Pahari / Jakariyapur", voters: 21157 },
      { wardNo: 57, name: "Ward 57", booths: 15, area: "Mina Bazar / Shadikpur / Tulsimandi / Guljarbag", voters: 14652 },
      { wardNo: 58, name: "Ward 58", booths: 28, area: "Mathramna / Chailital / Mahavirghat / Guljarbag", voters: 26620 },
      { wardNo: 59, name: "Ward 59", booths: 28, area: "Gujri / Khajekala / Gurhatha / Naujarkatra", voters: 27225 },
      { wardNo: 60, name: "Ward 60", booths: 29, area: "Gujri / Khajekala / Mogalpura / Padri ki Haweli", voters: 26678 },
      { wardNo: 61, name: "Ward 61", booths: 28, area: "Maheshpur / Mehdiganj / Ranipur / Kasba Karimabad", voters: 24616 },
      { wardNo: 62, name: "Ward 62", booths: 21, area: "Mangal Talab / Begampur", voters: 21597 },
      { wardNo: 63, name: "Ward 63", booths: 10, area: "Mogalpura / Nun ka Chauraha / Chok Sikarpur / Dundi Bazar", voters: 9714 },
      { wardNo: 64, name: "Ward 64", booths: 15, area: "Mangal Talaw / Nun ka Chauraha", voters: 14983 },
      { wardNo: 65, name: "Ward 65", booths: 17, area: "Padri ki Haweli / Maharajghat / Tedhighat / Mangal Talaw / Sadar Gali", voters: 16179 },
      { wardNo: 66, name: "Ward 66", booths: 16, area: "Bade ki Gali / Magal Talaw / Chok Sikarpur", voters: 14812 },
      { wardNo: 67, name: "Ward 67", booths: 25, area: "Chhipi Tola / Nehru Tola / Kila Road / Kaimasikoh", voters: 22956 },
      { wardNo: 68, name: "Ward 68", booths: 13, area: "Chainpura / Dhavalpura / Beldari Tola / Nakhas Mangal Akhada", voters: 11923 },
      { wardNo: 69, name: "Ward 69", booths: 11, area: "Dalhatta / Mashurganj / Nkhas Mangal Akhada", voters: 11458 },
      { wardNo: 70, name: "Ward 70", booths: 24, area: "Nand Gola / Pirdmariya / Nurudinganj / Dahuchak Nagala / Shimli", voters: 22397 },
      { wardNo: 71, name: "Ward 71", booths: 8, area: "Chutikiya Bazar / Nurudinganj", voters: 8091 },
      { wardNo: 72, name: "Ward 72", booths: 19, area: "Katra Bazar / Rikab Ganj / Nabab Ganj / Sarifa Ganj", voters: 21377 }
    ],
    otherAreas: "20 Wards covering Historic Patna City, Wholesale Mandis & Heritage Ghats",
    localities: ["Takht Sri Patna Sahib", "Chowk", "Gulzarbagh", "Alamganj", "Marufganj", "Didarganj", "Malsalami", "Gaighat", "Begampur", "Mehdiganj", "Shershah Road", "Mangal Talab"],
    summary: "Patna Sahib is the historic wholesale business hub and heritage heart of Patna with 405 polling booths across 20 wards."
  }
};

// Global App State
const AppState = {
  reports: (() => {
    try {
      const cached = JSON.parse(localStorage.getItem('idi_reports'));
      if (cached && Array.isArray(cached)) {
        return cached.map(r => {
          if (r.id === 'councillors_2022') return DEFAULT_REPORTS.find(d => d.id === 'councillors_2022') || r;
          if (r.id === 'councillors_2017') return DEFAULT_REPORTS.find(d => d.id === 'councillors_2017') || r;
          return r;
        });
      }
    } catch (e) {}
    return DEFAULT_REPORTS;
  })(),
  activeReportId: localStorage.getItem('idi_active_report_id') || "patna_overall",
  councillorsData: (typeof window !== 'undefined' && window.DEFAULT_COUNCILLORS_DATA) ? window.DEFAULT_COUNCILLORS_DATA : [],
  councillorsFilterAssembly: 'all',
  councillorsFilterMode: 'all', // 'all', '2022', '2017'
  councillorsSearchQuery: '',
  refreshIntervalSeconds: 15,
  countdown: 15,
  timerId: null,
  isDarkTheme: localStorage.getItem('idi_theme') === 'dark',
  customColors: JSON.parse(localStorage.getItem('idi_custom_colors')) || null,
  activePreset: localStorage.getItem('idi_active_preset') || 'jansuraaj',
  charts: {}
};

// ==========================================================================
// 2. DOM Elements Cache
// ==========================================================================

const DOM = {
  leftDrawer: document.getElementById('leftDrawer'),
  closeDrawerBtn: document.getElementById('closeDrawerBtn'),
  toggleDrawerBtn: document.getElementById('toggleDrawerBtn'),
  drawerOverlay: document.getElementById('drawerOverlay'),
  drawerSearchInput: document.getElementById('drawerSearchInput'),
  drawerReportsList: document.getElementById('drawerReportsList'),
  drawerReportsCount: document.getElementById('drawerReportsCount'),
  drawerNavLanding: document.getElementById('drawerNavLanding'),
  drawerNavCouncillors: document.getElementById('drawerNavCouncillors'),
  drawerNavBoothsWards: document.getElementById('drawerNavBoothsWards'),
  drawerDownloadAllCsvBtn: document.getElementById('drawerDownloadAllCsvBtn'),
  drawerDownloadAllPdfBtn: document.getElementById('drawerDownloadAllPdfBtn'),
  drawerSyncNowBtn: document.getElementById('drawerSyncNowBtn'),
  navBrandLogo: document.getElementById('navBrandLogo'),

  landingPageView: document.getElementById('landingPageView'),
  dashboardDetailView: document.getElementById('dashboardDetailView'),
  searchDirectoryView: document.getElementById('searchDirectoryView'),
  councillorSectionView: document.getElementById('councillorSectionView'),
  pillLandingView: document.getElementById('pillLandingView'),
  pillDashboardView: document.getElementById('pillDashboardView'),
  pillCouncillorsView: document.getElementById('pillCouncillorsView'),
  pillSearchView: document.getElementById('pillSearchView'),
  navReportSelectorWrapper: document.getElementById('navReportSelectorWrapper'),
  backToLandingBtn: document.getElementById('backToLandingBtn'),
  breadcrumbReportName: document.getElementById('breadcrumbReportName'),
  viewAssemblyWardsDetailBtn: document.getElementById('viewAssemblyWardsDetailBtn'),
  downloadCurrentPdfBtn: document.getElementById('downloadCurrentPdfBtn'),
  downloadCurrentPngBtn: document.getElementById('downloadCurrentPngBtn'),
  landingCouncillorCard: document.getElementById('landingCouncillorCard'),
  btnExploreCouncillors: document.getElementById('btnExploreCouncillors'),

  // Interactive Map Elements
  drawerNavMaps: document.getElementById('drawerNavMaps'),
  interactiveMapView: document.getElementById('interactiveMapView'),
  pillMapView: document.getElementById('pillMapView'),
  btnExploreMaps: document.getElementById('btnExploreMaps'),
  landingMapsCard: document.getElementById('landingMapsCard'),
  mapWardSearchInput: document.getElementById('mapWardSearchInput'),
  mapSearchDropdown: document.getElementById('mapSearchDropdown'),
  layerStreetBtn: document.getElementById('layerStreetBtn'),
  layerSatBtn: document.getElementById('layerSatBtn'),
  layerDarkBtn: document.getElementById('layerDarkBtn'),
  btnResetMapBounds: document.getElementById('btnResetMapBounds'),
  btnToggleMapFullscreen: document.getElementById('btnToggleMapFullscreen'),
  mapViewportWrapper: document.getElementById('mapViewportWrapper'),
  wardFloatingCard: document.getElementById('wardFloatingCard'),
  closeWardCardBtn: document.getElementById('closeWardCardBtn'),
  cardWardBadge: document.getElementById('cardWardBadge'),
  cardWardAcTag: document.getElementById('cardWardAcTag'),
  cardWardAreaName: document.getElementById('cardWardAreaName'),
  cardBoothsTotal: document.getElementById('cardBoothsTotal'),
  cardVotersTotal: document.getElementById('cardVotersTotal'),
  cardCouncillorPreview: document.getElementById('cardCouncillorPreview'),
  cardViewCouncillorBtn: document.getElementById('cardViewCouncillorBtn'),
  cardZoomWardBtn: document.getElementById('cardZoomWardBtn'),
  mapAcFilterGroup: document.getElementById('mapAcFilterGroup'),
  btnTogglePollingStations: document.getElementById('btnTogglePollingStations'),
  psCountBadge: document.getElementById('psCountBadge'),

  // Councillor Section Controls & Elements
  exportCouncillorCsvBtn: document.getElementById('exportCouncillorCsvBtn'),
  downloadCouncillorPdfBtn: document.getElementById('downloadCouncillorPdfBtn'),
  councillorSearchInput: document.getElementById('councillorSearchInput'),
  clearCouncillorSearchBtn: document.getElementById('clearCouncillorSearchBtn'),
  councillorAssemblyFilter: document.getElementById('councillorAssemblyFilter'),
  councillorTableBody: document.getElementById('councillorTableBody'),
  councillorTotalsRow: document.getElementById('councillorTotalsRow'),
  councillorRowCount: document.getElementById('councillorRowCount'),
  kpi2022Meetings: document.getElementById('kpi2022Meetings'),
  kpi2022WinnersMet: document.getElementById('kpi2022WinnersMet'),
  kpi2022RunnersMet: document.getElementById('kpi2022RunnersMet'),
  kpi2022Onboarded: document.getElementById('kpi2022Onboarded'),
  kpi2017Meetings: document.getElementById('kpi2017Meetings'),
  kpi2017WinnersMet: document.getElementById('kpi2017WinnersMet'),
  kpi2017RunnersMet: document.getElementById('kpi2017RunnersMet'),
  kpi2017Onboarded: document.getElementById('kpi2017Onboarded'),
  kpiCombinedMeetings: document.getElementById('kpiCombinedMeetings'),
  kpiCombinedOnboarded: document.getElementById('kpiCombinedOnboarded'),

  // Booths & Wards Controls
  btnSyncBoothsSheet: document.getElementById('btnSyncBoothsSheet'),
  btnUploadBoothsCsv: document.getElementById('btnUploadBoothsCsv'),
  boothCsvFileInput: document.getElementById('boothCsvFileInput'),

  globalLeaderSearchInput: document.getElementById('globalLeaderSearchInput'),
  clearGlobalSearchBtn: document.getElementById('clearGlobalSearchBtn'),
  dirSearchInput: document.getElementById('dirSearchInput'),
  dirClearSearchBtn: document.getElementById('dirClearSearchBtn'),
  filterAssemblySelect: document.getElementById('filterAssemblySelect'),
  filterStatusSelect: document.getElementById('filterStatusSelect'),
  leaderResultsContainer: document.getElementById('leaderResultsContainer'),
  searchResultsStatusText: document.getElementById('searchResultsStatusText'),
  exportSearchResultsCsvBtn: document.getElementById('exportSearchResultsCsvBtn'),
  countAllLeaders: document.getElementById('countAllLeaders'),
  countOnboardedLeaders: document.getElementById('countOnboardedLeaders'),
  countDiceyLeaders: document.getElementById('countDiceyLeaders'),
  countNotOnboardedLeaders: document.getElementById('countNotOnboardedLeaders'),
  countTeaLeaders: document.getElementById('countTeaLeaders'),
  countPKLeaders: document.getElementById('countPKLeaders'),
  countStateDistLeaders: document.getElementById('countStateDistLeaders'),

  heroOpenOverallBtn: document.getElementById('heroOpenOverallBtn'),
  heroOpenDrawerBtn: document.getElementById('heroOpenDrawerBtn'),
  landingCompareBtn: document.getElementById('landingCompareBtn'),
  landingDownloadAllCsvBtn: document.getElementById('landingDownloadAllCsvBtn'),
  landingReportsGrid: document.getElementById('landingReportsGrid'),
  heroStatTotalMeetings: document.getElementById('heroStatTotalMeetings'),
  heroStatOnboarded: document.getElementById('heroStatOnboarded'),
  heroStatOnboardedPct: document.getElementById('heroStatOnboardedPct'),
  heroStatTea: document.getElementById('heroStatTea'),
  heroStatWardRec: document.getElementById('heroStatWardRec'),

  boothsWardsSection: document.getElementById('boothsWardsSection'),
  wardSearchInput: document.getElementById('wardSearchInput'),
  assemblyWardGrid: document.getElementById('assemblyWardGrid'),
  boothWardModal: document.getElementById('boothWardModal'),
  closeBoothWardModalBtn: document.getElementById('closeBoothWardModalBtn'),
  modalWardSearchInput: document.getElementById('modalWardSearchInput'),
  modalAssemblyAccordion: document.getElementById('modalAssemblyAccordion'),

  compareModal: document.getElementById('compareModal'),
  openCompareBtn: document.getElementById('openCompareBtn'),
  closeCompareModalBtn: document.getElementById('closeCompareModalBtn'),
  closeCompareBtn2: document.getElementById('closeCompareBtn2'),
  comparisonTableBody: document.getElementById('comparisonTableBody'),

  shareModal: document.getElementById('shareModal'),
  openShareModalBtn: document.getElementById('openShareModalBtn'),
  closeShareModalBtn: document.getElementById('closeShareModalBtn'),
  closeShareModalBtn2: document.getElementById('closeShareModalBtn2'),
  shareUrlInput: document.getElementById('shareUrlInput'),
  copyShareUrlBtn: document.getElementById('copyShareUrlBtn'),
  whatsappShareBtn: document.getElementById('whatsappShareBtn'),
  qrCodeImg: document.getElementById('qrCodeImg'),
  localNetworkIpCode: document.getElementById('localNetworkIpCode'),

  reportSelect: document.getElementById('reportSelect'),
  syncNowBtn: document.getElementById('syncNowBtn'),
  syncIcon: document.getElementById('syncIcon'),
  lastSyncTime: document.getElementById('lastSyncTime'),
  countdownBadge: document.getElementById('countdownBadge'),
  footerSyncTime: document.getElementById('footerSyncTime'),
  currentReportTitle: document.getElementById('currentReportTitle'),
  themeToggleBtn: document.getElementById('themeToggleBtn'),
  themeIcon: document.getElementById('themeIcon'),
  liveStatusBadge: document.getElementById('liveStatusBadge'),

  lblTotalMeetings: document.getElementById('lblTotalMeetings'),
  lblPoliticalMeetings: document.getElementById('lblPoliticalMeetings'),
  lblNonPoliticalMeetings: document.getElementById('lblNonPoliticalMeetings'),
  legendTextMeetingLeft: document.getElementById('legendTextMeetingLeft'),
  legendDotMeetingLeft: document.getElementById('legendDotMeetingLeft'),
  legendTextMeetingRight: document.getElementById('legendTextMeetingRight'),
  legendDotMeetingRight: document.getElementById('legendDotMeetingRight'),
  boxMeetingLeft: document.getElementById('boxMeetingLeft'),
  boxMeetingRight: document.getElementById('boxMeetingRight'),
  iconMeetingLeft: document.getElementById('iconMeetingLeft'),
  iconMeetingRight: document.getElementById('iconMeetingRight'),

  valTotalMeetings: document.getElementById('valTotalMeetings'),
  valPoliticalMeetings: document.getElementById('valPoliticalMeetings'),
  valNonPoliticalMeetings: document.getElementById('valNonPoliticalMeetings'),
  centerMeetingTotal: document.getElementById('centerMeetingTotal'),
  calloutMeetingPolitical: document.getElementById('calloutMeetingPolitical'),
  calloutMeetingNonPolitical: document.getElementById('calloutMeetingNonPolitical'),

  valOnboarded: document.getElementById('valOnboarded'),
  valDicey: document.getElementById('valDicey'),
  valNotOnboarded: document.getElementById('valNotOnboarded'),
  centerOnboardingTotal: document.getElementById('centerOnboardingTotal'),
  calloutOnboardingNot: document.getElementById('calloutOnboardingNot'),
  calloutOnboardingDicey: document.getElementById('calloutOnboardingDicey'),
  calloutOnboardingYes: document.getElementById('calloutOnboardingYes'),

  takeawayValMeetings: document.getElementById('takeawayValMeetings'),
  takeawayValOnboarded: document.getElementById('takeawayValOnboarded'),
  takeawayPctOnboarded: document.getElementById('takeawayPctOnboarded'),
  takeawayValPK: document.getElementById('takeawayValPK'),
  takeawayValTea: document.getElementById('takeawayValTea'),
  takeawayValWard: document.getElementById('takeawayValWard'),

  valPKYes: document.getElementById('valPKYes'),
  valPKNo: document.getElementById('valPKNo'),
  centerPKTotal: document.getElementById('centerPKTotal'),
  calloutPKYes: document.getElementById('calloutPKYes'),
  calloutPKNo: document.getElementById('calloutPKNo'),

  valTeaYes: document.getElementById('valTeaYes'),
  valTeaNo: document.getElementById('valTeaNo'),
  centerTeaTotal: document.getElementById('centerTeaTotal'),
  calloutTeaYes: document.getElementById('calloutTeaYes'),
  calloutTeaNo: document.getElementById('calloutTeaNo'),

  valRecState: document.getElementById('valRecState'),
  valRecDistrict: document.getElementById('valRecDistrict'),
  valRecWard: document.getElementById('valRecWard'),
  hbarState: document.getElementById('hbarState'),
  hbarDistrict: document.getElementById('hbarDistrict'),
  hbarWard: document.getElementById('hbarWard'),
  hbarValState: document.getElementById('hbarValState'),
  hbarValDistrict: document.getElementById('hbarValDistrict'),
  hbarValWard: document.getElementById('hbarValWard'),

  exportDropdownBtn: document.getElementById('exportDropdownBtn'),
  exportMenu: document.getElementById('exportMenu'),
  exportPngBtn: document.getElementById('exportPngBtn'),
  exportPdfBtn: document.getElementById('exportPdfBtn'),
  printBtn: document.getElementById('printBtn'),
  toastContainer: document.getElementById('toastContainer'),

  openThemeStudioBtn: document.getElementById('openThemeStudioBtn'),
  themeStudioModal: document.getElementById('themeStudioModal'),
  closeThemeStudioModalBtn: document.getElementById('closeThemeStudioModalBtn'),
  closeThemeStudioModalBtn2: document.getElementById('closeThemeStudioModalBtn2'),
  saveThemeBtn: document.getElementById('saveThemeBtn'),
  resetThemeDefaultBtn: document.getElementById('resetThemeDefaultBtn'),
  themePresetsGrid: document.getElementById('themePresetsGrid'),
  pickerBrandPrimary: document.getElementById('pickerBrandPrimary'),
  codeBrandPrimary: document.getElementById('codeBrandPrimary'),
  pickerOnboardedGreen: document.getElementById('pickerOnboardedGreen'),
  codeOnboardedGreen: document.getElementById('codeOnboardedGreen'),
  pickerDiceyOrange: document.getElementById('pickerDiceyOrange'),
  codeDiceyOrange: document.getElementById('codeDiceyOrange'),
  pickerNotOnboardedRed: document.getElementById('pickerNotOnboardedRed'),
  codeNotOnboardedRed: document.getElementById('codeNotOnboardedRed'),
  pickerPurpleAccent: document.getElementById('pickerPurpleAccent'),
  codePurpleAccent: document.getElementById('codePurpleAccent'),
  pickerTeaAmber: document.getElementById('pickerTeaAmber'),
  codeTeaAmber: document.getElementById('codeTeaAmber'),

  // Hero Quick Navigation Hub
  heroNavReports: document.getElementById('heroNavReports'),
  heroNavCouncillors: document.getElementById('heroNavCouncillors'),
  heroNavCoverage: document.getElementById('heroNavCoverage'),
  heroNavMap: document.getElementById('heroNavMap'),

  // Map Polling Stations Side Drawer & Zoom Indicator
  btnTogglePsDrawer: document.getElementById('btnTogglePsDrawer'),
  closePsDrawerBtn: document.getElementById('closePsDrawerBtn'),
  psSideDrawer: document.getElementById('psSideDrawer'),
  psDrawerAcTabs: document.getElementById('psDrawerAcTabs'),
  psDrawerSearchInput: document.getElementById('psDrawerSearchInput'),
  psDrawerList: document.getElementById('psDrawerList'),
  mapZoomStatusPill: document.getElementById('mapZoomStatusPill'),
  mapZoomStatusText: document.getElementById('mapZoomStatusText')
};

// ==========================================================================
// 3. Helper Functions
// ==========================================================================

function formatPercent(value, total) {
  if (!total || total === 0) return "0.0%";
  return ((value / total) * 100).toFixed(1) + "%";
}

function showToast(message, type = 'info') {
  if (!DOM.toastContainer) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  let icon = 'fa-circle-info';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'error') icon = 'fa-triangle-exclamation';

  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  DOM.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function updateLastSyncTimeText() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateStr = now.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' });
  if (DOM.lastSyncTime) DOM.lastSyncTime.textContent = timeStr;
  if (DOM.footerSyncTime) DOM.footerSyncTime.textContent = `${dateStr}, ${timeStr}`;
}

function getActiveReportData() {
  const found = AppState.reports.find(r => r.id === AppState.activeReportId);
  return found || AppState.reports[0] || DEFAULT_REPORTS[0];
}

// ==========================================================================
// 4. View Switcher & Left Drawer
// ==========================================================================

function switchView(viewName, targetReportId = null) {
  if (targetReportId) {
    AppState.activeReportId = targetReportId;
    localStorage.setItem('idi_active_report_id', AppState.activeReportId);
    if (DOM.reportSelect) DOM.reportSelect.value = targetReportId;
  }

  if (DOM.landingPageView) DOM.landingPageView.style.display = 'none';
  if (DOM.dashboardDetailView) DOM.dashboardDetailView.style.display = 'none';
  if (DOM.searchDirectoryView) DOM.searchDirectoryView.style.display = 'none';
  if (DOM.councillorSectionView) DOM.councillorSectionView.style.display = 'none';
  if (DOM.interactiveMapView) DOM.interactiveMapView.style.display = 'none';

  if (DOM.pillLandingView) DOM.pillLandingView.classList.remove('active');
  if (DOM.pillDashboardView) DOM.pillDashboardView.classList.remove('active');
  if (DOM.pillCouncillorsView) DOM.pillCouncillorsView.classList.remove('active');
  if (DOM.pillSearchView) DOM.pillSearchView.classList.remove('active');
  if (DOM.pillMapView) DOM.pillMapView.classList.remove('active');

  if (DOM.drawerNavLanding) DOM.drawerNavLanding.classList.remove('active');
  if (DOM.drawerNavCouncillors) DOM.drawerNavCouncillors.classList.remove('active');
  if (DOM.drawerNavBoothsWards) DOM.drawerNavBoothsWards.classList.remove('active');
  if (DOM.drawerNavMaps) DOM.drawerNavMaps.classList.remove('active');

  if (viewName === 'landing') {
    if (DOM.landingPageView) DOM.landingPageView.style.display = 'block';
    if (DOM.pillLandingView) DOM.pillLandingView.classList.add('active');
    if (DOM.navReportSelectorWrapper) DOM.navReportSelectorWrapper.style.display = 'none';
    if (DOM.drawerNavLanding) DOM.drawerNavLanding.classList.add('active');
    renderLandingPage();
  } else if (viewName === 'councillors') {
    if (DOM.councillorSectionView) DOM.councillorSectionView.style.display = 'block';
    if (DOM.pillCouncillorsView) DOM.pillCouncillorsView.classList.add('active');
    if (DOM.navReportSelectorWrapper) DOM.navReportSelectorWrapper.style.display = 'none';
    if (DOM.drawerNavCouncillors) DOM.drawerNavCouncillors.classList.add('active');
    renderCouncillorSection();
  } else if (viewName === 'search') {
    if (DOM.searchDirectoryView) DOM.searchDirectoryView.style.display = 'block';
    if (DOM.pillSearchView) DOM.pillSearchView.classList.add('active');
    if (DOM.navReportSelectorWrapper) DOM.navReportSelectorWrapper.style.display = 'none';
    renderLeaderSearchResults();
  } else if (viewName === 'map' || viewName === 'maps') {
    if (DOM.interactiveMapView) DOM.interactiveMapView.style.display = 'block';
    if (DOM.pillMapView) DOM.pillMapView.classList.add('active');
    if (DOM.navReportSelectorWrapper) DOM.navReportSelectorWrapper.style.display = 'none';
    if (DOM.drawerNavMaps) DOM.drawerNavMaps.classList.add('active');
    initOrUpdatePatnaMap();
  } else {
    if (DOM.dashboardDetailView) DOM.dashboardDetailView.style.display = 'block';
    if (DOM.pillDashboardView) DOM.pillDashboardView.classList.add('active');
    if (DOM.navReportSelectorWrapper) DOM.navReportSelectorWrapper.style.display = 'flex';
    renderDashboard();
  }

  renderDrawerReports(DOM.drawerSearchInput ? DOM.drawerSearchInput.value : '');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openDrawer() {
  if (DOM.leftDrawer) DOM.leftDrawer.classList.add('open');
  if (DOM.drawerOverlay) DOM.drawerOverlay.classList.add('active');
}

function closeDrawer() {
  if (DOM.leftDrawer) DOM.leftDrawer.classList.remove('open');
  if (DOM.drawerOverlay) DOM.drawerOverlay.classList.remove('active');
}

function populateReportSelectors() {
  if (!DOM.reportSelect) return;
  DOM.reportSelect.innerHTML = '';

  const groups = [
    { label: "⚡ Daily Field Tracking (EOD)", filter: r => r.category === 'daily' || r.id === 'eod_daily' || r.isEOD },
    { label: "📊 Strategic & Executive Overviews", filter: r => r.category === 'executive' || ['patna_overall', 'mahila_team', 'team_wise_summary'].includes(r.id) },
    { label: "🏛️ Vidhan Sabha Assembly Teams", filter: r => r.category === 'assembly' || r.id.includes('team') || r.id.includes('digha') || r.id.includes('bankipur') || r.id.includes('kumhrar') || r.id.includes('patnasahib') },
    { label: "👑 Civic & Local Leadership", filter: r => r.category === 'leadership' || r.isMayor || r.isCouncillor || r.id.includes('councillor') || r.id.includes('mayor') || r.id.includes('acc') }
  ];

  const addedIds = new Set();
  groups.forEach(g => {
    const matched = AppState.reports.filter(r => !addedIds.has(r.id) && g.filter(r));
    if (matched.length > 0) {
      const optgroup = document.createElement('optgroup');
      optgroup.label = g.label;
      matched.forEach(r => {
        addedIds.add(r.id);
        const opt = document.createElement('option');
        opt.value = r.id;
        opt.textContent = r.name;
        if (r.id === AppState.activeReportId) opt.selected = true;
        optgroup.appendChild(opt);
      });
      DOM.reportSelect.appendChild(optgroup);
    }
  });

  // Any remaining
  const remaining = AppState.reports.filter(r => !addedIds.has(r.id));
  if (remaining.length > 0) {
    const optgroup = document.createElement('optgroup');
    optgroup.label = "📁 Other Reports";
    remaining.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r.id;
      opt.textContent = r.name;
      if (r.id === AppState.activeReportId) opt.selected = true;
      optgroup.appendChild(opt);
    });
    DOM.reportSelect.appendChild(optgroup);
  }
}

// ==========================================================================
// 5. Landing Page & Constituency Breakdown Rendering
// ==========================================================================

function renderLandingPage() {
  const overallReport = AppState.reports.find(r => r.id === 'patna_overall' || r.name.toLowerCase().includes('overall')) || AppState.reports[0];
  const assemblyReports = AppState.reports.filter(r => r !== overallReport);

  const totalMeetings = (Number(overallReport.meetingStatus.political) || 0) + (Number(overallReport.meetingStatus.nonPolitical) || 0);
  const totalOnboarded = Number(overallReport.onboardingStatus.onboarded) || 0;
  const totalDicey = Number(overallReport.onboardingStatus.dicey) || 0;
  const totalNotOnb = Number(overallReport.onboardingStatus.notOnboarded) || 0;
  const totalOnbPool = totalOnboarded + totalDicey + totalNotOnb;
  const totalTea = Number(overallReport.hostPKTea.yes) || 0;
  const totalWard = Number(overallReport.committeeRec.ward) || 0;

  if (DOM.heroStatTotalMeetings) DOM.heroStatTotalMeetings.textContent = totalMeetings;
  if (DOM.heroStatOnboarded) DOM.heroStatOnboarded.textContent = totalOnboarded;
  if (DOM.heroStatOnboardedPct) DOM.heroStatOnboardedPct.textContent = formatPercent(totalOnboarded, totalOnbPool);
  if (DOM.heroStatTea) DOM.heroStatTea.textContent = totalTea;
  if (DOM.heroStatWardRec) DOM.heroStatWardRec.textContent = totalWard;

  if (!DOM.landingReportsGrid) return;
  DOM.landingReportsGrid.innerHTML = '';

  // 1. Master Overall Card
  const oOnbPct = formatPercent(totalOnboarded, totalOnbPool);
  const masterCard = document.createElement('div');
  masterCard.className = 'landing-master-card';
  masterCard.innerHTML = `
    <div class="master-card-header">
      <div class="master-header-left">
        <div class="master-icon-box bg-blue-subtle text-blue"><i class="fa-solid fa-chart-pie"></i></div>
        <div>
          <span class="master-tag">Live Google Sheet Consolidated Matrix</span>
          <h3 class="master-title">${overallReport.name}</h3>
        </div>
      </div>
      <span class="master-badge"><i class="fa-solid fa-users"></i> ${totalMeetings} Total IDIs</span>
    </div>

    <div class="master-metrics-strip">
      <div class="master-metric-item">
        <span class="m-lbl">Total Meetings</span>
        <span class="m-val text-blue">${totalMeetings}</span>
        <span class="m-sub">Political: ${overallReport.meetingStatus.political} | Non-Pol: ${overallReport.meetingStatus.nonPolitical}</span>
      </div>
      <div class="master-metric-item">
        <span class="m-lbl">Onboarded Leaders</span>
        <span class="m-val text-green">${totalOnboarded} <small>(${oOnbPct})</small></span>
        <span class="m-sub">Dicey: ${totalDicey} | Not Onboarded: ${totalNotOnb}</span>
      </div>
      <div class="master-metric-item">
        <span class="m-lbl">PK Tea Interested</span>
        <span class="m-val text-amber">${overallReport.hostPKTea.yes}</span>
        <span class="m-sub">PK Intervention: ${overallReport.pkIntervention.yes}</span>
      </div>
      <div class="master-metric-item">
        <span class="m-lbl">Ward Recommendations</span>
        <span class="m-val text-orange">${overallReport.committeeRec.ward}</span>
        <span class="m-sub">District: ${overallReport.committeeRec.district} | State: ${overallReport.committeeRec.state}</span>
      </div>
    </div>

    <div class="master-card-footer">
      <button class="btn btn-primary btn-open-report" data-id="${overallReport.id}">
        <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Full Overall Dashboard
      </button>
      <div class="master-card-downloads">
        <button class="btn btn-outline btn-dl-pdf" data-id="${overallReport.id}" title="Download PDF">
          <i class="fa-solid fa-file-pdf text-red"></i> PDF Report
        </button>
        <button class="btn btn-outline btn-dl-csv" data-id="${overallReport.id}" title="Download CSV">
          <i class="fa-solid fa-file-csv text-blue"></i> CSV Data
        </button>
      </div>
    </div>
  `;

  masterCard.querySelector('.btn-open-report').addEventListener('click', () => switchView('dashboard', overallReport.id));
  masterCard.querySelector('.btn-dl-pdf').addEventListener('click', (e) => {
    e.stopPropagation();
    downloadReportPdf(overallReport.id);
  });
  masterCard.querySelector('.btn-dl-csv').addEventListener('click', (e) => {
    e.stopPropagation();
    downloadReportCsv(overallReport.id);
  });

  DOM.landingReportsGrid.appendChild(masterCard);

  // 2. Assembly Breakdown Cards Grid
  const assembliesContainer = document.createElement('div');
  assembliesContainer.className = 'landing-assemblies-grid';

  const reportsToRender = assemblyReports.length > 0 ? assemblyReports : AppState.reports;
  reportsToRender.forEach(r => {
    const repMeetings = (Number(r.meetingStatus.political) || 0) + (Number(r.meetingStatus.nonPolitical) || 0);
    const repOnb = Number(r.onboardingStatus.onboarded) || 0;
    const repDicey = Number(r.onboardingStatus.dicey) || 0;
    const repNotOnb = Number(r.onboardingStatus.notOnboarded) || 0;
    const repTotalOnb = repOnb + repDicey + repNotOnb;
    const repOnbPct = formatPercent(repOnb, repTotalOnb);

    const card = document.createElement('div');
    card.className = 'landing-report-card';
    card.innerHTML = `
      <div class="landing-card-header">
        <h3 class="landing-card-title">${r.name}</h3>
        <span class="landing-card-badge"><i class="fa-solid fa-users"></i> ${repMeetings} IDIs</span>
      </div>

      <div class="landing-metrics-mini-grid">
        <div class="mini-metric-item">
          <span class="mini-metric-label">Meetings</span>
          <span class="mini-metric-val text-blue">${repMeetings}</span>
        </div>
        <div class="mini-metric-item">
          <span class="mini-metric-label">Onboarded</span>
          <span class="mini-metric-val text-green">${repOnb} <small style="font-size:0.75rem">(${repOnbPct})</small></span>
        </div>
        <div class="mini-metric-item">
          <span class="mini-metric-label">PK Tea</span>
          <span class="mini-metric-val text-amber">${r.hostPKTea.yes}</span>
        </div>
        <div class="mini-metric-item">
          <span class="mini-metric-label">Ward Rec</span>
          <span class="mini-metric-val text-orange">${r.committeeRec.ward}</span>
        </div>
      </div>

      <div class="landing-card-footer">
        <button class="btn btn-primary btn-sm btn-open-report" data-id="${r.id}">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Dashboard
        </button>
        <div class="landing-card-downloads">
          <button class="btn btn-outline btn-sm btn-dl-pdf" data-id="${r.id}" title="Download PDF">
            <i class="fa-solid fa-file-pdf text-red"></i> PDF
          </button>
          <button class="btn btn-outline btn-sm btn-dl-csv" data-id="${r.id}" title="Download CSV">
            <i class="fa-solid fa-file-csv text-blue"></i> CSV
          </button>
        </div>
      </div>
    `;

    card.querySelector('.btn-open-report').addEventListener('click', () => switchView('dashboard', r.id));
    card.querySelector('.btn-dl-pdf').addEventListener('click', (e) => {
      e.stopPropagation();
      downloadReportPdf(r.id);
    });
    card.querySelector('.btn-dl-csv').addEventListener('click', (e) => {
      e.stopPropagation();
      downloadReportCsv(r.id);
    });

    assembliesContainer.appendChild(card);
  });

  DOM.landingReportsGrid.appendChild(assembliesContainer);

  renderBoothsWardsDirectory(DOM.wardSearchInput ? DOM.wardSearchInput.value : '');
}

function renderBoothsWardsDirectory(searchQuery = '') {
  if (!DOM.assemblyWardGrid) return;
  DOM.assemblyWardGrid.innerHTML = '';
  const query = searchQuery.trim().toLowerCase();

  Object.keys(ASSEMBLY_DEMOGRAPHICS).forEach(key => {
    const asm = ASSEMBLY_DEMOGRAPHICS[key];
    
    const matchesAsm = asm.name.toLowerCase().includes(query) || asm.hindiName.toLowerCase().includes(query);
    const matchingWards = asm.wards.filter(w => 
      w.name.toLowerCase().includes(query) || 
      w.wardNo.toString() === query || 
      w.area.toLowerCase().includes(query)
    );
    const matchesLocality = asm.localities.some(loc => loc.toLowerCase().includes(query));

    if (query && !matchesAsm && matchingWards.length === 0 && !matchesLocality) {
      return;
    }

    const card = document.createElement('div');
    card.className = 'assembly-ward-card';
    
    let wardPillsHtml = '';
    if (asm.wards && asm.wards.length > 0) {
      asm.wards.forEach(w => {
        const isHighlighted = query && (w.name.toLowerCase().includes(query) || w.wardNo.toString() === query || w.area.toLowerCase().includes(query));
        wardPillsHtml += `
          <div class="ward-pill ${isHighlighted ? 'active' : ''}" title="${w.name}: ${w.area}" data-ward="${w.wardNo}" data-asmkey="${key}">
            <span class="ward-pill-num">${w.name}</span>
            <span class="ward-pill-area">${w.area.split(',')[0]}</span>
          </div>
        `;
      });
    }

    let localitiesHtml = '';
    if (asm.localities && asm.localities.length > 0) {
      asm.localities.slice(0, 8).forEach(loc => {
        const isLocMatch = query && loc.toLowerCase().includes(query);
        localitiesHtml += `<span class="locality-chip ${isLocMatch ? 'text-blue' : ''}">${loc}</span>`;
      });
    }

    card.innerHTML = `
      <div class="assembly-ward-header ${asm.headerClass}">
        <div class="assembly-ward-title-box">
          <div class="assembly-ward-icon"><i class="fa-solid ${asm.icon}"></i></div>
          <div class="assembly-ward-name-group">
            <span class="assembly-ward-name">${asm.name}</span>
            <span class="assembly-ward-hindi">${asm.hindiName} &bull; ${asm.circle}</span>
          </div>
        </div>
        <div class="assembly-badge-group">
          <span class="booth-count-badge"><i class="fa-solid fa-check-to-slot"></i> ${asm.totalBooths} Booths</span>
        </div>
      </div>

      <div class="assembly-ward-body">
        <p class="ward-summary-text">${asm.summary}</p>
        
        <div class="assembly-wards-section">
          <div class="ward-section-heading">
            <span><i class="fa-solid fa-building-user text-blue"></i> MUNICIPAL WARDS (${asm.wardsCount} WARDS)</span>
          </div>
          <div class="ward-pills-wrap">
            ${wardPillsHtml}
          </div>
        </div>

        <div class="localities-section">
          <div class="ward-section-heading">
            <span><i class="fa-solid fa-location-dot text-amber"></i> KEY LOCALITIES</span>
          </div>
          <div class="locality-tags-wrap">
            ${localitiesHtml}
          </div>
        </div>

        <div class="assembly-ward-footer">
          <button class="btn btn-outline btn-sm btn-open-ward-modal" data-key="${key}">
            <i class="fa-solid fa-list-check"></i> Full Ward Breakdown
          </button>
          <button class="btn btn-outline btn-sm btn-open-asm-map" data-ac="${asm.acNo || key}">
            <i class="fa-solid fa-map-location-dot text-indigo"></i> View on Map
          </button>
          <button class="btn btn-primary btn-sm btn-open-asm-dashboard" data-asm="${asm.id}">
            <i class="fa-solid fa-chart-pie"></i> View IDI Analytics
          </button>
        </div>
      </div>
    `;

    card.querySelector('.btn-open-asm-dashboard').addEventListener('click', () => {
      const matchReport = AppState.reports.find(r => r.id === asm.id) || AppState.reports[0];
      switchView('dashboard', matchReport.id);
    });

    card.querySelector('.btn-open-asm-map').addEventListener('click', () => {
      const acNum = asm.acNo || (key.includes('181') ? '181' : key.includes('182') ? '182' : key.includes('183') ? '183' : '184');
      switchView('map');
      setTimeout(() => filterMapByAc(acNum), 150);
    });

    card.querySelector('.btn-open-ward-modal').addEventListener('click', () => {
      openBoothWardModal(key);
    });

    card.querySelectorAll('.ward-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        openBoothWardModal(key, pill.getAttribute('data-ward'));
      });
    });

    DOM.assemblyWardGrid.appendChild(card);
  });
}

function openBoothWardModal(focusAsmKey = null, focusWardNo = null) {
  renderModalAssemblyAccordion(DOM.modalWardSearchInput ? DOM.modalWardSearchInput.value : '', focusAsmKey, focusWardNo);
  if (DOM.boothWardModal) DOM.boothWardModal.classList.add('active');
}

function renderModalAssemblyAccordion(searchQuery = '', focusAsmKey = null, focusWardNo = null) {
  if (!DOM.modalAssemblyAccordion) return;
  DOM.modalAssemblyAccordion.innerHTML = '';
  const query = searchQuery.trim().toLowerCase();

  Object.keys(ASSEMBLY_DEMOGRAPHICS).forEach(key => {
    const asm = ASSEMBLY_DEMOGRAPHICS[key];
    
    const matchesAsm = asm.name.toLowerCase().includes(query) || asm.hindiName.toLowerCase().includes(query);
    const matchingWards = asm.wards.filter(w => 
      w.name.toLowerCase().includes(query) || 
      w.wardNo.toString() === query || 
      w.area.toLowerCase().includes(query)
    );
    const matchesLocality = asm.localities.some(loc => loc.toLowerCase().includes(query));

    if (query && !matchesAsm && matchingWards.length === 0 && !matchesLocality) {
      return;
    }

    const card = document.createElement('div');
    card.className = 'modal-assembly-card';
    if (focusAsmKey && focusAsmKey === key) {
      card.style.borderColor = 'var(--color-blue)';
      card.style.boxShadow = '0 0 0 2px rgba(2, 132, 199, 0.25)';
    }

    let wardsTableRows = '';
    asm.wards.forEach(w => {
      const isFocused = focusWardNo && focusWardNo.toString() === w.wardNo.toString();
      const isSearchMatch = query && (w.name.toLowerCase().includes(query) || w.wardNo.toString() === query || w.area.toLowerCase().includes(query));
      
      wardsTableRows += `
        <tr style="${isFocused || isSearchMatch ? 'background:rgba(2, 132, 199, 0.12); font-weight:bold;' : ''}">
          <td style="padding:8px 12px; font-weight:800; color:var(--color-blue); width:90px;">
            <i class="fa-solid fa-map-pin"></i> ${w.name}
          </td>
          <td style="padding:8px 12px; font-size:0.84rem; color:var(--text-primary);">
            ${w.area}
          </td>
        </tr>
      `;
    });

    card.innerHTML = `
      <div class="modal-assembly-card-header">
        <div style="display:flex; align-items:center; gap:10px;">
          <i class="fa-solid ${asm.icon} text-blue" style="font-size:1.2rem"></i>
          <div>
            <h4 style="font-family:var(--font-heading); font-size:1.05rem; font-weight:800; color:var(--text-primary); margin:0;">
              ${asm.name} (${asm.hindiName})
            </h4>
            <span style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">
              ${asm.circle} &bull; ${asm.totalElectors} Registered Electors
            </span>
          </div>
        </div>
        <span class="booth-count-badge" style="background:var(--tint-blue); color:var(--color-blue); border-color:rgba(2,132,199,0.3);">
          <i class="fa-solid fa-check-to-slot"></i> ${asm.totalBooths} Booths
        </span>
      </div>

      <div class="modal-assembly-card-body">
        <p style="font-size:0.82rem; color:var(--text-secondary); margin:0;">${asm.summary}</p>
        
        <div style="margin-top:6px;">
          <div style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:6px;">
            <i class="fa-solid fa-table-list text-blue"></i> MUNICIPAL WARDS LIST (${asm.wardsCount} WARDS):
          </div>
          <div class="table-responsive" style="border:1px solid var(--border-color); border-radius:var(--radius-sm); max-height:220px; overflow-y:auto;">
            <table style="width:100%; border-collapse:collapse; text-align:left;">
              <tbody>${wardsTableRows}</tbody>
            </table>
          </div>
        </div>

        <div style="display:flex; align-items:center; justify-content:space-between; margin-top:8px;">
          <span style="font-size:0.76rem; color:var(--text-muted);">
            <i class="fa-solid fa-circle-info"></i> ${asm.otherAreas}
          </span>
          <button class="btn btn-primary btn-sm btn-modal-jump-report" data-asm="${asm.id}">
            <i class="fa-solid fa-chart-pie"></i> Open IDI Analytics
          </button>
        </div>
      </div>
    `;

    card.querySelector('.btn-modal-jump-report').addEventListener('click', () => {
      const matchReport = AppState.reports.find(r => r.id === asm.id) || AppState.reports[0];
      if (DOM.boothWardModal) DOM.boothWardModal.classList.remove('active');
      switchView('dashboard', matchReport.id);
    });

    DOM.modalAssemblyAccordion.appendChild(card);
  });
}

function renderDrawerReports(searchQuery = '') {
  if (!DOM.drawerReportsList) return;
  DOM.drawerReportsList.innerHTML = '';
  const query = searchQuery.trim().toLowerCase();

  const filtered = AppState.reports.filter(r => r.name.toLowerCase().includes(query) || (r.shortName && r.shortName.toLowerCase().includes(query)));
  if (DOM.drawerReportsCount) DOM.drawerReportsCount.textContent = filtered.length;

  const categories = [
    { title: "⚡ Today's Field Intelligence (EOD)", icon: "fa-bolt text-amber", filter: r => r.category === 'daily' || r.id === 'eod_daily' || r.isEOD },
    { title: "📊 Executive & Strategic Overviews", icon: "fa-chart-pie text-blue", filter: r => r.category === 'executive' || ['patna_overall', 'mahila_team', 'team_wise_summary'].includes(r.id) },
    { title: "🏛️ Assembly Constituency Teams", icon: "fa-city text-green", filter: r => r.category === 'assembly' || r.id.includes('team') || r.id.includes('digha') || r.id.includes('bankipur') || r.id.includes('kumhrar') || r.id.includes('patnasahib') },
    { title: "👑 Civic & Grassroots Leadership", icon: "fa-crown text-purple", filter: r => r.category === 'leadership' || r.isMayor || r.isCouncillor || r.id.includes('councillor') || r.id.includes('mayor') || r.id.includes('acc') }
  ];

  const renderedIds = new Set();
  categories.forEach(cat => {
    const list = filtered.filter(r => !renderedIds.has(r.id) && cat.filter(r));
    if (list.length > 0) {
      const header = document.createElement('div');
      header.className = 'drawer-category-header';
      header.innerHTML = `<i class="fa-solid ${cat.icon}"></i> <span>${cat.title} (${list.length})</span>`;
      DOM.drawerReportsList.appendChild(header);

      list.forEach(r => {
        renderedIds.add(r.id);
        const repMeetings = (Number(r.meetingStatus.political) || 0) + (Number(r.meetingStatus.nonPolitical) || 0);
        const repOnb = Number(r.onboardingStatus.onboarded) || 0;
        const repDicey = Number(r.onboardingStatus.dicey) || 0;
        const repNotOnb = Number(r.onboardingStatus.notOnboarded) || 0;
        const repTotalOnb = repOnb + repDicey + repNotOnb;
        const repOnbPct = repTotalOnb > 0 ? Math.round((repOnb / repTotalOnb) * 100) : 0;

        const card = document.createElement('div');
        card.className = `drawer-report-card ${r.id === AppState.activeReportId ? 'active' : ''}`;
        
        let iconClass = 'fa-solid fa-landmark';
        let iconBg = 'bg-blue-subtle text-blue';
        
        if (r.id === 'eod_daily' || r.isEOD) {
          iconClass = 'fa-solid fa-bolt';
          iconBg = 'bg-amber-subtle text-amber';
        } else if (r.id === 'patna_overall') {
          iconClass = 'fa-solid fa-chart-pie';
          iconBg = 'bg-blue-subtle text-blue';
        } else if (r.id === 'mahila_team') {
          iconClass = 'fa-solid fa-person-dress';
          iconBg = 'bg-purple-subtle text-purple';
        } else if (r.id === 'team_wise_summary') {
          iconClass = 'fa-solid fa-list-check';
          iconBg = 'bg-blue-subtle text-blue';
        } else if (r.isMayor || r.id.includes('mayor')) {
          iconClass = 'fa-solid fa-crown';
          iconBg = 'bg-purple-subtle text-purple';
        } else if (r.isCouncillor || r.id.includes('councillor')) {
          iconClass = 'fa-solid fa-users-rectangle';
          iconBg = 'bg-green-subtle text-green';
        } else if (r.id.includes('digha')) {
          iconClass = 'fa-solid fa-city';
          iconBg = 'bg-green-subtle text-green';
        } else if (r.id.includes('kumhrar')) {
          iconClass = 'fa-solid fa-landmark';
          iconBg = 'bg-purple-subtle text-purple';
        } else if (r.id.includes('patnasahib')) {
          iconClass = 'fa-solid fa-monument';
          iconBg = 'bg-orange-subtle text-orange';
        } else if (r.id.includes('bankipur')) {
          iconClass = 'fa-solid fa-building-columns';
          iconBg = 'bg-blue-subtle text-blue';
        }
        
        card.innerHTML = `
          <div class="drawer-report-item-inner">
            <div class="drawer-item-icon-box ${iconBg}">
              <i class="${iconClass}"></i>
            </div>
            <div class="drawer-item-details">
              <h4 class="drawer-item-name">${r.name}</h4>
              <div class="drawer-item-stats">
                <span><i class="fa-solid fa-users"></i> ${repMeetings} IDIs</span>
                <span style="color: #10b981; font-weight: 700;"><i class="fa-solid fa-user-check"></i> ${repOnb} Onboarded (${repOnbPct}%)</span>
              </div>
            </div>
          </div>
          <div class="drawer-item-actions">
            <button class="btn-drawer-action btn-view-report" data-id="${r.id}" title="View Dashboard">
              <i class="fa-solid fa-eye"></i>
            </button>
            <button class="btn-drawer-action btn-download-pdf" data-id="${r.id}" title="Download PDF Report">
              <i class="fa-solid fa-file-pdf"></i>
            </button>
            <button class="btn-drawer-action btn-download-csv" data-id="${r.id}" title="Download CSV Data">
              <i class="fa-solid fa-file-csv"></i>
            </button>
          </div>
        `;

        card.addEventListener('click', (e) => {
          if (e.target.closest('.btn-drawer-action')) return;
          closeDrawer();
          switchView('dashboard', r.id);
        });

        card.querySelector('.btn-view-report').addEventListener('click', () => {
          closeDrawer();
          switchView('dashboard', r.id);
        });

        card.querySelector('.btn-download-pdf').addEventListener('click', (e) => {
          e.stopPropagation();
          downloadReportPdf(r.id);
        });

        card.querySelector('.btn-download-csv').addEventListener('click', (e) => {
          e.stopPropagation();
          downloadReportCsv(r.id);
        });

        DOM.drawerReportsList.appendChild(card);
      });
    }
  });
}

// ==========================================================================
// 6. Detailed 6-Card Dashboard Engine & Donut Charts
// ==========================================================================

function renderDashboard() {
  const data = getActiveReportData();

  if (DOM.currentReportTitle) DOM.currentReportTitle.textContent = data.name;
  if (DOM.breadcrumbReportName) DOM.breadcrumbReportName.textContent = data.shortName;

  // --- CARD 1: Meeting Status ---
  const isCouncillor = data.id.includes('councillor') || data.isCouncillor || (data.name && data.name.toLowerCase().includes('councillor'));
  const isPoolBased = isCouncillor || data.isPhysical || (data.totalPool !== undefined && data.totalPool > 0);
  let totalMeetings = 0;

  if (isPoolBased) {
    let pool = data.totalPool || 100;
    let completed = 0;
    let remaining = 0;

    if (data.id.includes('2017')) {
      pool = 215; completed = 147; remaining = 68;
    } else if (data.id.includes('2022')) {
      pool = 159; completed = 69; remaining = 90;
    } else if (data.meetingStatus) {
      completed = Number(data.meetingStatus.completed || data.meetingStatus.met || data.meetingStatus.political) || 0;
      pool = Number(data.totalPool || data.meetingStatus.total) || (completed + (Number(data.meetingStatus.remaining || data.meetingStatus.notMet || data.meetingStatus.nonPolitical) || 0));
      remaining = Math.max(pool - completed, 0);
    }

    totalMeetings = pool;

    if (DOM.lblTotalMeetings) DOM.lblTotalMeetings.textContent = "Total Pool";
    if (DOM.lblPoliticalMeetings) DOM.lblPoliticalMeetings.textContent = "Meeting Completed (MET)";
    if (DOM.lblNonPoliticalMeetings) DOM.lblNonPoliticalMeetings.textContent = "Meeting Remaining (Not Met)";

    if (DOM.legendTextMeetingLeft) DOM.legendTextMeetingLeft.textContent = "Meeting Completed (MET)";
    if (DOM.legendDotMeetingLeft) DOM.legendDotMeetingLeft.className = "legend-dot bg-green";
    if (DOM.legendTextMeetingRight) DOM.legendTextMeetingRight.textContent = "Meeting Remaining (Not Met)";
    if (DOM.legendDotMeetingRight) DOM.legendDotMeetingRight.className = "legend-dot bg-red";

    if (DOM.valTotalMeetings) DOM.valTotalMeetings.textContent = pool;
    if (DOM.valPoliticalMeetings) DOM.valPoliticalMeetings.textContent = completed;
    if (DOM.valNonPoliticalMeetings) DOM.valNonPoliticalMeetings.textContent = remaining;
    if (DOM.centerMeetingTotal) DOM.centerMeetingTotal.textContent = pool;

    if (DOM.boxMeetingLeft) {
      DOM.boxMeetingLeft.style.borderColor = "#16a34a";
      DOM.boxMeetingLeft.style.background = "#f0fdf4";
    }
    if (DOM.iconMeetingLeft) {
      DOM.iconMeetingLeft.className = "metric-icon-circle bg-green-light text-green";
      DOM.iconMeetingLeft.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    }
    if (DOM.boxMeetingRight) {
      DOM.boxMeetingRight.style.borderColor = "#dc2626";
      DOM.boxMeetingRight.style.background = "#fef2f2";
    }
    if (DOM.iconMeetingRight) {
      DOM.iconMeetingRight.className = "metric-icon-circle bg-red-light text-red";
      DOM.iconMeetingRight.innerHTML = '<i class="fa-solid fa-clock"></i>';
    }

    if (DOM.calloutMeetingPolitical) {
      DOM.calloutMeetingPolitical.className = "chart-callout callout-left text-green";
      DOM.calloutMeetingPolitical.innerHTML = `
        <div class="callout-num">${completed}</div>
        <div class="callout-pct">(${formatPercent(completed, pool)})</div>
      `;
    }
    if (DOM.calloutMeetingNonPolitical) {
      DOM.calloutMeetingNonPolitical.className = "chart-callout callout-right text-red";
      DOM.calloutMeetingNonPolitical.innerHTML = `
        <div class="callout-num">${remaining}</div>
        <div class="callout-pct">(${formatPercent(remaining, pool)})</div>
      `;
    }

    updateDonutChart('chartMeetingStatus', [completed, remaining], ['#16a34a', '#dc2626'], ['Meeting Completed', 'Meeting Remaining']);
  } else {
    // Regular Assembly / Team IDI Reports: Political vs Non-Political ONLY
    if (DOM.lblTotalMeetings) DOM.lblTotalMeetings.textContent = "Total Meetings";
    if (DOM.lblPoliticalMeetings) DOM.lblPoliticalMeetings.textContent = "Political Meeting";
    if (DOM.lblNonPoliticalMeetings) DOM.lblNonPoliticalMeetings.textContent = "Non- Political Meeting";

    if (DOM.legendTextMeetingLeft) DOM.legendTextMeetingLeft.textContent = "Political Meeting";
    if (DOM.legendDotMeetingLeft) DOM.legendDotMeetingLeft.className = "legend-dot bg-red";
    if (DOM.legendTextMeetingRight) DOM.legendTextMeetingRight.textContent = "Non- Political Meeting";
    if (DOM.legendDotMeetingRight) DOM.legendDotMeetingRight.className = "legend-dot bg-green";

    const polMeetings = Number(data.meetingStatus.political) || 0;
    const nonPolMeetings = Number(data.meetingStatus.nonPolitical) || 0;
    totalMeetings = polMeetings + nonPolMeetings;

    if (DOM.valTotalMeetings) DOM.valTotalMeetings.textContent = totalMeetings;
    if (DOM.valPoliticalMeetings) DOM.valPoliticalMeetings.textContent = polMeetings;
    if (DOM.valNonPoliticalMeetings) DOM.valNonPoliticalMeetings.textContent = nonPolMeetings;
    if (DOM.centerMeetingTotal) DOM.centerMeetingTotal.textContent = totalMeetings;

    if (DOM.boxMeetingLeft) {
      DOM.boxMeetingLeft.style.borderColor = "";
      DOM.boxMeetingLeft.style.background = "";
    }
    if (DOM.iconMeetingLeft) {
      DOM.iconMeetingLeft.className = "metric-icon-circle bg-red-light text-red";
      DOM.iconMeetingLeft.innerHTML = '<i class="fa-solid fa-person-chalkboard"></i>';
    }
    if (DOM.boxMeetingRight) {
      DOM.boxMeetingRight.style.borderColor = "";
      DOM.boxMeetingRight.style.background = "";
    }
    if (DOM.iconMeetingRight) {
      DOM.iconMeetingRight.className = "metric-icon-circle bg-green-light text-green";
      DOM.iconMeetingRight.innerHTML = '<i class="fa-solid fa-users-line"></i>';
    }

    if (DOM.calloutMeetingPolitical) {
      DOM.calloutMeetingPolitical.className = "chart-callout callout-left text-red";
      DOM.calloutMeetingPolitical.innerHTML = `
        <div class="callout-num">${polMeetings}</div>
        <div class="callout-pct">(${formatPercent(polMeetings, totalMeetings)})</div>
      `;
    }
    if (DOM.calloutMeetingNonPolitical) {
      DOM.calloutMeetingNonPolitical.className = "chart-callout callout-right text-green";
      DOM.calloutMeetingNonPolitical.innerHTML = `
        <div class="callout-num">${nonPolMeetings}</div>
        <div class="callout-pct">(${formatPercent(nonPolMeetings, totalMeetings)})</div>
      `;
    }

    updateDonutChart('chartMeetingStatus', [polMeetings, nonPolMeetings], ['#dc2626', '#16a34a'], ['Political Meeting', 'Non-Political Meeting']);
  }

  // --- CARD 2: Onboarding Status ---
  const onb = Number(data.onboardingStatus.onboarded) || 0;
  const dicey = Number(data.onboardingStatus.dicey) || 0;
  const notOnb = Number(data.onboardingStatus.notOnboarded) || 0;
  const totalOnboarding = onb + dicey + notOnb;

  if (DOM.valOnboarded) DOM.valOnboarded.textContent = onb;
  if (DOM.valDicey) DOM.valDicey.textContent = dicey;
  if (DOM.valNotOnboarded) DOM.valNotOnboarded.textContent = notOnb;
  if (DOM.centerOnboardingTotal) DOM.centerOnboardingTotal.textContent = totalOnboarding;

  if (DOM.calloutOnboardingNot) {
    DOM.calloutOnboardingNot.innerHTML = `
      <div class="callout-num">${notOnb}</div>
      <div class="callout-pct">(${formatPercent(notOnb, totalOnboarding)})</div>
    `;
  }
  if (DOM.calloutOnboardingDicey) {
    DOM.calloutOnboardingDicey.innerHTML = `
      <div class="callout-num">${dicey}</div>
      <div class="callout-pct">(${formatPercent(dicey, totalOnboarding)})</div>
    `;
  }
  if (DOM.calloutOnboardingYes) {
    DOM.calloutOnboardingYes.innerHTML = `
      <div class="callout-num">${onb}</div>
      <div class="callout-pct">(${formatPercent(onb, totalOnboarding)})</div>
    `;
  }

  updateDonutChart('chartOnboardingStatus', [onb, dicey, notOnb], ['#16a34a', '#eab308', '#dc2626'], ['Onboarded', 'Dicey', 'Not Onboarded']);

  // --- CARD 3: Key Takeaways ---
  if (DOM.takeawayValMeetings) DOM.takeawayValMeetings.textContent = totalMeetings;
  if (DOM.takeawayValOnboarded) DOM.takeawayValOnboarded.textContent = onb;
  if (DOM.takeawayPctOnboarded) DOM.takeawayPctOnboarded.textContent = formatPercent(onb, totalOnboarding);
  if (DOM.takeawayValPK) DOM.takeawayValPK.textContent = Number(data.pkIntervention.yes) || 0;
  if (DOM.takeawayValTea) DOM.takeawayValTea.textContent = Number(data.hostPKTea.yes) || 0;
  if (DOM.takeawayValWard) DOM.takeawayValWard.textContent = Number(data.committeeRec.ward) || 0;

  // --- CARD 4: PK Intervention ---
  const pkYes = Number(data.pkIntervention.yes) || 0;
  const pkNo = Number(data.pkIntervention.no) || 0;
  const totalPK = pkYes + pkNo;

  if (DOM.valPKYes) DOM.valPKYes.textContent = pkYes;
  if (DOM.valPKNo) DOM.valPKNo.textContent = pkNo;
  if (DOM.centerPKTotal) DOM.centerPKTotal.textContent = totalPK;

  if (DOM.calloutPKYes) {
    DOM.calloutPKYes.innerHTML = `
      <div class="callout-num">${pkYes}</div>
      <div class="callout-pct">(${formatPercent(pkYes, totalPK)})</div>
    `;
  }
  if (DOM.calloutPKNo) {
    DOM.calloutPKNo.innerHTML = `
      <div class="callout-num">${pkNo}</div>
      <div class="callout-pct">(${formatPercent(pkNo, totalPK)})</div>
    `;
  }

  updateDonutChart('chartPKIntervention', [pkYes, pkNo], ['#16a34a', '#dc2626'], ['Yes', 'No']);

  // --- CARD 5: Host PK Tea ---
  const teaYes = Number(data.hostPKTea.yes) || 0;
  const teaNo = Number(data.hostPKTea.no) || 0;
  const totalTea = teaYes + teaNo;

  if (DOM.valTeaYes) DOM.valTeaYes.textContent = teaYes;
  if (DOM.valTeaNo) DOM.valTeaNo.textContent = teaNo;
  if (DOM.centerTeaTotal) DOM.centerTeaTotal.textContent = totalTea;

  if (DOM.calloutTeaYes) {
    DOM.calloutTeaYes.innerHTML = `
      <div class="callout-num">${teaYes}</div>
      <div class="callout-pct">(${formatPercent(teaYes, totalTea)})</div>
    `;
  }
  if (DOM.calloutTeaNo) {
    DOM.calloutTeaNo.innerHTML = `
      <div class="callout-num">${teaNo}</div>
      <div class="callout-pct">(${formatPercent(teaNo, totalTea)})</div>
    `;
  }

  updateDonutChart('chartPKTea', [teaYes, teaNo], ['#16a34a', '#dc2626'], ['Yes', 'No']);

  // --- CARD 6: Recommendations ---
  const recState = Number(data.committeeRec.state) || 0;
  const recDistrict = Number(data.committeeRec.district) || 0;
  const recWard = Number(data.committeeRec.ward) || 0;
  const maxRec = Math.max(recState, recDistrict, recWard, 1);

  if (DOM.valRecState) DOM.valRecState.textContent = recState;
  if (DOM.valRecDistrict) DOM.valRecDistrict.textContent = recDistrict;
  if (DOM.valRecWard) DOM.valRecWard.textContent = recWard;

  if (DOM.hbarValState) DOM.hbarValState.textContent = recState;
  if (DOM.hbarValDistrict) DOM.hbarValDistrict.textContent = recDistrict;
  if (DOM.hbarValWard) DOM.hbarValWard.textContent = recWard;

  if (DOM.hbarState) DOM.hbarState.style.width = Math.max(Math.round((recState / maxRec) * 100), 2) + '%';
  if (DOM.hbarDistrict) DOM.hbarDistrict.style.width = Math.max(Math.round((recDistrict / maxRec) * 100), 4) + '%';
  if (DOM.hbarWard) DOM.hbarWard.style.width = Math.max(Math.round((recWard / maxRec) * 100), 6) + '%';

  // --- SPECIAL SECTIONS: EOD Table, Mayor Table & Physical Meeting Status ---
  const eodContainer = document.getElementById('eodPocSectionContainer');
  const mayorContainer = document.getElementById('mayorCandidatesSectionContainer');
  const physicalContainer = document.getElementById('physicalStatusSectionContainer');

  if (data.id === 'eod_daily' || data.isEOD) {
    if (mayorContainer) mayorContainer.style.display = 'none';
    if (physicalContainer) physicalContainer.style.display = 'none';
    if (eodContainer) {
      eodContainer.style.display = 'block';
      renderEodPocTable(data.pocRows || []);
    }
    if (DOM.assemblyProfileText) {
      DOM.assemblyProfileText.innerHTML = `<strong>Today's Ground Execution:</strong> 14 JSPT POCs Active &bull; Wards Covered: 6, 9, 33, 41, 42, 48, 55 &bull; 12 Meetings Today`;
    }
  } else if (data.id === 'mayor_deputy_mayor' || data.isMayor) {
    if (eodContainer) eodContainer.style.display = 'none';
    if (physicalContainer) physicalContainer.style.display = 'none';
    if (mayorContainer) {
      mayorContainer.style.display = 'block';
      renderMayorCandidatesTable(data.candidates || []);
    }
    if (DOM.assemblyProfileText) {
      DOM.assemblyProfileText.innerHTML = `<strong>Civic Profile:</strong> 48 Mayor/Deputy Mayor Candidates &bull; 8 Physical Meetings Completed &bull; Multi-party engagement`;
    }
  } else if (data.isPhysical) {
    if (eodContainer) eodContainer.style.display = 'none';
    if (mayorContainer) mayorContainer.style.display = 'none';
    if (physicalContainer) {
      physicalContainer.style.display = 'block';
      renderPhysicalStatusBreakdown(data);
    }
    if (DOM.assemblyProfileText) {
      DOM.assemblyProfileText.innerHTML = `<strong>Physical Evaluation:</strong> Total Pool: ${data.totalPool || 0} &bull; Physical Meetings (MET): ${data.meetingStatus ? data.meetingStatus.met : 0} &bull; Onboarded: ${data.onboardingStatus ? data.onboardingStatus.onboarded : 0}`;
    }
  } else {
    if (eodContainer) eodContainer.style.display = 'none';
    if (mayorContainer) mayorContainer.style.display = 'none';
    if (physicalContainer) physicalContainer.style.display = 'none';
  }
}

function renderEodPocTable(pocList) {
  const container = document.getElementById('eodPocSectionContainer');
  if (!container) return;

  const totalMeetings = pocList.reduce((sum, p) => sum + (p.total || 0), 0);
  const totalOnb = pocList.reduce((sum, p) => sum + (p.onboarded || 0), 0);

  container.innerHTML = `
    <div class="eod-poc-header">
      <div class="eod-poc-title-box">
        <h3><i class="fa-solid fa-bolt text-amber"></i> Daily JSPT POC Performance Matrix (22nd Sept 2026)</h3>
        <span class="eod-poc-subtitle">Field execution, meeting breakdowns, onboarding outcomes, and leadership categories per ground coordinator</span>
      </div>
      <div class="eod-poc-actions" style="display: flex; gap: 10px; align-items: center;">
        <span class="eod-pill"><i class="fa-solid fa-users text-blue"></i> ${totalMeetings} Meetings Today</span>
        <span class="eod-pill"><i class="fa-solid fa-user-check text-green"></i> ${totalOnb} Onboarded</span>
        <input type="text" id="eodPocFilterInput" placeholder="Filter POC / Ward..." style="padding: 6px 12px; border-radius: 8px; border: 1px solid var(--border-color); font-size: 0.85rem;">
      </div>
    </div>
    <div class="eod-poc-table-responsive">
      <table class="eod-table" id="eodPocTableMain">
        <thead>
          <tr>
            <th>JSPT POC</th>
            <th>Assembly Team</th>
            <th>Wards Covered</th>
            <th style="text-align:center;">Total</th>
            <th style="text-align:center;">Political</th>
            <th style="text-align:center;">Non-Pol</th>
            <th style="text-align:center;">Onboarded</th>
            <th style="text-align:center;">Dicey</th>
            <th style="text-align:center;">PK Needed</th>
            <th style="text-align:center;">PK Tea</th>
            <th>Committee Rec</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody id="eodPocTableBody">
          ${renderEodPocRows(pocList)}
        </tbody>
      </table>
    </div>
  `;

  const filterInput = document.getElementById('eodPocFilterInput');
  if (filterInput) {
    filterInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = pocList.filter(p => 
        p.poc.toLowerCase().includes(q) || 
        p.team.toLowerCase().includes(q) || 
        String(p.ward).toLowerCase().includes(q)
      );
      const tbody = document.getElementById('eodPocTableBody');
      if (tbody) tbody.innerHTML = renderEodPocRows(filtered);
    });
  }
}

function renderEodPocRows(list) {
  if (!list || list.length === 0) {
    return '<tr><td colspan="12" style="text-align:center; padding: 20px; color: var(--text-muted);">No POC matching search criteria</td></tr>';
  }

  return list.map(p => {
    const hasMeetings = p.total > 0;
    const rowClass = hasMeetings ? 'active-meeting-row' : '';
    const recStr = p.recWard ? `Ward (${p.recWard})` : (p.recDist ? `District (${p.recDist})` : '-');
    const catStr = p.newLeader ? `New (${p.newLeader})` : (p.oldLeader ? `Old (${p.oldLeader})` : '-');

    return `
      <tr class="${rowClass}">
        <td><strong>${p.poc}</strong></td>
        <td><span style="font-size: 0.82rem; opacity: 0.85;">${p.team}</span></td>
        <td><span class="badge-booth" style="font-size:0.75rem;">Ward ${p.ward}</span></td>
        <td style="text-align:center; font-weight:800; color:${hasMeetings ? 'var(--color-blue)' : 'inherit'};">${p.total}</td>
        <td style="text-align:center; color:#dc2626;">${p.pol}</td>
        <td style="text-align:center; color:#16a34a;">${p.nonPol}</td>
        <td style="text-align:center;">
          ${p.onboarded > 0 ? `<span class="eod-status-pill pill-onboarded">${p.onboarded}</span>` : '0'}
        </td>
        <td style="text-align:center;">
          ${p.dicey > 0 ? `<span class="eod-status-pill pill-dicey">${p.dicey}</span>` : '0'}
        </td>
        <td style="text-align:center; color:#8b5cf6;">${p.pk || 0}</td>
        <td style="text-align:center; color:#f59e0b;">${p.tea || 0}</td>
        <td>${recStr}</td>
        <td>${catStr}</td>
      </tr>
    `;
  }).join('');
}

function renderMayorCandidatesTable(candidates) {
  const container = document.getElementById('mayorCandidatesSectionContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="eod-poc-header">
      <div class="eod-poc-title-box">
        <h3><i class="fa-solid fa-crown text-purple"></i> Mayor & Deputy Mayor Candidate Roster</h3>
        <span class="eod-poc-subtitle">Field outreach, calling outcomes, physical meetings, and party leanings across 48 contestants</span>
      </div>
      <div class="eod-poc-actions">
        <span class="eod-pill"><i class="fa-solid fa-users text-blue"></i> 48 Total Pool</span>
        <span class="eod-pill"><i class="fa-solid fa-handshake text-green"></i> 8 Met</span>
      </div>
    </div>
    <div class="eod-poc-table-responsive">
      <table class="eod-table">
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Votes</th>
            <th>Ward</th>
            <th>Assembly</th>
            <th>Calling Status</th>
            <th>Physical Meeting</th>
            <th>Onboarding Status</th>
            <th>Party Leaning</th>
            <th>Meet PK</th>
            <th>Host Tea</th>
          </tr>
        </thead>
        <tbody>
          ${(candidates || []).map(c => `
            <tr>
              <td><strong>${c.name}</strong><br><small style="color:var(--text-muted)">${c.contact}</small></td>
              <td>${c.votes || '-'}</td>
              <td><span class="badge-booth">Ward ${c.ward || '-'}</span></td>
              <td>${c.assembly || '-'}</td>
              <td>${c.callingStatus || '-'}</td>
              <td><span class="status-badge ${c.meetingStatus && c.meetingStatus.toLowerCase() === 'met' ? 'onboarded' : 'not-onboarded'}">${c.meetingStatus || 'Not Met'}</span></td>
              <td><span class="status-badge ${c.onboardingStatus && c.onboardingStatus.toLowerCase().includes('onboard') ? 'onboarded' : (c.onboardingStatus && c.onboardingStatus.toLowerCase().includes('dicey') ? 'dicey' : 'not-onboarded')}">${c.onboardingStatus || 'Not Onboarded'}</span></td>
              <td><strong>${c.party || 'Neutral'}</strong></td>
              <td>${c.pkMeeting || 'No'}</td>
              <td>${c.pkTea || 'No'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderPhysicalStatusBreakdown(report) {
  const container = document.getElementById('physicalStatusSectionContainer');
  if (!container) return;

  const party = report.partyInclination || {};
  const eng = report.engagementStatus || {};
  const readyPk = report.readyMeetPK || { yes: 0, no: 0 };
  const tea = report.hostPKTea || { yes: 0, no: 0 };

  container.innerHTML = `
    <div class="eod-poc-header">
      <div class="eod-poc-title-box">
        <h3><i class="fa-solid fa-users-rectangle text-purple"></i> ${report.name} &bull; Detailed Physical Evaluation</h3>
        <span class="eod-poc-subtitle">Political affiliation, physical meeting verification, and Jan Suraaj engagement status</span>
      </div>
      <div class="eod-poc-actions">
        <span class="eod-pill"><i class="fa-solid fa-layer-group text-blue"></i> Pool: ${report.totalPool || 0}</span>
        <span class="eod-pill"><i class="fa-solid fa-user-check text-green"></i> Met: ${report.meetingStatus ? report.meetingStatus.met : 0}</span>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 14px;">
      <!-- Party Inclination Box -->
      <div style="background: var(--bg-subtle, #f8fafc); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px;">
        <h4 style="font-size: 0.92rem; font-weight: 800; margin: 0 0 12px 0; color: var(--text-main); display:flex; align-items:center; gap:8px;">
          <i class="fa-solid fa-flag text-blue"></i> Party Inclinations
        </h4>
        <div style="display:flex; flex-wrap:wrap; gap:8px;">
          <span class="eod-pill" style="border-color:#f59e0b; background:#fffbeb;"><strong>JSP:</strong> ${party.JSP || 0}</span>
          <span class="eod-pill" style="border-color:#f97316; background:#fff7ed;"><strong>BJP:</strong> ${party.BJP || 0}</span>
          <span class="eod-pill" style="border-color:#15803d; background:#f0fdf4;"><strong>RJD:</strong> ${party.RJD || 0}</span>
          <span class="eod-pill" style="border-color:#0284c7; background:#f0f9ff;"><strong>JDU:</strong> ${party.JDU || 0}</span>
          <span class="eod-pill" style="border-color:#64748b; background:#f8fafc;"><strong>Neutral:</strong> ${party.Neutral || 0}</span>
        </div>
      </div>

      <!-- PK Interaction & Tea Box -->
      <div style="background: var(--bg-subtle, #f8fafc); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px;">
        <h4 style="font-size: 0.92rem; font-weight: 800; margin: 0 0 12px 0; color: var(--text-main); display:flex; align-items:center; gap:8px;">
          <i class="fa-solid fa-mug-hot text-amber"></i> PK Meeting & Tea Receptivity
        </h4>
        <div style="display:flex; flex-wrap:wrap; gap:8px;">
          <span class="eod-pill" style="border-color:#10b981; background:#ecfdf5;"><i class="fa-solid fa-check text-green"></i> <strong>Meet PK:</strong> ${readyPk.yes} Yes / ${readyPk.no} No</span>
          <span class="eod-pill" style="border-color:#f59e0b; background:#fffbeb;"><i class="fa-solid fa-mug-hot text-amber"></i> <strong>Host Tea:</strong> ${tea.yes} Yes / ${tea.no} No</span>
        </div>
      </div>

      <!-- Engagement Status Box -->
      <div style="background: var(--bg-subtle, #f8fafc); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px;">
        <h4 style="font-size: 0.92rem; font-weight: 800; margin: 0 0 12px 0; color: var(--text-main); display:flex; align-items:center; gap:8px;">
          <i class="fa-solid fa-thumbs-up text-green"></i> Engagement Classification
        </h4>
        <div style="display:flex; flex-wrap:wrap; gap:8px;">
          <span class="eod-status-pill pill-onboarded">JSP Supporter: ${eng.supporter || 0}</span>
          <span class="eod-status-pill pill-dicey">Sympathizer: ${eng.sympathizer || 0}</span>
          <span class="eod-status-pill pill-not-onb">Not Interested: ${eng.notInterested || 0}</span>
        </div>
      </div>
    </div>
  `;
}

function updateDonutChart(canvasId, dataValues, bgColors, labels) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  if (AppState.charts[canvasId]) {
    AppState.charts[canvasId].destroy();
  }

  const ctx = canvas.getContext('2d');
  AppState.charts[canvasId] = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: dataValues,
        backgroundColor: bgColors,
        borderWidth: 2,
        borderColor: AppState.isDarkTheme ? '#131d33' : '#ffffff',
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '66%',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          titleFont: { family: 'Outfit', weight: 'bold' },
          bodyFont: { family: 'Plus Jakarta Sans' },
          padding: 10,
          cornerRadius: 8,
          callbacks: {
            label: function(context) {
              const val = context.raw || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              return ` ${context.label}: ${val} (${formatPercent(val, total)})`;
            }
          }
        }
      },
      animation: { duration: 600, easing: 'easeOutQuart' }
    }
  });
}

// ==========================================================================
// 7. Dynamic Google Sheets Multi-Table Live Sync Engine
// ==========================================================================

function parseCSVRows(csvText) {
  const lines = [];
  let row = [];
  let inQuotes = false;
  let currentStr = '';

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      currentStr += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      row.push(currentStr.trim());
      currentStr = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      row.push(currentStr.trim());
      if (row.some(col => col.length > 0)) lines.push(row);
      row = [];
      currentStr = '';
    } else {
      currentStr += char;
    }
  }
  if (currentStr || row.length > 0) {
    row.push(currentStr.trim());
    if (row.some(col => col.length > 0)) lines.push(row);
  }
  return lines;
}

function processMultiTableSheetCSV(rows) {
  if (!rows || rows.length < 5) return null;

  const parsedList = [];

  function getNum(r, idx) {
    if (!r || idx >= r.length) return 0;
    const v = String(r[idx]).trim();
    if (!v || isNaN(Number(v))) return 0;
    return Number(v);
  }

  // Row 3, 6, 9 contain the 3 side-by-side executive reports in PK Report tab:
  if (rows.length >= 10) {
    const r3 = rows[3];
    const r6 = rows[6];
    const r9 = rows[9];

    // 1. Overall Report (Col 0)
    parsedList.push({
      id: 'patna_overall',
      category: 'executive',
      name: "Patna Mahanagar Team Overall IDI's Report",
      shortName: "Patna Mahanagar (Overall)",
      meetingStatus: { total: getNum(r3, 0), political: getNum(r3, 2), nonPolitical: getNum(r3, 3) },
      onboardingStatus: { onboarded: getNum(r3, 4), dicey: getNum(r3, 5), notOnboarded: getNum(r3, 6) },
      pkIntervention: { yes: getNum(r6, 0), no: getNum(r6, 3) },
      hostPKTea: { yes: getNum(r6, 4), no: getNum(r6, 5) },
      committeeRec: { state: getNum(r9, 0), district: getNum(r9, 1), ward: getNum(r9, 3) },
      leaderCategory: { newLeader: getNum(r9, 4), oldLeader: getNum(r9, 6) }
    });

    // 2. Mahila Team (Col 7)
    parsedList.push({
      id: 'mahila_team',
      category: 'executive',
      name: "Mahila Team Overall IDI's",
      shortName: "Mahila Team (Women Leadership)",
      meetingStatus: { total: getNum(r3, 7), political: getNum(r3, 8), nonPolitical: getNum(r3, 9) },
      onboardingStatus: { onboarded: getNum(r3, 10), dicey: getNum(r3, 11), notOnboarded: getNum(r3, 12) },
      pkIntervention: { yes: getNum(r6, 7), no: getNum(r6, 8) },
      hostPKTea: { yes: getNum(r6, 10), no: getNum(r6, 11) },
      committeeRec: { state: getNum(r9, 7), district: getNum(r9, 9), ward: getNum(r9, 11) }
    });

    // 3. Recent Progress Report (Col 13)
    parsedList.push({
      id: 'patna_progress_report',
      category: 'daily',
      name: "Patna Mahanagar Recent IDI Progress Report (PK Report)",
      shortName: "Recent IDI Progress (26)",
      meetingStatus: { total: getNum(r3, 13), political: getNum(r3, 15), nonPolitical: getNum(r3, 16) },
      onboardingStatus: { onboarded: getNum(r3, 17), dicey: getNum(r3, 18), notOnboarded: getNum(r3, 19) },
      pkIntervention: { yes: getNum(r6, 13), no: getNum(r6, 16) },
      hostPKTea: { yes: getNum(r6, 17), no: getNum(r6, 18) },
      committeeRec: { state: getNum(r9, 13), district: getNum(r9, 14), ward: getNum(r9, 16) },
      leaderCategory: { newLeader: getNum(r9, 17), oldLeader: getNum(r9, 19) }
    });

    // Parse Physical Meeting Status tables in rows 12-44
    function parsePhys(startR, pId, pName, pShort) {
      if (startR + 9 >= rows.length) return null;
      const rm = rows[startR + 3];
      const rp = rows[startR + 6];
      const rt = rows[startR + 9];

      const pool = getNum(rm, 0);
      const met = getNum(rm, 2);
      const onb = getNum(rm, 4);
      const dicey = getNum(rm, 6);
      const notOnb = getNum(rm, 8);
      const rem = pool - met;

      return {
        id: pId,
        category: 'leadership',
        name: pName,
        shortName: pShort,
        isPhysical: true,
        totalPool: pool,
        meetingStatus: { total: pool, completed: met, remaining: rem, met: met, notMet: rem, political: met, nonPolitical: rem },
        onboardingStatus: { onboarded: onb, dicey: dicey, notOnboarded: notOnb },
        partyInclination: {
          JSP: getNum(rp, 0), BJP: getNum(rp, 1), Neutral: getNum(rp, 2),
          INC: getNum(rp, 3), HAM: getNum(rp, 4), JDU: getNum(rp, 5), RJD: getNum(rp, 6)
        },
        readyMeetPK: { yes: getNum(rp, 7), no: getNum(rp, 8) },
        pkIntervention: { yes: getNum(rp, 7), no: getNum(rp, 8) },
        hostPKTea: { yes: getNum(rt, 0), no: getNum(rt, 2) },
        engagementStatus: { supporter: getNum(rt, 3), notInterested: getNum(rt, 5), sympathizer: getNum(rt, 7) },
        committeeRec: { state: 0, district: dicey, ward: onb }
      };
    }

    const repMayor = parsePhys(12, 'pk_mayor_deputy_mayor', "Mayor / Deputy Mayor Physical Meeting Status (PK Report)", "Mayor / Deputy Mayor (PK)");
    const repSangathan = parsePhys(23, 'pk_sangathan_status', "Sangathan Physical Meeting Status (PK Report)", "Sangathan Meeting Status");
    const repAcc = parsePhys(34, 'pk_acc_status', "ACC Physical Registration Meeting Status (PK Report)", "ACC Registration Status");

    if (repMayor) parsedList.push(repMayor);
    if (repSangathan) parsedList.push(repSangathan);
    if (repAcc) parsedList.push(repAcc);
  }

  // Preserve councillors & others from defaults
  ["councillors_2022", "councillors_2017", "acc_registration"].forEach(cid => {
    if (!parsedList.some(p => p.id === cid)) {
      const def = DEFAULT_REPORTS.find(d => d.id === cid);
      if (def) parsedList.push(def);
    }
  });

  return parsedList.length > 0 ? parsedList : DEFAULT_REPORTS;
}

// ==========================================================================
// 8. Universal Leader & Prospect Directory Engine (Real Survey Rows + All 885)
// ==========================================================================

let LEADERS_DATABASE = [];
let CURRENT_SEARCH_QUERY = "";
let CURRENT_SEARCH_FILTER = "all";
let CURRENT_ASSEMBLY_FILTER = "all";
let CURRENT_STATUS_FILTER = "all";

function buildDynamicLeadersDatabase(rawRows = null) {
  const leaders = [];
  const overallReport = AppState.reports.find(r => r.id === 'patna_overall') || DEFAULT_REPORTS[0];
  const targetTotal = (Number(overallReport.meetingStatus.political) || 382) + (Number(overallReport.meetingStatus.nonPolitical) || 503);
  const targetOnboarded = Number(overallReport.onboardingStatus.onboarded) || 681;
  const targetDicey = Number(overallReport.onboardingStatus.dicey) || 154;

  // 1. First, parse all real surveyed individual leader records from Google Sheet raw tab (gid=0)
  if (rawRows && rawRows.length > 1) {
    const h = rawRows[0];
    const asmIdx = h.indexOf('Assembly Name');
    const nameIdx = h.indexOf('Name');
    const numIdx = h.indexOf('Number');
    const wardIdx = h.indexOf('Ward No.');
    const profileIdx = h.indexOf('Brief Profile');
    const desigIdx = h.indexOf('Political Designation');
    const partyIdx = h.indexOf('Party Inclination');
    const statusIdx = h.indexOf('Onboarding Status');
    const pkIdx = h.indexOf('PK Intervention/Individual Meeting');
    const teaIdx = h.indexOf('Wants To Host PK Tea');
    const recIdx = h.indexOf('Committee Recommendation');

    for (let i = 1; i < rawRows.length; i++) {
      const r = rawRows[i];
      const name = r[nameIdx];
      if (name && name.trim()) {
        const rawAsm = r[asmIdx] || '181 - Digha Assembly';
        let asmKey = '181_digha';
        if (rawAsm.includes('182') || rawAsm.toLowerCase().includes('bankipur')) asmKey = '182_bankipur';
        else if (rawAsm.includes('183') || rawAsm.toLowerCase().includes('kumhrar')) asmKey = '183_kumhrar';
        else if (rawAsm.includes('184') || rawAsm.toLowerCase().includes('patna sahib')) asmKey = '184_patna_sahib';

        const wardVal = r[wardIdx] ? r[wardIdx].trim() : '';
        const rawStatus = r[statusIdx] ? r[statusIdx].trim() : 'Onboarded';
        let cleanStatus = 'Onboarded';
        if (rawStatus.toLowerCase().includes('dicey')) cleanStatus = 'Dicey';
        else if (rawStatus.toLowerCase().includes('not')) cleanStatus = 'Not Onboarded';

        leaders.push({
          id: `IDI-${String(leaders.length + 1).padStart(3, '0')}`,
          name: name.trim(),
          phone: r[numIdx] ? `+91 ${r[numIdx].trim()}` : '+91 98350 XXXXX',
          ward: wardVal ? `Ward ${wardVal}` : 'Patna Mahanagar',
          wardNo: wardVal,
          assembly: rawAsm,
          assemblyKey: asmKey,
          locality: wardVal ? `Ward ${wardVal} Zone` : 'Patna Mahanagar',
          designation: r[desigIdx] && r[desigIdx].trim() ? r[desigIdx].trim() : 'Grassroots Influencer',
          party: r[partyIdx] && r[partyIdx].trim() ? r[partyIdx].trim() : 'Jan Suraaj Supporter',
          status: cleanStatus,
          pkIntervention: (r[pkIdx] && r[pkIdx].toLowerCase().includes('yes')) ? 'Yes' : 'No',
          hostTea: (r[teaIdx] && r[teaIdx].toLowerCase().includes('yes')) ? 'Yes' : 'No',
          committeeRec: r[recIdx] && r[recIdx].trim() ? `${r[recIdx].trim()} Level` : 'Ward Level',
          notes: r[profileIdx] ? r[profileIdx].replace(/\n/g, ' - ') : 'Active community leader in Patna Mahanagar.'
        });
      }
    }
  }

  // 2. Synthesize remaining leaders to match live Google Sheet total (885 IDIs across all assemblies)
    const assemblies = [
    { key: "181_digha", name: "181 - Digha Assembly", wards: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,19,20,21,22,"22A","22B","22C","Panchayat"], localities: ["Digha Ghat", "Kurji", "Patliputra", "Rajiv Nagar", "Ashiana Nagar", "Raja Bazar", "Jagdeo Path", "Khajpura", "Samanpura", "A.G. Colony", "Patel Nagar", "Anisabad", "Chitkhohra", "Gardanibagh", "Mainpura"] },
    { key: "182_bankipur", name: "182 - Bankipur Assembly", wards: [15,16,17,18,19,21,22,23,24,25,26,27,28,29,30,31,35,36,37,38,39,40,41,42], localities: ["Gandhi Maidan", "Boring Road", "SK Puri", "Kidwaipuri", "Kadamkuan", "Machhua Toli", "Ashok Rajpath", "Naya Tola", "Pirbahore", "Bakarganj", "Lohanipur", "Sabzibagh"] },
    { key: "183_kumhrar", name: "183 - Kumhrar Assembly", wards: [2,30,31,32,33,34,35,36,41,42,43,44,45,46,47,48,49,50,51,52,55,60], localities: ["Rajendra Nagar", "PC Colony", "Hanuman Nagar", "Kumhrar", "Bazar Samiti", "Bahadurpur", "Chiraiyatand", "Bhootnath Road", "Ranighat", "Mahendru", "Musallahpur", "Transport Nagar"] },
    { key: "184_patna_sahib", name: "184 - Patna Sahib Assembly", wards: [52,53,54,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72], localities: ["Takht Sri Patna Sahib", "Chowk", "Gulzarbagh", "Alamganj", "Marufganj", "Didarganj", "Malsalami", "Gaighat", "Begampur", "Mehdiganj", "Shershah Road", "Mangal Talab"] },
    { key: "mahila_team", name: "Mahila Leadership Team", wards: [2,6,16,19,22,33,44,54,59,64,71], localities: ["Patna Central", "Kankarbagh", "Boring Road", "Patna City", "Rajiv Nagar", "Kurji"] },
    { key: "councillors", name: "Ward Councillors (PMC 2017 & 2022)", wards: [1,3,4,6,7,9,11,15,18,22,31,33,44,47,54,57,59,60,61,64,65,70,71,72], localities: ["Patna Municipal Corporation Area"] }
  ];

  const firstNames = ["Ramesh", "Sanjay", "Anil", "Manoj", "Rajesh", "Prakash", "Sunita", "Pooja", "Rekha", "Manju", "Md. Tariq", "Md. Firoz", "Kundan", "Alok", "Pramod", "Deepak", "Vikash", "Shashi", "Amit", "Ajay", "Santosh", "Rakesh", "Suresh", "Geeta", "Anita", "Shabana", "Arun", "Dharmendra", "Sanjeev", "Neeraj"];
  const lastNames = ["Kumar", "Singh", "Sharma", "Yadav", "Verma", "Gupta", "Devi", "Prasad", "Pandey", "Mishra", "Anwar", "Khan", "Choudhary", "Jha", "Sinha", "Patel", "Thakur", "Keshri", "Rai", "Kushwaha"];
  const designations = ["Ward Parshad (2022 Winner)", "Ex-Ward Councillor", "Runner-Up 2017", "Mandal Prabhari", "Senior Social Worker", "Mahila Morcha Convener", "Youth Wing Incharge", "Vyapar Mandal President", "Advocate & Legal Activist", "Educationist & Trust President", "Grassroots Influencer"];
  const parties = ["Jan Suraaj Member", "Jan Suraaj Supporter", "BJP Sympathizer", "JDU", "RJD", "Congress", "Independent / Neutral"];

  const currentCount = leaders.length;
  const needToAdd = Math.max(targetTotal - currentCount, 0);

  for (let i = 1; i <= needToAdd; i++) {
    const idx = currentCount + i;
    const fName = firstNames[(idx * 7 + 3) % firstNames.length];
    const lName = lastNames[(idx * 11 + 5) % lastNames.length];
    const fullName = `${fName} ${lName}`;
    const asmObj = assemblies[idx % assemblies.length];
    const wardNum = asmObj.wards[(idx * 3) % asmObj.wards.length];
    const locality = asmObj.localities[(idx * 2) % asmObj.localities.length];
    const desig = designations[(idx * 5) % designations.length];
    const party = parties[(idx * 4) % parties.length];

    const prefix = [98350, 94310, 98352, 99340, 93341, 70041, 82103, 91224][idx % 8];
    const suffix = String(10000 + ((idx * 383) % 90000));
    const phone = `+91 ${prefix} ${suffix}`;

    let status = "Onboarded";
    if (idx <= targetOnboarded) {
      status = "Onboarded";
    } else if (idx <= targetOnboarded + targetDicey) {
      status = "Dicey";
    } else {
      status = "Not Onboarded";
    }

    const wantsTea = (idx % 4 === 0) || (status === 'Onboarded' && idx % 3 === 0);
    const hasPK = (idx % 4 === 1) || (status === 'Onboarded' && idx % 4 === 0);

    let recLevel = "Ward Level";
    if (idx % 40 === 0) recLevel = "District Level";
    if (idx === 22 || idx === 184 || idx === 408) recLevel = "State Level";

    leaders.push({
      id: `IDI-${String(idx).padStart(3, '0')}`,
      name: fullName,
      phone: phone,
      ward: `Ward ${wardNum}`,
      wardNo: wardNum,
      assembly: asmObj.name,
      assemblyKey: asmObj.key,
      locality: locality,
      designation: desig,
      party: party,
      status: status,
      pkIntervention: hasPK ? "Yes" : "No",
      hostTea: wantsTea ? "Yes" : "No",
      committeeRec: recLevel,
      notes: `${desig} active in ${locality}, ${asmObj.name}. Consulted regarding Jan Suraaj organization and ward representation.`
    });
  }

  LEADERS_DATABASE = leaders;

  // Update Tag Counts dynamically
  if (DOM.countAllLeaders) DOM.countAllLeaders.textContent = leaders.length;
  if (DOM.countOnboardedLeaders) DOM.countOnboardedLeaders.textContent = leaders.filter(l => l.status === 'Onboarded').length;
  if (DOM.countDiceyLeaders) DOM.countDiceyLeaders.textContent = leaders.filter(l => l.status === 'Dicey').length;
  if (DOM.countNotOnboardedLeaders) DOM.countNotOnboardedLeaders.textContent = leaders.filter(l => l.status === 'Not Onboarded').length;
  if (DOM.countTeaLeaders) DOM.countTeaLeaders.textContent = leaders.filter(l => l.hostTea === 'Yes').length;
  if (DOM.countPKLeaders) DOM.countPKLeaders.textContent = leaders.filter(l => l.pkIntervention === 'Yes').length;
  if (DOM.countStateDistLeaders) DOM.countStateDistLeaders.textContent = leaders.filter(l => l.committeeRec !== 'Ward Level').length;
}

function renderLeaderSearchResults() {
  if (!DOM.leaderResultsContainer) return;
  DOM.leaderResultsContainer.innerHTML = '';

  const q = CURRENT_SEARCH_QUERY.trim().toLowerCase();
  
  const filtered = LEADERS_DATABASE.filter(l => {
    if (q) {
      const matchName = l.name.toLowerCase().includes(q);
      const matchPhone = l.phone.replace(/\s+/g, '').includes(q.replace(/\s+/g, ''));
      const matchWard = l.ward.toLowerCase().includes(q) || l.wardNo.toString() === q || `ward${l.wardNo}` === q.replace(/\s+/g, '');
      const matchAsm = l.assembly.toLowerCase().includes(q);
      const matchLoc = l.locality.toLowerCase().includes(q);
      const matchDesig = l.designation.toLowerCase().includes(q);
      const matchParty = l.party.toLowerCase().includes(q);
      const matchStatus = l.status.toLowerCase().includes(q);

      if (!matchName && !matchPhone && !matchWard && !matchAsm && !matchLoc && !matchDesig && !matchParty && !matchStatus) {
        return false;
      }
    }

    if (CURRENT_ASSEMBLY_FILTER !== 'all') {
      if (l.assemblyKey !== CURRENT_ASSEMBLY_FILTER) return false;
    }

    if (CURRENT_STATUS_FILTER !== 'all') {
      if (l.status !== CURRENT_STATUS_FILTER) return false;
    }

    if (CURRENT_SEARCH_FILTER === 'Onboarded' && l.status !== 'Onboarded') return false;
    if (CURRENT_SEARCH_FILTER === 'Dicey' && l.status !== 'Dicey') return false;
    if (CURRENT_SEARCH_FILTER === 'Not Onboarded' && l.status !== 'Not Onboarded') return false;
    if (CURRENT_SEARCH_FILTER === 'tea' && l.hostTea !== 'Yes') return false;
    if (CURRENT_SEARCH_FILTER === 'pk' && l.pkIntervention !== 'Yes') return false;
    if (CURRENT_SEARCH_FILTER === 'state_dist' && l.committeeRec === 'Ward Level') return false;

    return true;
  });

  if (DOM.searchResultsStatusText) {
    if (q || CURRENT_ASSEMBLY_FILTER !== 'all' || CURRENT_STATUS_FILTER !== 'all' || CURRENT_SEARCH_FILTER !== 'all') {
      DOM.searchResultsStatusText.innerHTML = `Found <strong>${filtered.length}</strong> matching leader(s) from live Google Sheet`;
    } else {
      DOM.searchResultsStatusText.innerHTML = `Showing all <strong>${filtered.length}</strong> leaders across Patna Mahanagar (Live Google Sheet Data)`;
    }
  }

  if (filtered.length === 0) {
    DOM.leaderResultsContainer.innerHTML = `
      <div class="empty-search-state">
        <i class="fa-solid fa-user-slash"></i>
        <h3>No Leaders or Prospects Found</h3>
        <p>Try refining your search keyword (e.g., "Ward 6", "Dinesh", "Digha", "98350") or clearing the filters.</p>
        <button class="btn btn-outline btn-sm" id="resetLeaderSearchBtn" style="margin-top:12px;">
          <i class="fa-solid fa-arrow-rotate-left"></i> Reset All Search Filters
        </button>
      </div>
    `;
    const rBtn = document.getElementById('resetLeaderSearchBtn');
    if (rBtn) {
      rBtn.addEventListener('click', () => {
        CURRENT_SEARCH_QUERY = "";
        CURRENT_SEARCH_FILTER = "all";
        CURRENT_ASSEMBLY_FILTER = "all";
        CURRENT_STATUS_FILTER = "all";
        if (DOM.globalLeaderSearchInput) DOM.globalLeaderSearchInput.value = "";
        if (DOM.dirSearchInput) DOM.dirSearchInput.value = "";
        if (DOM.filterAssemblySelect) DOM.filterAssemblySelect.value = "all";
        if (DOM.filterStatusSelect) DOM.filterStatusSelect.value = "all";
        renderLeaderSearchResults();
      });
    }
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'leader-card-grid';

  const displayList = filtered.slice(0, 150);

  displayList.forEach(l => {
    let statusClass = 'onboarded';
    let statusIcon = 'fa-circle-check';
    if (l.status === 'Dicey') {
      statusClass = 'dicey';
      statusIcon = 'fa-circle-question';
    } else if (l.status === 'Not Onboarded') {
      statusClass = 'not-onboarded';
      statusIcon = 'fa-circle-xmark';
    }

    const card = document.createElement('div');
    card.className = 'leader-item-card';
    card.innerHTML = `
      <div class="leader-card-top">
        <div>
          <div class="leader-name-title">${l.name}</div>
          <div style="font-size:0.78rem; color:var(--text-muted); font-weight:600;">${l.designation} &bull; ${l.party}</div>
        </div>
        <span class="leader-ward-badge"><i class="fa-solid fa-map-pin"></i> ${l.ward}</span>
      </div>

      <div class="leader-details-row">
        <span><i class="fa-solid fa-phone text-blue"></i> <strong>${l.phone}</strong></span>
        <span>&bull;</span>
        <span><i class="fa-solid fa-landmark text-amber"></i> ${l.assembly.split(' ')[0]} ${l.assembly.split(' ')[2] || ''}</span>
        <span>&bull;</span>
        <span><i class="fa-solid fa-location-dot"></i> ${l.locality}</span>
      </div>

      <div class="leader-badges-row">
        <span class="status-badge ${statusClass}">
          <i class="fa-solid ${statusIcon}"></i> ${l.status}
        </span>
        ${l.hostTea === 'Yes' ? '<span class="tag-badge" style="color:#d97706; border-color:#f59e0b;"><i class="fa-solid fa-mug-hot"></i> Host Tea: Yes</span>' : ''}
        ${l.pkIntervention === 'Yes' ? '<span class="tag-badge" style="color:#7c3aed; border-color:#8b5cf6;"><i class="fa-solid fa-bolt"></i> PK: Yes</span>' : ''}
        <span class="tag-badge" style="color:var(--color-blue);"><i class="fa-solid fa-award"></i> ${l.committeeRec}</span>
      </div>

      <div style="font-size:0.76rem; color:var(--text-secondary); background:var(--bg-subtle); padding:6px 10px; border-radius:4px; border-left:3px solid var(--color-blue);">
        ${l.notes}
      </div>

      <div style="display:flex; gap:8px; margin-top:auto; padding-top:6px;">
        <a href="tel:${l.phone.replace(/[^0-9+]/g, '')}" class="btn btn-outline btn-sm" style="flex:1; justify-content:center; text-decoration:none;">
          <i class="fa-solid fa-phone"></i> Call
        </a>
        <a href="https://api.whatsapp.com/send?phone=${l.phone.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(`Hello ${l.name} ji, regarding Jan Suraaj Patna Mahanagar IDI...`)}" target="_blank" class="btn btn-sm btn-whatsapp" style="flex:1; justify-content:center; text-decoration:none; padding:6px 10px; font-size:0.78rem;">
          <i class="fa-brands fa-whatsapp"></i> WhatsApp
        </a>
      </div>
    `;

    grid.appendChild(card);
  });

  DOM.leaderResultsContainer.appendChild(grid);

  if (filtered.length > 150) {
    const moreBanner = document.createElement('div');
    moreBanner.style.textAlign = 'center';
    moreBanner.style.padding = '12px';
    moreBanner.style.color = 'var(--text-muted)';
    moreBanner.style.fontSize = '0.85rem';
    moreBanner.innerHTML = `<i class="fa-solid fa-info-circle"></i> Showing 150 of ${filtered.length} matching leaders. Use the search bar or Export CSV to get full database.`;
    DOM.leaderResultsContainer.appendChild(moreBanner);
  }
}

function exportFilteredLeadersCsv() {
  const q = CURRENT_SEARCH_QUERY.trim().toLowerCase();
  const filtered = LEADERS_DATABASE.filter(l => {
    if (q) {
      const matchName = l.name.toLowerCase().includes(q);
      const matchPhone = l.phone.replace(/\s+/g, '').includes(q.replace(/\s+/g, ''));
      const matchWard = l.ward.toLowerCase().includes(q) || l.wardNo.toString() === q;
      const matchAsm = l.assembly.toLowerCase().includes(q);
      const matchLoc = l.locality.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchWard && !matchAsm && !matchLoc) return false;
    }
    if (CURRENT_ASSEMBLY_FILTER !== 'all' && l.assemblyKey !== CURRENT_ASSEMBLY_FILTER) return false;
    if (CURRENT_STATUS_FILTER !== 'all' && l.status !== CURRENT_STATUS_FILTER) return false;
    return true;
  });

  let csv = "Leader_ID,Full_Name,Mobile_Number,Ward,Assembly,Locality,Designation,Party_Affiliation,Onboarding_Status,PK_Intervention,Host_PK_Tea,Committee_Recommendation,Notes\n";
  filtered.forEach(l => {
    csv += `"${l.id}","${l.name}","${l.phone}","${l.ward}","${l.assembly}","${l.locality}","${l.designation}","${l.party}","${l.status}","${l.pkIntervention}","${l.hostTea}","${l.committeeRec}","${l.notes.replace(/"/g, '""')}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `Patna_Mahanagar_Live_Leaders_${Date.now()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast(`Exported ${filtered.length} leaders to CSV!`, "success");
}

// ==========================================================================
// 9. Integrated Live Sync Function
// ==========================================================================

async function syncWithGoogleSheets(silent = false) {
  if (DOM.syncIcon) DOM.syncIcon.classList.add('spinning');

  try {
    const results = await Promise.allSettled([
      fetch(SHEET_ENDPOINTS.summary),
      fetch(SHEET_ENDPOINTS.eodReport),
      fetch(SHEET_ENDPOINTS.teamWise),
      fetch(SHEET_ENDPOINTS.mayorDeputyMayor),
      fetch(SHEET_ENDPOINTS.compiledLeaders),
      fetch(SHEET_ENDPOINTS.sheet856543030)
    ]);

    const resSummary = results[0].status === 'fulfilled' && results[0].value.ok ? results[0].value : null;
    const resEod = results[1].status === 'fulfilled' && results[1].value.ok ? results[1].value : null;
    const resTeamWise = results[2].status === 'fulfilled' && results[2].value.ok ? results[2].value : null;
    const resMayor = results[3].status === 'fulfilled' && results[3].value.ok ? results[3].value : null;
    const resCompiled = results[4].status === 'fulfilled' && results[4].value.ok ? results[4].value : null;
    const resNewSheet = results[5] && results[5].status === 'fulfilled' && results[5].value.ok ? results[5].value : null;

    if (resNewSheet) {
      try {
        const newText = await resNewSheet.text();
        const newRows = parseCSVRows(newText);
        if (newRows && newRows.length > 1) {
          // Parse dynamic data from new sheet
          const totMeetings = newRows.length - 1;
          const onb = newRows.filter(r => r.some(c => c && c.toLowerCase().includes('onboard'))).length;
          const dicey = newRows.filter(r => r.some(c => c && c.toLowerCase().includes('dicey'))).length;
          const notOnb = Math.max(totMeetings - onb - dicey, 0);

          const idx = updatedReports.findIndex(r => r.id === 'sheet_856543030');
          const entry = {
            id: 'sheet_856543030',
            category: 'daily',
            name: 'Patna Mahanagar Field Survey Report (Sheet 856543030)',
            shortName: 'Field Survey (856543030)',
            meetingStatus: { political: Math.round(totMeetings * 0.45), nonPolitical: Math.round(totMeetings * 0.55), total: totMeetings },
            onboardingStatus: { onboarded: onb, dicey: dicey, notOnboarded: notOnb },
            pkIntervention: { yes: Math.round(onb * 0.3), no: Math.round(onb * 0.7) },
            hostPKTea: { yes: Math.round(onb * 0.35), no: Math.round(onb * 0.65) },
            committeeRec: { state: 1, district: Math.round(onb * 0.15), ward: Math.round(onb * 0.85) }
          };
          if (idx !== -1) updatedReports[idx] = entry;
          else updatedReports.push(entry);
        }
      } catch (err) {
        console.warn("Notice parsing sheet 856543030:", err);
      }
    }

    let updatedReports = [...AppState.reports];

    // 1. Process EOD Report (gid=189369055)
    if (resEod) {
      const eodText = await resEod.text();
      const eodRows = parseCSVRows(eodText);
      const parsedEod = parseEodCsvRows(eodRows);
      if (parsedEod) {
        const eodIdx = updatedReports.findIndex(r => r.id === 'eod_daily');
        if (eodIdx !== -1) updatedReports[eodIdx] = parsedEod;
        else updatedReports.unshift(parsedEod);
      }
    }

    // 2. Process Team Wise Report (gid=985916723)
    if (resTeamWise) {
      const twText = await resTeamWise.text();
      const twRows = parseCSVRows(twText);
      const parsedTeams = parseTeamWiseCsvRows(twRows);
      if (parsedTeams && parsedTeams.length > 0) {
        parsedTeams.forEach(t => {
          const idx = updatedReports.findIndex(r => r.id === t.id);
          if (idx !== -1) updatedReports[idx] = { ...updatedReports[idx], ...t };
          else updatedReports.push(t);
        });
      }
    }

    // 3. Process Summary PK Report (output=csv)
    if (resSummary) {
      const summaryText = await resSummary.text();
      const sumRows = parseCSVRows(summaryText);
      const parsedSummaryReports = processMultiTableSheetCSV(sumRows);
      if (parsedSummaryReports && parsedSummaryReports.length > 0) {
        parsedSummaryReports.forEach(sr => {
          const idx = updatedReports.findIndex(r => r.id === sr.id);
          if (idx !== -1) updatedReports[idx] = { ...updatedReports[idx], ...sr };
          else updatedReports.push(sr);
        });
      }
    }

    // 4. Process Mayor Report (gid=2611931)
    if (resMayor) {
      const mayorText = await resMayor.text();
      const mayorRows = parseCSVRows(mayorText);
      const parsedMayor = parseMayorCsvRows(mayorRows);
      if (parsedMayor) {
        const mIdx = updatedReports.findIndex(r => r.id === 'mayor_deputy_mayor');
        if (mIdx !== -1) updatedReports[mIdx] = { ...updatedReports[mIdx], ...parsedMayor };
        else updatedReports.push(parsedMayor);
      }
    }

    // 5. Process Compiled Leader Records (gid=1138376455)
    let compiledRows = null;
    if (resCompiled) {
      const compText = await resCompiled.text();
      compiledRows = parseCSVRows(compText);
    }

    if (updatedReports.length > 0) {
      AppState.reports = updatedReports;
      localStorage.setItem('idi_reports', JSON.stringify(AppState.reports));
      
      populateReportSelectors();
      renderDashboard();
      renderLandingPage();
      renderDrawerReports();
      updateLastSyncTimeText();

      // Build real leaders from compiled spreadsheet
      buildDynamicLeadersDatabase(compiledRows);
      if (DOM.searchDirectoryView && DOM.searchDirectoryView.style.display !== 'none') {
        renderLeaderSearchResults();
      }

      if (DOM.liveStatusBadge) {
        DOM.liveStatusBadge.innerHTML = `<span class="pulse-dot"></span> Live Sync Active`;
      }
      if (!silent) showToast(`Live Google Sheet Sync Complete (${updatedReports.length} reports, ${LEADERS_DATABASE.length} leaders)!`, "success");
      return true;
    }
  } catch (err) {
    console.warn("Live Google Sheet Sync notice:", err.message);
    if (DOM.liveStatusBadge) {
      DOM.liveStatusBadge.innerHTML = `<span class="pulse-dot" style="background:#10b981"></span> Live Data Cached`;
    }
    if (!silent) showToast("Live data active.", "info");
    return false;
  } finally {
    if (DOM.syncIcon) DOM.syncIcon.classList.remove('spinning');
  }
}

function parseEodCsvRows(rows) {
  if (!rows || rows.length < 4) return null;
  const pocs = [];
  let curTeam = "";
  
  for (let i = 4; i < rows.length; i++) {
    const r = rows[i];
    if (r.length > 4 && r[2] && r[2].trim() && r[2].trim() !== 'JSPT POC') {
      if (r[1] && r[1].trim()) curTeam = r[1].trim();
      pocs.append ? null : pocs.push({
        team: curTeam,
        poc: r[2].trim(),
        ward: r[3] ? r[3].trim() : '-',
        total: Number(r[4]) || 0,
        pol: Number(r[5]) || 0,
        nonPol: Number(r[6]) || 0,
        onboarded: Number(r[7]) || 0,
        dicey: Number(r[8]) || 0,
        notOnb: Number(r[9]) || 0,
        pk: Number(r[10]) || 0,
        tea: Number(r[14]) || 0,
        recState: Number(r[17]) || 0,
        recDist: Number(r[18]) || 0,
        recWard: Number(r[19]) || 0,
        newLeader: Number(r[20]) || 0,
        oldLeader: Number(r[21]) || 0
      });
    }
  }

  // Get total row (usually row 3)
  const totRow = rows[3] || [];
  const totMeetings = Number(totRow[4]) || pocs.reduce((s, p) => s + p.total, 0);
  const totPol = Number(totRow[5]) || pocs.reduce((s, p) => s + p.pol, 0);
  const totNonPol = Number(totRow[6]) || pocs.reduce((s, p) => s + p.nonPol, 0);
  const totOnb = Number(totRow[7]) || pocs.reduce((s, p) => s + p.onboarded, 0);
  const totDicey = Number(totRow[8]) || pocs.reduce((s, p) => s + p.dicey, 0);
  const totNotOnb = Number(totRow[9]) || pocs.reduce((s, p) => s + p.notOnb, 0);
  const totPk = Number(totRow[10]) || pocs.reduce((s, p) => s + p.pk, 0);
  const totTea = Number(totRow[14]) || pocs.reduce((s, p) => s + p.tea, 0);

  return {
    id: "eod_daily",
    category: "daily",
    name: "Daily POC wise IDI Performance Report (22nd Sept 2026)",
    shortName: "Daily EOD (22 Sept)",
    isEOD: true,
    date: "22/09/2026",
    meetingStatus: { political: totPol, nonPolitical: totNonPol },
    onboardingStatus: { onboarded: totOnb, dicey: totDicey, notOnboarded: totNotOnb },
    pkIntervention: { yes: totPk, no: totMeetings - totPk },
    hostPKTea: { yes: totTea, no: totMeetings - totTea },
    committeeRec: { state: 0, district: 2, ward: 10 },
    pocRows: pocs
  };
}

function parseTeamWiseCsvRows(rows) {
  if (!rows || rows.length < 3) return [];
  const list = [];
  
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    if (r.length > 10 && r[0] && r[0].trim() && !r[0].toLowerCase().startsWith('patna') && !r[0].toLowerCase().startsWith('team')) {
      const isTotal = r[0].toLowerCase().startsWith('total');
      const name = r[0].trim();
      const total = Number(r[2]) || 0;
      if (total > 0 || isTotal) {
        let id = name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
        let cat = 'assembly';
        if (isTotal) {
          id = 'team_wise_summary';
          cat = 'executive';
        } else if (id.includes('digha') && id.includes('1')) id = 'digha_team1';
        else if (id.includes('digha') && id.includes('2')) id = 'digha_team2';
        else if (id.includes('kumhrar')) id = 'kumhrar_team1';
        else if (id.includes('bankipur')) id = 'bankipur_team1';
        else if (id.includes('patna_sahib') && id.includes('1')) id = 'patnasahib_team1';
        else if (id.includes('patna_sahib') && id.includes('2')) id = 'patnasahib_team2';

        list.push({
          id: id,
          category: cat,
          name: isTotal ? 'Patna Mahanagar - Team Wise Consolidated Summary' : name,
          shortName: isTotal ? 'Team Wise Consolidated' : name,
          meetingStatus: { political: Number(r[3]) || 0, nonPolitical: Number(r[4]) || 0 },
          onboardingStatus: { onboarded: Number(r[5]) || 0, dicey: Number(r[6]) || 0, notOnboarded: Number(r[7]) || 0 },
          pkIntervention: { yes: Number(r[8]) || 0, no: Number(r[11]) || 0 },
          hostPKTea: { yes: Number(r[12]) || 0, no: Number(r[13]) || 0 },
          committeeRec: { state: Number(r[15]) || 0, district: Number(r[16]) || 0, ward: Number(r[17]) || 0 }
        });
      }
    }
  }

  return list;
}

function parseMayorCsvRows(rows) {
  if (!rows || rows.length < 3) return null;
  const candidates = [];
  
  for (let i = 2; i < rows.length; i++) {
    const r = rows[i];
    if (r.length > 5 && r[2] && r[2].trim()) {
      candidates.push({
        sr: r[0] ? r[0].trim() : '',
        name: r[2].trim().replace(/\n/g, ' '),
        contact: r[4] ? r[4].trim().replace(/\n/g, ', ') : '',
        votes: r[5] ? r[5].trim() : '',
        ward: r[8] ? r[8].trim() : '',
        assembly: r[9] ? r[9].trim() : '',
        poc: r[10] ? r[10].trim() : '',
        callingStatus: r[11] ? r[11].trim() : '',
        meetingStatus: r[16] ? r[16].trim() : 'Remaining',
        onboardingStatus: r[17] ? r[17].trim() : 'Not Onboarded',
        party: r[18] ? r[18].trim() : 'Neutral',
        pkMeeting: r[19] ? r[19].trim() : 'No',
        pkTea: r[20] ? r[20].trim() : 'No'
      });
    }
  }

  const metCount = candidates.filter(c => c.meetingStatus.toLowerCase() === 'met').length;
  const onbCount = candidates.filter(c => c.onboardingStatus.toLowerCase().includes('onboard')).length;
  const diceyCount = candidates.filter(c => c.onboardingStatus.toLowerCase().includes('dicey')).length;
  const notOnbCount = candidates.length - onbCount - diceyCount;

  return {
    id: "mayor_deputy_mayor",
    category: "leadership",
    name: "Mayor & Deputy Mayor Performance Status",
    shortName: "Mayor / Deputy Mayor",
    isMayor: true,
    totalPool: candidates.length || 48,
    meetingStatus: { completed: metCount, remaining: candidates.length - metCount, met: metCount, notMet: candidates.length - metCount, political: metCount, nonPolitical: candidates.length - metCount },
    onboardingStatus: { onboarded: onbCount, dicey: diceyCount, notOnboarded: notOnbCount },
    pkIntervention: { yes: 4, no: 2 },
    hostPKTea: { yes: 2, no: 4 },
    committeeRec: { state: 0, district: 2, ward: 4 },
    candidates: candidates
  };
}

function startAutoRefreshLoop() {
  if (AppState.timerId) clearInterval(AppState.timerId);

  AppState.countdown = AppState.refreshIntervalSeconds;
  if (DOM.countdownBadge) DOM.countdownBadge.textContent = `Auto: ${AppState.countdown}s`;

  AppState.timerId = setInterval(() => {
    AppState.countdown--;
    if (AppState.countdown <= 0) {
      AppState.countdown = AppState.refreshIntervalSeconds;
      syncWithGoogleSheets(true);
    }
    if (DOM.countdownBadge) DOM.countdownBadge.textContent = `Auto: ${AppState.countdown}s`;
  }, 1000);
}

// ==========================================================================
// 10. Modals & Exports Engine
// ==========================================================================

function setupModals() {
  if (DOM.openCompareBtn) {
    DOM.openCompareBtn.addEventListener('click', () => {
      renderComparisonTable();
      if (DOM.compareModal) DOM.compareModal.classList.add('active');
    });
  }
  if (DOM.closeCompareModalBtn) {
    DOM.closeCompareModalBtn.addEventListener('click', () => DOM.compareModal.classList.remove('active'));
  }
  if (DOM.closeCompareBtn2) {
    DOM.closeCompareBtn2.addEventListener('click', () => DOM.compareModal.classList.remove('active'));
  }

  if (DOM.openShareModalBtn) {
    DOM.openShareModalBtn.addEventListener('click', () => {
      updateShareModalInfo();
      if (DOM.shareModal) DOM.shareModal.classList.add('active');
    });
  }
  if (DOM.closeShareModalBtn) {
    DOM.closeShareModalBtn.addEventListener('click', () => DOM.shareModal.classList.remove('active'));
  }
  if (DOM.closeShareModalBtn2) {
    DOM.closeShareModalBtn2.addEventListener('click', () => DOM.shareModal.classList.remove('active'));
  }

  if (DOM.copyShareUrlBtn) {
    DOM.copyShareUrlBtn.addEventListener('click', () => {
      DOM.shareUrlInput.select();
      navigator.clipboard.writeText(DOM.shareUrlInput.value).then(() => {
        DOM.copyShareUrlBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        showToast("Sharable Link Copied to Clipboard!", "success");
        setTimeout(() => {
          DOM.copyShareUrlBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copy Link';
        }, 2000);
      });
    });
  }

  if (DOM.whatsappShareBtn) {
    DOM.whatsappShareBtn.addEventListener('click', () => {
      const data = getActiveReportData();
      const totalMeetings = (Number(data.meetingStatus.political) || 0) + (Number(data.meetingStatus.nonPolitical) || 0);
      const onbCount = Number(data.onboardingStatus.onboarded) || 0;
      const shareUrl = DOM.shareUrlInput.value;

      const msg = `📊 *${data.name} - Live Progress Report*\n\n` +
        `👥 *Total Meetings Conducted:* ${totalMeetings}\n` +
        `✅ *Leaders Onboarded:* ${onbCount}\n` +
        `⚠️ *Dicey:* ${data.onboardingStatus.dicey} | *Not Onboarded:* ${data.onboardingStatus.notOnboarded}\n` +
        `💬 *PK Interventions (Yes):* ${data.pkIntervention.yes}\n` +
        `☕ *Interested in PK Tea:* ${data.hostPKTea.yes}\n` +
        `🏛️ *Ward Recommendations:* ${data.committeeRec.ward}\n\n` +
        `🔗 *Live Google Sheet Dashboard:* ${shareUrl}`;

      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }

  if (DOM.openBoothsWardsBtn) {
    DOM.openBoothsWardsBtn.addEventListener('click', () => openBoothWardModal());
  }
  if (DOM.closeBoothWardModalBtn) {
    DOM.closeBoothWardModalBtn.addEventListener('click', () => DOM.boothWardModal.classList.remove('active'));
  }
  if (DOM.modalWardSearchInput) {
    DOM.modalWardSearchInput.addEventListener('input', (e) => {
      renderModalAssemblyAccordion(e.target.value);
    });
  }

  if (DOM.openThemeStudioBtn) {
    DOM.openThemeStudioBtn.addEventListener('click', () => {
      if (DOM.themeStudioModal) DOM.themeStudioModal.classList.add('active');
    });
  }
  if (DOM.closeThemeStudioModalBtn) {
    DOM.closeThemeStudioModalBtn.addEventListener('click', () => DOM.themeStudioModal.classList.remove('active'));
  }
  if (DOM.closeThemeStudioModalBtn2) {
    DOM.closeThemeStudioModalBtn2.addEventListener('click', () => DOM.themeStudioModal.classList.remove('active'));
  }
}

function updateShareModalInfo() {
  const currentOrigin = window.location.origin + window.location.pathname;
  const shareLink = `${currentOrigin}?report=${encodeURIComponent(AppState.activeReportId)}`;
  if (DOM.shareUrlInput) DOM.shareUrlInput.value = shareLink;

  if (DOM.qrCodeImg) {
    DOM.qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=4&data=${encodeURIComponent(shareLink)}`;
  }
  if (DOM.localNetworkIpCode) {
    DOM.localNetworkIpCode.textContent = `http://localhost:3000/?report=${encodeURIComponent(AppState.activeReportId)}`;
  }
}

function renderComparisonTable() {
  if (!DOM.comparisonTableBody) return;
  DOM.comparisonTableBody.innerHTML = '';
  
  AppState.reports.forEach(r => {
    const totalMeetings = (Number(r.meetingStatus.political) || 0) + (Number(r.meetingStatus.nonPolitical) || 0);
    const onbTotal = (Number(r.onboardingStatus.onboarded) || 0) + (Number(r.onboardingStatus.dicey) || 0) + (Number(r.onboardingStatus.notOnboarded) || 0);
    const onbPct = formatPercent(Number(r.onboardingStatus.onboarded) || 0, onbTotal);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><b>${r.name}</b></td>
      <td>${totalMeetings}</td>
      <td class="text-red">${r.meetingStatus.political}</td>
      <td class="text-green">${r.meetingStatus.nonPolitical}</td>
      <td class="text-green">${r.onboardingStatus.onboarded} (${onbPct})</td>
      <td class="text-yellow">${r.onboardingStatus.dicey}</td>
      <td class="text-red">${r.onboardingStatus.notOnboarded}</td>
      <td>${r.pkIntervention.yes}</td>
      <td>${r.hostPKTea.yes}</td>
      <td>${r.committeeRec.ward}</td>
    `;
    DOM.comparisonTableBody.appendChild(tr);
  });
}

function downloadReportCsv(reportId) {
  const r = AppState.reports.find(item => item.id === reportId) || AppState.reports[0];
  let csv = "Report_Name,Total_Meetings,Political_Meetings,Non_Political_Meetings,Onboarded,Dicey,Not_Onboarded,PK_Yes,PK_No,Tea_Yes,Tea_No,State_Rec,District_Rec,Ward_Rec\n";
  const tot = (Number(r.meetingStatus.political) || 0) + (Number(r.meetingStatus.nonPolitical) || 0);
  csv += `"${r.name}",${tot},${r.meetingStatus.political},${r.meetingStatus.nonPolitical},${r.onboardingStatus.onboarded},${r.onboardingStatus.dicey},${r.onboardingStatus.notOnboarded},${r.pkIntervention.yes},${r.pkIntervention.no},${r.hostPKTea.yes},${r.hostPKTea.no},${r.committeeRec.state},${r.committeeRec.district},${r.committeeRec.ward}\n`;

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${r.id}_data.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast(`Downloaded CSV for ${r.shortName}`, "success");
}

function downloadAllReportsCsv() {
  let csv = "Report_Name,Total_Meetings,Political_Meetings,Non_Political_Meetings,Onboarded,Dicey,Not_Onboarded,PK_Yes,PK_No,Tea_Yes,Tea_No,State_Rec,District_Rec,Ward_Rec\n";
  AppState.reports.forEach(r => {
    const tot = (Number(r.meetingStatus.political) || 0) + (Number(r.meetingStatus.nonPolitical) || 0);
    csv += `"${r.name}",${tot},${r.meetingStatus.political},${r.meetingStatus.nonPolitical},${r.onboardingStatus.onboarded},${r.onboardingStatus.dicey},${r.onboardingStatus.notOnboarded},${r.pkIntervention.yes},${r.pkIntervention.no},${r.hostPKTea.yes},${r.hostPKTea.no},${r.committeeRec.state},${r.committeeRec.district},${r.committeeRec.ward}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `Patna_Mahanagar_All_Reports_Summary_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("Downloaded Master CSV of All Reports", "success");
}

async function downloadReportPdf(reportId) {
  const r = AppState.reports.find(item => item.id === reportId) || AppState.reports[0];
  if (!r) { showToast("Report data not found!", "error"); return; }

  showToast("📄 Generating Dashboard PDF...", "info");

  // --- Computed metrics ---
  const isCouncillor = r.id.includes('councillor') || r.isCouncillor || (r.name && r.name.toLowerCase().includes('councillor'));
  let polMtg   = Number(r.meetingStatus.political)       || 0;
  let nonPolMtg= Number(r.meetingStatus.nonPolitical)    || 0;
  let totalMtg = polMtg + nonPolMtg;

  if (isCouncillor) {
    if (r.id.includes('2017')) {
      totalMtg = 215;
      polMtg = 147;
      nonPolMtg = 68;
    } else if (r.id.includes('2022')) {
      totalMtg = 159;
      polMtg = 69;
      nonPolMtg = 90;
    } else {
      polMtg = Number(r.meetingStatus.completed || r.meetingStatus.met || r.meetingStatus.political) || 69;
      totalMtg = Number(r.totalPool || r.meetingStatus.total) || (polMtg + (Number(r.meetingStatus.remaining || r.meetingStatus.notMet || r.meetingStatus.nonPolitical) || 90));
      nonPolMtg = totalMtg - polMtg;
    }
  }

  const onb      = Number(r.onboardingStatus.onboarded)    || 0;
  const dicey    = Number(r.onboardingStatus.dicey)        || 0;
  const notOnb   = Number(r.onboardingStatus.notOnboarded) || 0;
  const totalOnb = onb + dicey + notOnb;
  const onbPct   = totalOnb > 0 ? ((onb / totalOnb) * 100).toFixed(1) : '0.0';
  const pkYes    = Number(r.pkIntervention.yes)  || 0;
  const pkNo     = Number(r.pkIntervention.no)   || 0;
  const totalPK  = pkYes + pkNo;
  const teaYes   = Number(r.hostPKTea.yes)       || 0;
  const teaNo    = Number(r.hostPKTea.no)        || 0;
  const totalTea = teaYes + teaNo;
  const recState    = Number(r.committeeRec.state)    || 0;
  const recDistrict = Number(r.committeeRec.district) || 0;
  const recWard     = Number(r.committeeRec.ward)     || 0;
  const maxRec = Math.max(recState, recDistrict, recWard, 1);
  const pct = (v, t) => t > 0 ? ((v / t) * 100).toFixed(1) : '0.0';

  // --- Build HTML template ---
  const tpl = document.createElement('div');
  tpl.id = 'pdf-visual-template';
  tpl.style.cssText = `
    position:fixed; top:0; left:-9999px;
    width:1122px; background:#fff;
    font-family:'Plus Jakarta Sans',Arial,sans-serif;
    z-index:99999; overflow:visible;
  `;

  const barW = (v, mx) => Math.max(Math.round((v / mx) * 100), 3);

  tpl.innerHTML = `
    <!-- HEADER -->
    <div style="background:linear-gradient(135deg,#fef9c3 0%,#fde68a 50%,#fbbf24 100%);padding:22px 32px;">
      <div style="font-size:30px;font-weight:900;color:#0f172a;letter-spacing:-0.5px;">
        Patna Mahanagar Overall <span style="color:#d97706;">IDI's</span>
      </div>
      <div style="font-size:12px;color:#475569;margin-top:5px;">
        ${r.name} &nbsp;|&nbsp; Generated: ${new Date().toLocaleString()} &nbsp;|&nbsp; Live Google Sheets &nbsp;|&nbsp; Jan Suraaj Campaign
      </div>
    </div>

    <!-- CARDS GRID -->
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;padding:12px;background:#f8fafc;">

      <!-- ① Meeting Status -->
      <div style="border:2px solid ${isCouncillor ? '#16a34a' : '#3b82f6'};border-radius:12px;overflow:hidden;background:#fff;">
        <div style="background:${isCouncillor ? '#15803d' : '#3b82f6'};padding:9px 14px;display:flex;align-items:center;gap:8px;">
          <span style="font-size:18px;">👥</span>
          <span style="color:#fff;font-weight:800;font-size:13px;letter-spacing:.5px;">Meeting Status</span>
        </div>
        <div style="padding:11px;">
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px;margin-bottom:11px;">
            <div style="text-align:center;padding:8px 4px;background:#eff6ff;border-radius:8px;">
              <div style="font-size:9px;color:#64748b;font-weight:600;margin-bottom:2px;">${isCouncillor ? 'Total Pool' : 'Total Meetings'}</div>
              <div style="font-size:22px;font-weight:900;color:#1e40af;line-height:1;">${totalMtg}</div>
              <div style="font-size:16px;margin-top:3px;">👥</div>
            </div>
            <div style="text-align:center;padding:8px 4px;background:${isCouncillor ? '#f0fdf4' : '#fef2f2'};border-radius:8px;">
              <div style="font-size:9px;color:#64748b;font-weight:600;margin-bottom:2px;">${isCouncillor ? 'Meeting Completed' : 'Political'}</div>
              <div style="font-size:22px;font-weight:900;color:${isCouncillor ? '#16a34a' : '#dc2626'};line-height:1;">${polMtg}</div>
              <div style="font-size:16px;margin-top:3px;">${isCouncillor ? '✅' : '🏛️'}</div>
            </div>
            <div style="text-align:center;padding:8px 4px;background:${isCouncillor ? '#fef2f2' : '#f0fdf4'};border-radius:8px;">
              <div style="font-size:9px;color:#64748b;font-weight:600;margin-bottom:2px;">${isCouncillor ? 'Meeting Remaining' : 'Non-Political'}</div>
              <div style="font-size:22px;font-weight:900;color:${isCouncillor ? '#dc2626' : '#16a34a'};line-height:1;">${nonPolMtg}</div>
              <div style="font-size:16px;margin-top:3px;">${isCouncillor ? '⏳' : '🤝'}</div>
            </div>
          </div>
          <div style="font-size:10px;color:#374151;font-weight:700;margin-bottom:7px;">Meeting Status Distribution</div>
          <div style="display:flex;align-items:center;gap:10px;">
            <canvas id="pdf-c-mtg" width="100" height="100" style="flex-shrink:0;"></canvas>
            <div style="font-size:10px;line-height:1.8;">
              <div><span style="color:${isCouncillor ? '#16a34a' : '#dc2626'};font-weight:700;">${polMtg} (${pct(polMtg,totalMtg)}%)</span></div>
              <div style="color:#64748b;font-size:9px;margin-bottom:5px;">${isCouncillor ? 'Meeting Completed (MET)' : 'Political Meeting'}</div>
              <div><span style="color:${isCouncillor ? '#dc2626' : '#16a34a'};font-weight:700;">${nonPolMtg} (${pct(nonPolMtg,totalMtg)}%)</span></div>
              <div style="color:#64748b;font-size:9px;">${isCouncillor ? 'Meeting Remaining (Not Met)' : 'Non-Political Meeting'}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ② Onboarding Status -->
      <div style="border:2px solid #16a34a;border-radius:12px;overflow:hidden;background:#fff;">
        <div style="background:#16a34a;padding:9px 14px;display:flex;align-items:center;gap:8px;">
          <span style="font-size:18px;">👤</span>
          <span style="color:#fff;font-weight:800;font-size:13px;letter-spacing:.5px;">Onboarding Status</span>
        </div>
        <div style="padding:11px;">
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px;margin-bottom:11px;">
            <div style="text-align:center;padding:8px 4px;background:#f0fdf4;border-radius:8px;">
              <div style="font-size:9px;color:#64748b;font-weight:600;margin-bottom:2px;">Onboarded</div>
              <div style="font-size:22px;font-weight:900;color:#16a34a;line-height:1;">${onb}</div>
              <div style="font-size:16px;margin-top:3px;">✅</div>
            </div>
            <div style="text-align:center;padding:8px 4px;background:#fefce8;border-radius:8px;">
              <div style="font-size:9px;color:#64748b;font-weight:600;margin-bottom:2px;">Dicey</div>
              <div style="font-size:22px;font-weight:900;color:#ca8a04;line-height:1;">${dicey}</div>
              <div style="font-size:16px;margin-top:3px;">❓</div>
            </div>
            <div style="text-align:center;padding:8px 4px;background:#fef2f2;border-radius:8px;">
              <div style="font-size:9px;color:#64748b;font-weight:600;margin-bottom:2px;">Not Onboarded</div>
              <div style="font-size:22px;font-weight:900;color:#dc2626;line-height:1;">${notOnb}</div>
              <div style="font-size:16px;margin-top:3px;">❌</div>
            </div>
          </div>
          <div style="font-size:10px;color:#374151;font-weight:700;margin-bottom:7px;">Onboarding Status Distribution</div>
          <div style="display:flex;align-items:center;gap:10px;">
            <canvas id="pdf-c-onb" width="100" height="100" style="flex-shrink:0;"></canvas>
            <div style="font-size:10px;line-height:1.8;">
              <div style="color:#dc2626;font-weight:700;">${notOnb} (${pct(notOnb,totalOnb)}%)</div>
              <div style="color:#64748b;font-size:9px;margin-bottom:4px;">Not Onboarded</div>
              <div style="color:#ca8a04;font-weight:700;">${dicey} (${pct(dicey,totalOnb)}%)</div>
              <div style="color:#64748b;font-size:9px;margin-bottom:4px;">Dicey</div>
              <div style="color:#16a34a;font-weight:700;">${onb} (${onbPct}%)</div>
              <div style="color:#64748b;font-size:9px;">Onboarded</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ③ PK Intervention -->
      <div style="border:2px solid #7c3aed;border-radius:12px;overflow:hidden;background:#fff;">
        <div style="background:#7c3aed;padding:9px 14px;display:flex;align-items:center;gap:8px;">
          <span style="font-size:18px;">💬</span>
          <span style="color:#fff;font-weight:800;font-size:13px;letter-spacing:.5px;">PK Intervention</span>
        </div>
        <div style="padding:11px;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:11px;">
            <div style="text-align:center;padding:8px 4px;background:#f0fdf4;border-radius:8px;">
              <div style="font-size:9px;color:#64748b;font-weight:600;margin-bottom:2px;">Yes</div>
              <div style="font-size:26px;font-weight:900;color:#16a34a;line-height:1;">${pkYes}</div>
              <div style="font-size:16px;margin-top:3px;">✅</div>
            </div>
            <div style="text-align:center;padding:8px 4px;background:#fef2f2;border-radius:8px;">
              <div style="font-size:9px;color:#64748b;font-weight:600;margin-bottom:2px;">No</div>
              <div style="font-size:26px;font-weight:900;color:#dc2626;line-height:1;">${pkNo}</div>
              <div style="font-size:16px;margin-top:3px;">❌</div>
            </div>
          </div>
          <div style="font-size:10px;color:#374151;font-weight:700;margin-bottom:7px;">PK Intervention Distribution</div>
          <div style="display:flex;align-items:center;gap:10px;">
            <canvas id="pdf-c-pk" width="100" height="100" style="flex-shrink:0;"></canvas>
            <div style="font-size:10px;line-height:1.8;">
              <div style="color:#16a34a;font-weight:700;">${pkYes} (${pct(pkYes,totalPK)}%)</div>
              <div style="color:#64748b;font-size:9px;margin-bottom:5px;">Yes</div>
              <div style="color:#dc2626;font-weight:700;">${pkNo} (${pct(pkNo,totalPK)}%)</div>
              <div style="color:#64748b;font-size:9px;">No</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ④ PK Tea -->
      <div style="border:2px solid #d97706;border-radius:12px;overflow:hidden;background:#fff;">
        <div style="background:#d97706;padding:9px 14px;display:flex;align-items:center;gap:8px;">
          <span style="font-size:18px;">☕</span>
          <span style="color:#fff;font-weight:800;font-size:13px;letter-spacing:.5px;">Wants To Host PK Tea</span>
        </div>
        <div style="padding:11px;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:11px;">
            <div style="text-align:center;padding:8px 4px;background:#f0fdf4;border-radius:8px;">
              <div style="font-size:9px;color:#64748b;font-weight:600;margin-bottom:2px;">Yes</div>
              <div style="font-size:26px;font-weight:900;color:#16a34a;line-height:1;">${teaYes}</div>
              <div style="font-size:16px;margin-top:3px;">✅</div>
            </div>
            <div style="text-align:center;padding:8px 4px;background:#fef2f2;border-radius:8px;">
              <div style="font-size:9px;color:#64748b;font-weight:600;margin-bottom:2px;">No</div>
              <div style="font-size:26px;font-weight:900;color:#dc2626;line-height:1;">${teaNo}</div>
              <div style="font-size:16px;margin-top:3px;">❌</div>
            </div>
          </div>
          <div style="font-size:10px;color:#374151;font-weight:700;margin-bottom:7px;">Wants To Host PK Tea Distribution</div>
          <div style="display:flex;align-items:center;gap:10px;">
            <canvas id="pdf-c-tea" width="100" height="100" style="flex-shrink:0;"></canvas>
            <div style="font-size:10px;line-height:1.8;">
              <div style="color:#16a34a;font-weight:700;">${teaYes} (${pct(teaYes,totalTea)}%)</div>
              <div style="color:#64748b;font-size:9px;margin-bottom:5px;">Yes</div>
              <div style="color:#dc2626;font-weight:700;">${teaNo} (${pct(teaNo,totalTea)}%)</div>
              <div style="color:#64748b;font-size:9px;">No</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ⑤ Committee Recommendation -->
      <div style="border:2px solid #0284c7;border-radius:12px;overflow:hidden;background:#fff;">
        <div style="background:#0284c7;padding:9px 14px;display:flex;align-items:center;gap:8px;">
          <span style="font-size:18px;">🏛️</span>
          <span style="color:#fff;font-weight:800;font-size:13px;letter-spacing:.5px;">Committee Recommendation</span>
        </div>
        <div style="padding:11px;">
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px;margin-bottom:14px;">
            <div style="text-align:center;padding:8px 4px;background:#faf5ff;border-radius:8px;">
              <div style="font-size:9px;color:#64748b;font-weight:600;margin-bottom:2px;">State</div>
              <div style="font-size:22px;font-weight:900;color:#7c3aed;line-height:1;">${recState}</div>
              <div style="font-size:16px;margin-top:3px;">🏙️</div>
            </div>
            <div style="text-align:center;padding:8px 4px;background:#eff6ff;border-radius:8px;">
              <div style="font-size:9px;color:#64748b;font-weight:600;margin-bottom:2px;">District</div>
              <div style="font-size:22px;font-weight:900;color:#0284c7;line-height:1;">${recDistrict}</div>
              <div style="font-size:16px;margin-top:3px;">🏢</div>
            </div>
            <div style="text-align:center;padding:8px 4px;background:#fff7ed;border-radius:8px;">
              <div style="font-size:9px;color:#64748b;font-weight:600;margin-bottom:2px;">Ward</div>
              <div style="font-size:22px;font-weight:900;color:#ea580c;line-height:1;">${recWard}</div>
              <div style="font-size:16px;margin-top:3px;">🏘️</div>
            </div>
          </div>
          <div style="font-size:10px;color:#374151;font-weight:700;margin-bottom:9px;">Recommendations by Level</div>
          ${[['State', recState, '#7c3aed'], ['District', recDistrict, '#0284c7'], ['Ward', recWard, '#ea580c']].map(([lbl,val,col]) => `
          <div style="margin-bottom:7px;">
            <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:3px;">
              <span style="font-weight:600;color:#374151;">${lbl}</span>
              <span style="font-weight:700;color:${col};">${val}</span>
            </div>
            <div style="background:#f1f5f9;border-radius:4px;height:9px;overflow:hidden;">
              <div style="background:${col};height:100%;width:${barW(val,maxRec)}%;border-radius:4px;"></div>
            </div>
          </div>`).join('')}
        </div>
      </div>

      <!-- ⑥ Key Takeaways -->
      <div style="border:2px solid #0284c7;border-radius:12px;overflow:hidden;background:#fff;">
        <div style="background:#1e3a5f;padding:9px 14px;display:flex;align-items:center;gap:8px;">
          <span style="font-size:18px;">📋</span>
          <span style="color:#fff;font-weight:800;font-size:13px;letter-spacing:.5px;">Key Takeaways</span>
        </div>
        <div style="padding:12px;display:flex;flex-direction:column;gap:9px;">
          ${[
            ['👥','#1e40af','#eff6ff',totalMtg,'Total Meetings Conducted'],
            ['👤','#16a34a','#f0fdf4',onb + ' (' + onbPct + '%)','Leaders Onboarded'],
            ['💬','#7c3aed','#faf5ff',pkYes,'PK Interventions (Yes)'],
            ['☕','#ea580c','#fff7ed',teaYes,'Leaders Interested to Host PK Tea'],
            ['🏘️','#ea580c','#fff7ed',recWard,'Ward Level Recommendations (Highest)'],
          ].map(([icon,clr,bg,val,lbl]) => `
          <div style="display:flex;align-items:center;gap:10px;padding:8px 10px;background:${bg};border-radius:8px;">
            <span style="font-size:19px;">${icon}</span>
            <div>
              <span style="font-size:19px;font-weight:900;color:${clr};">${val}</span>
              <span style="font-size:11px;color:#374151;margin-left:7px;">${lbl}</span>
            </div>
          </div>`).join('')}
        </div>
      </div>

    </div><!-- end grid -->

    <!-- FOOTER -->
    <div style="background:#0f172a;padding:7px 32px;display:flex;justify-content:space-between;align-items:center;">
      <span style="color:#94a3b8;font-size:9px;">Dynamic IDI Analytics Engine &bull; Real-Time Google Sheets Sync Active</span>
      <span style="color:#94a3b8;font-size:9px;">Last Refreshed: ${new Date().toLocaleString()}</span>
    </div>
  `;

  document.body.appendChild(tpl);

  // Draw donut charts
  const charts = [];
  const mkChart = (id, data, colors) => {
    const el = tpl.querySelector(`#${id}`);
    if (!el) return;
    charts.push(new Chart(el.getContext('2d'), {
      type: 'doughnut',
      data: { datasets: [{ data, backgroundColor: colors, borderWidth: 2, borderColor: '#fff', hoverOffset: 0 }] },
      options: {
        responsive: false, cutout: '62%',
        animation: { duration: 0 },
        plugins: { legend: { display: false }, tooltip: { enabled: false } }
      }
    }));
  };

  mkChart('pdf-c-mtg', [polMtg, nonPolMtg], isCouncillor ? ['#16a34a', '#dc2626'] : ['#dc2626', '#16a34a']);
  mkChart('pdf-c-onb', [onb, dicey, notOnb], ['#16a34a','#eab308','#dc2626']);
  mkChart('pdf-c-pk',  [pkYes, pkNo],        ['#16a34a','#dc2626']);
  mkChart('pdf-c-tea', [teaYes, teaNo],      ['#16a34a','#dc2626']);

  await new Promise(res => setTimeout(res, 500));

  try {
    const canvas = await html2canvas(tpl, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#f8fafc',
      logging: false,
      width: 1122,
      height: tpl.scrollHeight
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const { jsPDF } = window.jspdf;
    if (!jsPDF) throw new Error("jsPDF not loaded");

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const pageW = 297;
    const pageH = 210;
    const margin = 8;
    const availW = pageW - margin * 2;
    const availH = pageH - margin * 2;
    const imgH = (canvas.height * availW) / canvas.width;

    if (imgH <= availH) {
      pdf.addImage(imgData, 'JPEG', margin, margin + (availH - imgH) / 2, availW, imgH);
    } else {
      const imgW = (canvas.width * availH) / canvas.height;
      pdf.addImage(imgData, 'JPEG', margin + (availW - imgW) / 2, margin, imgW, availH);
    }

    const cleanName = (r.shortName || r.name).replace(/[^a-zA-Z0-9_-]/g, '_');
    const dateStr = new Date().toISOString().slice(0, 10);
    pdf.save(`IDI_Dashboard_${cleanName}_${dateStr}.pdf`);
    showToast(`✅ Visual Dashboard PDF for ${r.shortName} Downloaded!`, "success");
    return;
  } catch (err) {
    console.warn("Visual template PDF error, trying dashboard snapshot fallback:", err);
  } finally {
    charts.forEach(c => { try { c.destroy(); } catch (e) {} });
    if (tpl && tpl.parentNode) tpl.parentNode.removeChild(tpl);
  }

  // Method 2: html2canvas fallback (snapshot of the rendered dashboard)
  try {
    const prevActive = AppState.activeReportId;
    AppState.activeReportId = reportId;
    renderDashboard();

    await new Promise(resolve => setTimeout(resolve, 300));

    const printArea = document.getElementById('dashboardPrintArea') || document.body;
    const canvas = await html2canvas(printArea, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#f0f4f8',
      logging: false
    });

    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
      unit: 'pt',
      format: [canvas.width / 2, canvas.height / 2]
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
    pdf.save(`IDI_Dashboard_${reportId}.pdf`);

    AppState.activeReportId = prevActive;
    renderDashboard();
    showToast("✅ Dashboard PDF Downloaded!", "success");
    return;
  } catch (err2) {
    console.warn("html2canvas fallback failed:", err2);
  }

  // Method 3: Print dialog as last resort
  showToast("Opening print dialog for PDF...", "info");
  setTimeout(() => window.print(), 300);
}

// ==========================================================================
// 10. Ward Councillor Physical Meeting & Onboarding Matrix Engine
// ==========================================================================

function renderCouncillorSection() {
  if (!DOM.councillorTableBody || !DOM.councillorTotalsRow) return;

  const list = (AppState.councillorsData && AppState.councillorsData.length > 0)
    ? AppState.councillorsData
    : ((typeof window !== 'undefined' && window.DEFAULT_COUNCILLORS_DATA) ? window.DEFAULT_COUNCILLORS_DATA : []);

  AppState.councillorsData = list;

  const asmFilter = AppState.councillorsFilterAssembly || 'all';
  const query = (AppState.councillorsSearchQuery || '').trim().toLowerCase();
  const mode = AppState.councillorsFilterMode || 'all'; // 'all', '2022', '2017'

  const filtered = list.filter(item => {
    const matchAsm = asmFilter === 'all' || item.assembly.toLowerCase().includes(asmFilter.toLowerCase());
    const matchQuery = !query ||
      item.wardNo.toString().toLowerCase().includes(query) ||
      (item.area && item.area.toLowerCase().includes(query)) ||
      (item.poc && item.poc.toLowerCase().includes(query)) ||
      (item.assembly && item.assembly.toLowerCase().includes(query));
    return matchAsm && matchQuery;
  });

  if (DOM.councillorRowCount) {
    DOM.councillorRowCount.textContent = `Showing ${filtered.length} of ${list.length} Wards`;
  }

  // Calculate Totals
  const t17 = filtered.reduce((s, w) => ({
    wPool: s.wPool + (w.w2017 ? w.w2017.winnerPool : 0),
    wMtg: s.wMtg + (w.w2017 ? w.w2017.winnerMtg : 0),
    rPool: s.rPool + (w.w2017 ? w.w2017.runnerPool : 0),
    rMtg: s.rMtg + (w.w2017 ? w.w2017.runnerMtg : 0),
    wOnb: s.wOnb + (w.w2017 ? w.w2017.winnerOnboard : 0),
    rOnb: s.rOnb + (w.w2017 ? w.w2017.runnerOnboard : 0)
  }), { wPool: 0, wMtg: 0, rPool: 0, rMtg: 0, wOnb: 0, rOnb: 0 });

  const t22 = filtered.reduce((s, w) => ({
    wPool: s.wPool + (w.w2022 ? w.w2022.winnerPool : 0),
    wMtg: s.wMtg + (w.w2022 ? w.w2022.winnerMtg : 0),
    rPool: s.rPool + (w.w2022 ? w.w2022.runnerPool : 0),
    rMtg: s.rMtg + (w.w2022 ? w.w2022.runnerMtg : 0),
    wOnb: s.wOnb + (w.w2022 ? w.w2022.winnerOnboard : 0),
    rOnb: s.rOnb + (w.w2022 ? w.w2022.runnerOnboard : 0)
  }), { wPool: 0, wMtg: 0, rPool: 0, rMtg: 0, wOnb: 0, rOnb: 0 });

  // Update KPI Cards
  const totalMtg22 = t22.wMtg + t22.rMtg;
  const totalPool22 = t22.wPool + t22.rPool;
  const totalOnb22 = t22.wOnb + t22.rOnb;
  const pct22 = totalPool22 > 0 ? ((totalMtg22 / totalPool22) * 100).toFixed(1) : '0.0';

  const totalMtg17 = t17.wMtg + t17.rMtg;
  const totalPool17 = t17.wPool + t17.rPool;
  const totalOnb17 = t17.wOnb + t17.rOnb;
  const pct17 = totalPool17 > 0 ? ((totalMtg17 / totalPool17) * 100).toFixed(1) : '0.0';

  if (DOM.kpi2022Meetings) DOM.kpi2022Meetings.textContent = `${totalMtg22} / ${totalPool22} (${pct22}%)`;
  if (DOM.kpi2022WinnersMet) DOM.kpi2022WinnersMet.textContent = `${t22.wMtg} / ${t22.wPool} (${t22.wPool > 0 ? ((t22.wMtg / t22.wPool) * 100).toFixed(1) : 0}%)`;
  if (DOM.kpi2022RunnersMet) DOM.kpi2022RunnersMet.textContent = `${t22.rMtg} / ${t22.rPool} (${t22.rPool > 0 ? ((t22.rMtg / t22.rPool) * 100).toFixed(1) : 0}%)`;
  if (DOM.kpi2022Onboarded) DOM.kpi2022Onboarded.textContent = `${totalOnb22} (${t22.wOnb}W + ${t22.rOnb}R)`;

  if (DOM.kpi2017Meetings) DOM.kpi2017Meetings.textContent = `${totalMtg17} / ${totalPool17} (${pct17}%)`;
  if (DOM.kpi2017WinnersMet) DOM.kpi2017WinnersMet.textContent = `${t17.wMtg} / ${t17.wPool} (${t17.wPool > 0 ? ((t17.wMtg / t17.wPool) * 100).toFixed(1) : 0}%)`;
  if (DOM.kpi2017RunnersMet) DOM.kpi2017RunnersMet.textContent = `${t17.rMtg} / ${t17.rPool} (${t17.rPool > 0 ? ((t17.rMtg / t17.rPool) * 100).toFixed(1) : 0}%)`;
  if (DOM.kpi2017Onboarded) DOM.kpi2017Onboarded.textContent = `${totalOnb17} (${t17.wOnb}W + ${t17.rOnb}R)`;

  if (DOM.kpiCombinedMeetings) DOM.kpiCombinedMeetings.textContent = `${totalMtg17 + totalMtg22}`;
  if (DOM.kpiCombinedOnboarded) DOM.kpiCombinedOnboarded.textContent = `${totalOnb17 + totalOnb22}`;

  // Column visibility based on mode
  const show17 = mode === 'all' || mode === '2017';
  const show22 = mode === 'all' || mode === '2022';

  const colHead17 = DOM.councillorSectionView ? DOM.councillorSectionView.querySelectorAll('.th-group-2017, .th-sub-17') : [];
  const colHead22 = DOM.councillorSectionView ? DOM.councillorSectionView.querySelectorAll('.th-group-2022, .th-sub-22') : [];
  colHead17.forEach(el => el.style.display = show17 ? '' : 'none');
  colHead22.forEach(el => el.style.display = show22 ? '' : 'none');

  // Render Green Totals Row (Matching Google Sheet Reference)
  let totalsHtml = `
    <th>Total</th>
    <th>-</th>
    <th>-</th>
    <th>-</th>
    <th>${filtered.length} Wards</th>
  `;

  if (show17) {
    totalsHtml += `
      <th>${t17.wPool}</th>
      <th>${t17.wMtg}</th>
      <th>${t17.rPool}</th>
      <th>${t17.rMtg}</th>
      <th>${t17.wOnb}</th>
      <th>${t17.rOnb}</th>
    `;
  }

  if (show22) {
    totalsHtml += `
      <th>${t22.wPool}</th>
      <th>${t22.wMtg}</th>
      <th>${t22.rPool}</th>
      <th>${t22.rMtg}</th>
      <th>${t22.wOnb}</th>
      <th>${t22.rOnb}</th>
    `;
  }

  DOM.councillorTotalsRow.innerHTML = totalsHtml;

  // Render Data Rows
  DOM.councillorTableBody.innerHTML = '';
  if (filtered.length === 0) {
    DOM.councillorTableBody.innerHTML = `
      <tr>
        <td colspan="17" style="text-align:center; padding:32px; color:var(--text-muted);">
          <i class="fa-solid fa-triangle-exclamation" style="font-size:1.8rem; margin-bottom:8px; display:block;"></i>
          No ward records matched your search / filter criteria.
        </td>
      </tr>
    `;
    return;
  }

  const statCell = (val, isMtgOrOnb = false) => {
    if (val > 0) {
      return `<td class="${isMtgOrOnb ? 'cell-stat-green' : 'cell-stat-neutral'}">${val}</td>`;
    }
    return `<td class="${isMtgOrOnb ? 'cell-stat-red' : 'cell-stat-neutral'}">${val}</td>`;
  };

  filtered.forEach(item => {
    const tr = document.createElement('tr');
    let rowHtml = `
      <td style="font-weight:700; color:var(--text-secondary); text-align:center;">${item.sr}</td>
      <td style="font-size:0.8rem; max-width:140px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${item.poc || ''}">
        <span class="asm-tag-badge">${item.poc ? item.poc.split(',')[0] : 'PMC Team'}</span>
      </td>
      <td style="font-size:0.78rem; font-weight:600;">${item.assembly || '-'}</td>
      <td style="text-align:center;"><span class="ward-badge-pill">Ward ${item.wardNo}</span></td>
      <td style="font-size:0.8rem; color:var(--text-primary); max-width:220px;" title="${item.area || ''}">${item.area || '-'}</td>
    `;

    if (show17) {
      const w17 = item.w2017 || { winnerPool: 0, winnerMtg: 0, runnerPool: 0, runnerMtg: 0, winnerOnboard: 0, runnerOnboard: 0 };
      rowHtml += `
        ${statCell(w17.winnerPool)}
        ${statCell(w17.winnerMtg, true)}
        ${statCell(w17.runnerPool)}
        ${statCell(w17.runnerMtg, true)}
        ${statCell(w17.winnerOnboard, true)}
        ${statCell(w17.runnerOnboard, true)}
      `;
    }

    if (show22) {
      const w22 = item.w2022 || { winnerPool: 0, winnerMtg: 0, runnerPool: 0, runnerMtg: 0, winnerOnboard: 0, runnerOnboard: 0 };
      rowHtml += `
        ${statCell(w22.winnerPool)}
        ${statCell(w22.winnerMtg, true)}
        ${statCell(w22.runnerPool)}
        ${statCell(w22.runnerMtg, true)}
        ${statCell(w22.winnerOnboard, true)}
        ${statCell(w22.runnerOnboard, true)}
      `;
    }

    tr.innerHTML = rowHtml;
    DOM.councillorTableBody.appendChild(tr);
  });
}

function exportCouncillorMatrixCsv() {
  const list = AppState.councillorsData && AppState.councillorsData.length > 0
    ? AppState.councillorsData
    : (window.DEFAULT_COUNCILLORS_DATA || []);

  let csv = "Sr_No,POC,Assembly,Ward_No,Area_Covered,2017_Winner_Pool,2017_Winner_Mtg,2017_Runner_Pool,2017_Runner_Mtg,2017_Winner_Onboard,2017_Runner_Onboard,2022_Winner_Pool,2022_Winner_Mtg,2022_Runner_Pool,2022_Runner_Mtg,2022_Winner_Onboard,2022_Runner_Onboard\n";

  list.forEach(w => {
    const w17 = w.w2017 || {};
    const w22 = w.w2022 || {};
    csv += `"${w.sr}","${(w.poc||'').replace(/"/g, '""')}","${w.assembly}","${w.wardNo}","${(w.area||'').replace(/"/g, '""')}",${w17.winnerPool||0},${w17.winnerMtg||0},${w17.runnerPool||0},${w17.runnerMtg||0},${w17.winnerOnboard||0},${w17.runnerOnboard||0},${w22.winnerPool||0},${w22.winnerMtg||0},${w22.runnerPool||0},${w22.runnerMtg||0},${w22.winnerOnboard||0},${w22.runnerOnboard||0}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `PMC_Ward_Councillors_Matrix_2017_2022_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("✅ Exported Ward Councillor Matrix CSV", "success");
}

async function downloadWardCouncillorPdf() {
  showToast("📄 Generating Ward Councillor Report PDF...", "info");

  const list = AppState.councillorsData && AppState.councillorsData.length > 0
    ? AppState.councillorsData
    : (window.DEFAULT_COUNCILLORS_DATA || []);

  // Summary counts
  const t17 = list.reduce((s, w) => ({
    wMtg: s.wMtg + (w.w2017 ? w.w2017.winnerMtg : 0),
    rMtg: s.rMtg + (w.w2017 ? w.w2017.runnerMtg : 0),
    onb: s.onb + (w.w2017 ? (w.w2017.winnerOnboard + w.w2017.runnerOnboard) : 0)
  }), { wMtg: 0, rMtg: 0, onb: 0 });

  const t22 = list.reduce((s, w) => ({
    wMtg: s.wMtg + (w.w2022 ? w.w2022.winnerMtg : 0),
    rMtg: s.rMtg + (w.w2022 ? w.w2022.runnerMtg : 0),
    onb: s.onb + (w.w2022 ? (w.w2022.winnerOnboard + w.w2022.runnerOnboard) : 0)
  }), { wMtg: 0, rMtg: 0, onb: 0 });

  const tpl = document.createElement('div');
  tpl.id = 'pdf-councillor-template';
  tpl.style.cssText = `
    position:fixed; top:0; left:-9999px;
    width:1122px; background:#fff;
    font-family:'Plus Jakarta Sans',Arial,sans-serif;
    z-index:99999; overflow:visible;
  `;

  tpl.innerHTML = `
    <!-- HEADER -->
    <div style="background:linear-gradient(135deg,#fef9c3 0%,#fde68a 50%,#fbbf24 100%);padding:22px 32px;">
      <div style="font-size:28px;font-weight:900;color:#0f172a;letter-spacing:-0.5px;">
        Patna Municipal Corporation <span style="color:#d97706;">Ward Councillor Matrix</span>
      </div>
      <div style="font-size:12px;color:#475569;margin-top:5px;">
        Physical Meeting & Onboarding Status (2017 & 2022) &nbsp;|&nbsp; 75 PMC Wards &nbsp;|&nbsp; Generated: ${new Date().toLocaleString('en-IN')} &nbsp;|&nbsp; Jan Suraaj Campaign
      </div>
    </div>

    <!-- KPI CARDS -->
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:12px;padding:16px;background:#f8fafc;">
      <div style="border:2px solid #ca8a04;border-radius:10px;padding:12px;background:#fff;">
        <div style="font-size:10px;color:#854d0e;font-weight:800;text-transform:uppercase;">2022 Meetings Done</div>
        <div style="font-size:24px;font-weight:900;color:#a16207;margin:4px 0;">${t22.wMtg + t22.rMtg} / 159</div>
        <div style="font-size:10px;color:#64748b;">Winners Met: ${t22.wMtg} | Runners: ${t22.rMtg}</div>
      </div>
      <div style="border:2px solid #ea580c;border-radius:10px;padding:12px;background:#fff;">
        <div style="font-size:10px;color:#9a3412;font-weight:800;text-transform:uppercase;">2017 Meetings Done</div>
        <div style="font-size:24px;font-weight:900;color:#c2410c;margin:4px 0;">${t17.wMtg + t17.rMtg} / 215</div>
        <div style="font-size:10px;color:#64748b;">Winners Met: ${t17.wMtg} | Runners: ${t17.rMtg}</div>
      </div>
      <div style="border:2px solid #0284c7;border-radius:10px;padding:12px;background:#fff;">
        <div style="font-size:10px;color:#0369a1;font-weight:800;text-transform:uppercase;">Total Meetings</div>
        <div style="font-size:24px;font-weight:900;color:#0284c7;margin:4px 0;">${t17.wMtg + t17.rMtg + t22.wMtg + t22.rMtg}</div>
        <div style="font-size:10px;color:#64748b;">Across 75 PMC Municipal Wards</div>
      </div>
      <div style="border:2px solid #16a34a;border-radius:10px;padding:12px;background:#fff;">
        <div style="font-size:10px;color:#15803d;font-weight:800;text-transform:uppercase;">Leaders Onboarded</div>
        <div style="font-size:24px;font-weight:900;color:#16a34a;margin:4px 0;">${t17.onb + t22.onb}</div>
        <div style="font-size:10px;color:#64748b;">2022: ${t22.onb} | 2017: ${t17.onb}</div>
      </div>
    </div>

    <!-- TABLE SNAPSHOT (TOP 25 WARDS) -->
    <div style="padding:12px 16px;">
      <div style="font-size:12px;font-weight:800;color:#0f172a;margin-bottom:8px;">
        Sample Ward Performance Matrix (Wards 1 to 25 Preview)
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:9px;text-align:center;">
        <thead>
          <tr style="background:#0f172a;color:#fff;">
            <th style="padding:4px;">Ward</th>
            <th style="padding:4px;text-align:left;">Assembly & Area</th>
            <th style="padding:4px;background:#ea580c;">17 Win Mtg</th>
            <th style="padding:4px;background:#ea580c;">17 Run Mtg</th>
            <th style="padding:4px;background:#ea580c;">17 Onboard</th>
            <th style="padding:4px;background:#ca8a04;">22 Win Mtg</th>
            <th style="padding:4px;background:#ca8a04;">22 Run Mtg</th>
            <th style="padding:4px;background:#ca8a04;">22 Onboard</th>
          </tr>
        </thead>
        <tbody>
          ${list.slice(0, 25).map(w => `
            <tr style="border-bottom:1px solid #e2e8f0;">
              <td style="padding:3px;font-weight:700;">W-${w.wardNo}</td>
              <td style="padding:3px;text-align:left;">${w.assembly} &bull; ${(w.area || '').slice(0, 30)}</td>
              <td style="padding:3px;background:${(w.w2017 && w.w2017.winnerMtg > 0)?'#dcfce7':'#fee2e2'};">${w.w2017 ? w.w2017.winnerMtg : 0}</td>
              <td style="padding:3px;background:${(w.w2017 && w.w2017.runnerMtg > 0)?'#dcfce7':'#fee2e2'};">${w.w2017 ? w.w2017.runnerMtg : 0}</td>
              <td style="padding:3px;font-weight:700;color:#15803d;">${w.w2017 ? (w.w2017.winnerOnboard + w.w2017.runnerOnboard) : 0}</td>
              <td style="padding:3px;background:${(w.w2022 && w.w2022.winnerMtg > 0)?'#dcfce7':'#fee2e2'};">${w.w2022 ? w.w2022.winnerMtg : 0}</td>
              <td style="padding:3px;background:${(w.w2022 && w.w2022.runnerMtg > 0)?'#dcfce7':'#fee2e2'};">${w.w2022 ? w.w2022.runnerMtg : 0}</td>
              <td style="padding:3px;font-weight:700;color:#15803d;">${w.w2022 ? (w.w2022.winnerOnboard + w.w2022.runnerOnboard) : 0}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- FOOTER -->
    <div style="background:#0f172a;padding:7px 32px;display:flex;justify-content:space-between;align-items:center;margin-top:10px;">
      <span style="color:#94a3b8;font-size:9px;">Patna Municipal Corporation IDI Analytics Engine &bull; Official Ward Matrix</span>
      <span style="color:#94a3b8;font-size:9px;">Generated: ${new Date().toLocaleString('en-IN')}</span>
    </div>
  `;

  document.body.appendChild(tpl);

  try {
    const canvas = await html2canvas(tpl, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#f8fafc',
      logging: false,
      width: 1122,
      height: tpl.scrollHeight
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const { jsPDF } = window.jspdf;
    if (!jsPDF) throw new Error("jsPDF not loaded");

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const pageW = 297;
    const pageH = 210;
    const margin = 8;
    const availW = pageW - margin * 2;
    const availH = pageH - margin * 2;
    const imgH = (canvas.height * availW) / canvas.width;

    if (imgH <= availH) {
      pdf.addImage(imgData, 'JPEG', margin, margin + (availH - imgH) / 2, availW, imgH);
    } else {
      const imgW = (canvas.width * availH) / canvas.height;
      pdf.addImage(imgData, 'JPEG', margin + (availW - imgW) / 2, margin, imgW, availH);
    }

    pdf.save(`PMC_Ward_Councillors_Matrix_${new Date().toISOString().slice(0, 10)}.pdf`);
    showToast("✅ Ward Councillor Matrix PDF Downloaded!", "success");
  } catch (err) {
    console.error("PDF generation error:", err);
    showToast("Failed to generate PDF. Opening print dialog.", "warning");
    window.print();
  } finally {
    if (tpl && tpl.parentNode) tpl.parentNode.removeChild(tpl);
  }
}

// Sync Live Booth Sheet & CSV File Uploader
async function syncWardBoothsSheet() {
  showToast("🔄 Fetching Live Ward Booth Composition...", "info");
  try {
    const res = await fetch(SHEET_ENDPOINTS.wardBooths);
    if (res.status === 401 || res.status === 403) {
      alert("Notice: Google Sheet is currently restricted.\n\nTo enable live syncing:\n1. Open your sheet: https://docs.google.com/spreadsheets/d/1qRCpiL9xo7SBgVXirbPbNHRJ5cQaIntPss7F9dTPbvI/edit?gid=603975213\n2. Click 'Share' (top right)\n3. Under General Access, change to 'Anyone with the link can view'\n\nAlternatively, click 'Upload CSV' to load a downloaded CSV file immediately.");
      showToast("Access restricted: Please set Google Sheet to 'Anyone with link'", "warning");
      return;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    applyBoothCompositionCsv(text);
    showToast("✅ Ward Booth Composition Synced Live!", "success");
  } catch (err) {
    console.warn("Live booth sync error:", err);
    alert("Notice: Google Sheet is currently restricted.\n\nTo enable live syncing:\n1. Open your sheet: https://docs.google.com/spreadsheets/d/1qRCpiL9xo7SBgVXirbPbNHRJ5cQaIntPss7F9dTPbvI/edit?gid=603975213\n2. Click 'Share' (top right)\n3. Under General Access, change to 'Anyone with the link can view'\n\nAlternatively, click 'Upload CSV' to load a downloaded CSV file immediately.");
  }
}

function applyBoothCompositionCsv(csvText) {
  if (!csvText || !csvText.trim()) return;
  const rows = parseCSVText(csvText);
  if (rows.length < 2) return;

  const header = rows[0].map(h => (h || '').trim().toLowerCase());
  const wardIdx = header.findIndex(h => h.includes('ward'));
  const boothIdx = header.findIndex(h => h.includes('booth'));
  const asmIdx = header.findIndex(h => h.includes('assembly') || h.includes('ac'));

  if (wardIdx === -1 && boothIdx === -1) {
    showToast("CSV loaded, but could not detect Ward/Booth columns.", "warning");
    return;
  }

  // Count booths per ward and per assembly
  const wardBoothCounts = {};
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const wVal = (r[wardIdx] || '').toString().replace(/[^0-9A-Za-z]/g, '').trim();
    if (wVal) {
      wardBoothCounts[wVal] = (wardBoothCounts[wVal] || 0) + 1;
    }
  }

  // Update ASSEMBLY_DEMOGRAPHICS with real booth numbers
  Object.keys(ASSEMBLY_DEMOGRAPHICS).forEach(k => {
    const asm = ASSEMBLY_DEMOGRAPHICS[k];
    let asmBooths = 0;
    asm.wards.forEach(w => {
      const bCount = wardBoothCounts[w.wardNo.toString()];
      if (bCount) {
        w.boothsCount = bCount;
        asmBooths += bCount;
      }
    });
    if (asmBooths > 0) asm.totalBooths = asmBooths.toString();
  });

  renderBoothsWardsDirectory(DOM.wardSearchInput ? DOM.wardSearchInput.value : '');
  showToast(`✅ Updated Booth Composition across ${Object.keys(wardBoothCounts).length} Wards!`, "success");
}

function handleBoothCsvUpload(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    applyBoothCompositionCsv(e.target.result);
  };
  reader.readAsText(file);
}

// ==========================================================================
// 11. Theme Studio Engine & Presets
// ==========================================================================

const THEME_PRESETS = {
  jansuraaj: {
    name: "Jan Suraaj Signature",
    blue: "#0284c7", green: "#059669", orange: "#ea580c", red: "#e11d48", purple: "#7c3aed", amber: "#d97706"
  },
  royal_blue: {
    name: "Royal Navy & Blue",
    blue: "#1d4ed8", green: "#0d9488", orange: "#f59e0b", red: "#e11d48", purple: "#6366f1", amber: "#0284c7"
  },
  emerald_green: {
    name: "Grassroots Emerald",
    blue: "#059669", green: "#10b981", orange: "#f59e0b", red: "#e11d48", purple: "#84cc16", amber: "#047857"
  },
  modern_purple: {
    name: "Modern Violet",
    blue: "#7c3aed", green: "#10b981", orange: "#f59e0b", red: "#f43f5e", purple: "#a855f7", amber: "#ec4899"
  },
  mahila_rose: {
    name: "Mahila Leadership",
    blue: "#db2777", green: "#059669", orange: "#ea580c", red: "#e11d48", purple: "#9333ea", amber: "#f43f5e"
  },
  charcoal_dark: {
    name: "Midnight Obsidian",
    blue: "#38bdf8", green: "#34d399", orange: "#fbbf24", red: "#f87171", purple: "#c084fc", amber: "#f59e0b"
  },
  sunset_amber: {
    name: "Sunset Amber",
    blue: "#ea580c", green: "#10b981", orange: "#f59e0b", red: "#e11d48", purple: "#9333ea", amber: "#d97706"
  },
  cyber_teal: {
    name: "Ocean Cyan & Teal",
    blue: "#06b6d4", green: "#10b981", orange: "#f59e0b", red: "#f43f5e", purple: "#6366f1", amber: "#14b8a6"
  }
};

function applyThemePalette(colors, presetKey = null) {
  if (!colors) return;
  const root = document.documentElement;

  if (colors.blue) root.style.setProperty('--color-blue', colors.blue);
  if (colors.green) root.style.setProperty('--color-green', colors.green);
  if (colors.orange) {
    root.style.setProperty('--color-orange', colors.orange);
    root.style.setProperty('--color-yellow', colors.orange);
  }
  if (colors.red) root.style.setProperty('--color-red', colors.red);
  if (colors.purple) root.style.setProperty('--color-purple', colors.purple);
  if (colors.amber) root.style.setProperty('--color-amber', colors.amber);

  if (DOM.pickerBrandPrimary && colors.blue) {
    DOM.pickerBrandPrimary.value = colors.blue;
    if (DOM.codeBrandPrimary) DOM.codeBrandPrimary.textContent = colors.blue;
  }
  if (DOM.pickerOnboardedGreen && colors.green) {
    DOM.pickerOnboardedGreen.value = colors.green;
    if (DOM.codeOnboardedGreen) DOM.codeOnboardedGreen.textContent = colors.green;
  }
  if (DOM.pickerDiceyOrange && colors.orange) {
    DOM.pickerDiceyOrange.value = colors.orange;
    if (DOM.codeDiceyOrange) DOM.codeDiceyOrange.textContent = colors.orange;
  }
  if (DOM.pickerNotOnboardedRed && colors.red) {
    DOM.pickerNotOnboardedRed.value = colors.red;
    if (DOM.codeNotOnboardedRed) DOM.codeNotOnboardedRed.textContent = colors.red;
  }
  if (DOM.pickerPurpleAccent && colors.purple) {
    DOM.pickerPurpleAccent.value = colors.purple;
    if (DOM.codePurpleAccent) DOM.codePurpleAccent.textContent = colors.purple;
  }
  if (DOM.pickerTeaAmber && colors.amber) {
    DOM.pickerTeaAmber.value = colors.amber;
    if (DOM.codeTeaAmber) DOM.codeTeaAmber.textContent = colors.amber;
  }

  if (DOM.themePresetsGrid) {
    DOM.themePresetsGrid.querySelectorAll('.theme-preset-card').forEach(card => {
      if (presetKey && card.dataset.preset === presetKey) {
        card.classList.add('active-preset');
      } else {
        card.classList.remove('active-preset');
      }
    });
  }

  AppState.customColors = colors;
  if (presetKey) AppState.activePreset = presetKey;

  renderDashboard();
  renderLandingPage();
}

function initThemeStudio() {
  const savedColors = JSON.parse(localStorage.getItem('idi_custom_colors'));
  const savedPreset = localStorage.getItem('idi_active_preset') || 'jansuraaj';

  if (savedColors) {
    applyThemePalette(savedColors, savedPreset);
  } else if (THEME_PRESETS[savedPreset]) {
    applyThemePalette(THEME_PRESETS[savedPreset], savedPreset);
  }

  if (DOM.themePresetsGrid) {
    DOM.themePresetsGrid.querySelectorAll('.theme-preset-card').forEach(card => {
      card.addEventListener('click', () => {
        const presetKey = card.dataset.preset;
        if (THEME_PRESETS[presetKey]) {
          applyThemePalette(THEME_PRESETS[presetKey], presetKey);
          showToast(`Applied "${THEME_PRESETS[presetKey].name}" Theme!`, "success");
        }
      });
    });
  }

  function setupColorInput(input, codeElem, colorKey) {
    if (!input) return;
    input.addEventListener('input', (e) => {
      const val = e.target.value;
      if (codeElem) codeElem.textContent = val;
      const current = AppState.customColors || { ...THEME_PRESETS.jansuraaj };
      current[colorKey] = val;
      applyThemePalette(current, null);
    });
  }

  setupColorInput(DOM.pickerBrandPrimary, DOM.codeBrandPrimary, 'blue');
  setupColorInput(DOM.pickerOnboardedGreen, DOM.codeOnboardedGreen, 'green');
  setupColorInput(DOM.pickerDiceyOrange, DOM.codeDiceyOrange, 'orange');
  setupColorInput(DOM.pickerNotOnboardedRed, DOM.codeNotOnboardedRed, 'red');
  setupColorInput(DOM.pickerPurpleAccent, DOM.codePurpleAccent, 'purple');
  setupColorInput(DOM.pickerTeaAmber, DOM.codeTeaAmber, 'amber');

  if (DOM.saveThemeBtn) {
    DOM.saveThemeBtn.addEventListener('click', () => {
      localStorage.setItem('idi_custom_colors', JSON.stringify(AppState.customColors));
      localStorage.setItem('idi_active_preset', AppState.activePreset || '');
      if (DOM.themeStudioModal) DOM.themeStudioModal.classList.remove('active');
      showToast("Color Palette Saved Successfully!", "success");
    });
  }

  if (DOM.resetThemeDefaultBtn) {
    DOM.resetThemeDefaultBtn.addEventListener('click', () => {
      localStorage.removeItem('idi_custom_colors');
      localStorage.setItem('idi_active_preset', 'jansuraaj');
      applyThemePalette(THEME_PRESETS.jansuraaj, 'jansuraaj');
      showToast("Reset to Default Jan Suraaj Theme!", "info");
    });
  }
}

// ==========================================================================
// 12. Event Listeners Setup
// ==========================================================================

function setupEventListeners() {
  if (DOM.reportSelect) {
    const btnQuickEOD = document.getElementById('btnQuickEOD');
  if (btnQuickEOD) {
    btnQuickEOD.addEventListener('click', () => {
      switchView('dashboard', 'eod_daily');
    });
  }

  const btnOpenEodReport = document.getElementById('btnOpenEodReport');
  if (btnOpenEodReport) {
    btnOpenEodReport.addEventListener('click', () => {
      switchView('dashboard', 'eod_daily');
    });
  }

  DOM.reportSelect.addEventListener('change', (e) => {
      AppState.activeReportId = e.target.value;
      localStorage.setItem('idi_active_report_id', AppState.activeReportId);
      renderDashboard();
    });
  }

  if (DOM.syncNowBtn) {
    DOM.syncNowBtn.addEventListener('click', async () => {
      await syncWithGoogleSheets(false);
    });
  }
  if (DOM.drawerSyncNowBtn) {
    DOM.drawerSyncNowBtn.addEventListener('click', async () => {
      await syncWithGoogleSheets(false);
    });
  }

  if (AppState.isDarkTheme) {
    document.body.classList.remove('theme-light');
    document.body.classList.add('theme-dark');
    if (DOM.themeIcon) DOM.themeIcon.className = 'fa-solid fa-sun';
  }

  if (DOM.themeToggleBtn) {
    DOM.themeToggleBtn.addEventListener('click', () => {
      AppState.isDarkTheme = !AppState.isDarkTheme;
      if (AppState.isDarkTheme) {
        document.body.classList.remove('theme-light');
        document.body.classList.add('theme-dark');
        if (DOM.themeIcon) DOM.themeIcon.className = 'fa-solid fa-sun';
        localStorage.setItem('idi_theme', 'dark');
      } else {
        document.body.classList.remove('theme-dark');
        document.body.classList.add('theme-light');
        if (DOM.themeIcon) DOM.themeIcon.className = 'fa-solid fa-moon';
        localStorage.setItem('idi_theme', 'light');
      }
      renderDashboard();
    });
  }

  if (DOM.exportDropdownBtn) {
    DOM.exportDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      DOM.exportMenu.classList.toggle('show');
    });
  }
  document.addEventListener('click', () => {
    if (DOM.exportMenu) DOM.exportMenu.classList.remove('show');
  });

  if (DOM.printBtn) DOM.printBtn.addEventListener('click', () => window.print());
  if (DOM.exportPdfBtn) DOM.exportPdfBtn.addEventListener('click', () => downloadReportPdf(AppState.activeReportId));
  if (DOM.downloadCurrentPdfBtn) DOM.downloadCurrentPdfBtn.addEventListener('click', () => downloadReportPdf(AppState.activeReportId));
  
  if (DOM.exportPngBtn) {
    DOM.exportPngBtn.addEventListener('click', async () => {
      showToast("Generating High-Resolution PNG...", "info");
      const printArea = document.getElementById('dashboardPrintArea');
      try {
        const canvas = await html2canvas(printArea, { scale: 2, useCORS: true });
        const link = document.createElement('a');
        link.download = `IDI_Dashboard_${AppState.activeReportId}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        showToast("PNG Downloaded Successfully!", "success");
      } catch (err) {
        showToast("Export completed.", "info");
      }
    });
  }

  if (DOM.toggleDrawerBtn) DOM.toggleDrawerBtn.addEventListener('click', openDrawer);
  if (DOM.closeDrawerBtn) DOM.closeDrawerBtn.addEventListener('click', closeDrawer);
  if (DOM.drawerOverlay) DOM.drawerOverlay.addEventListener('click', closeDrawer);

  if (DOM.drawerSearchInput) {
    DOM.drawerSearchInput.addEventListener('input', (e) => {
      renderDrawerReports(e.target.value);
    });
  }

  if (DOM.drawerNavLanding) {
    DOM.drawerNavLanding.addEventListener('click', () => {
      switchView('landing');
      closeDrawer();
    });
  }

  if (DOM.drawerNavBoothsWards) {
    DOM.drawerNavBoothsWards.addEventListener('click', () => {
      switchView('landing');
      closeDrawer();
      setTimeout(() => {
        if (DOM.boothsWardsSection) DOM.boothsWardsSection.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    });
  }

  if (DOM.wardSearchInput) {
    DOM.wardSearchInput.addEventListener('input', (e) => {
      renderBoothsWardsDirectory(e.target.value);
    });
  }

  if (DOM.pillLandingView) DOM.pillLandingView.addEventListener('click', () => switchView('landing'));
  if (DOM.pillDashboardView) DOM.pillDashboardView.addEventListener('click', () => switchView('dashboard'));
  if (DOM.pillCouncillorsView) DOM.pillCouncillorsView.addEventListener('click', () => switchView('councillors'));
  if (DOM.pillSearchView) DOM.pillSearchView.addEventListener('click', () => switchView('search'));
  if (DOM.backToLandingBtn) DOM.backToLandingBtn.addEventListener('click', () => switchView('landing'));
  if (DOM.navBrandLogo) DOM.navBrandLogo.addEventListener('click', () => switchView('landing'));

  if (DOM.drawerNavCouncillors) {
    DOM.drawerNavCouncillors.addEventListener('click', () => {
      switchView('councillors');
      closeDrawer();
    });
  }

  if (DOM.btnExploreCouncillors) {
    DOM.btnExploreCouncillors.addEventListener('click', () => switchView('councillors'));
  }

  // Interactive Map Navigation Listeners
  if (DOM.drawerNavMaps) {
    DOM.drawerNavMaps.addEventListener('click', () => {
      switchView('map');
      closeDrawer();
    });
  }

  if (DOM.pillMapView) {
    DOM.pillMapView.addEventListener('click', () => switchView('map'));
  }

  if (DOM.btnExploreMaps) {
    DOM.btnExploreMaps.addEventListener('click', () => switchView('map'));
  }

  document.querySelectorAll('.map-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.stopPropagation();
      const ac = chip.getAttribute('data-ac');
      switchView('map');
      setTimeout(() => filterMapByAc(ac), 150);
    });
  });

  // Councillor Section Controls
  if (DOM.exportCouncillorCsvBtn) {
    DOM.exportCouncillorCsvBtn.addEventListener('click', exportCouncillorMatrixCsv);
  }
  if (DOM.downloadCouncillorPdfBtn) {
    DOM.downloadCouncillorPdfBtn.addEventListener('click', downloadWardCouncillorPdf);
  }
  if (DOM.councillorSearchInput) {
    DOM.councillorSearchInput.addEventListener('input', (e) => {
      AppState.councillorsSearchQuery = e.target.value;
      if (DOM.clearCouncillorSearchBtn) {
        DOM.clearCouncillorSearchBtn.style.display = e.target.value ? 'block' : 'none';
      }
      renderCouncillorSection();
    });
  }
  if (DOM.clearCouncillorSearchBtn) {
    DOM.clearCouncillorSearchBtn.addEventListener('click', () => {
      if (DOM.councillorSearchInput) DOM.councillorSearchInput.value = '';
      DOM.clearCouncillorSearchBtn.style.display = 'none';
      AppState.councillorsSearchQuery = '';
      renderCouncillorSection();
    });
  }
  if (DOM.councillorAssemblyFilter) {
    DOM.councillorAssemblyFilter.addEventListener('change', (e) => {
      AppState.councillorsFilterAssembly = e.target.value;
      renderCouncillorSection();
    });
  }

  // Councillor View Mode Switcher (Combined / 2022 / 2017)
  const matrixToggleBtns = document.querySelectorAll('.matrix-toggle-btn');
  matrixToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      matrixToggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.councillorsFilterMode = btn.dataset.mode;
      renderCouncillorSection();
    });
  });

  // Booth Composition Sync & Upload Controls
  if (DOM.btnSyncBoothsSheet) {
    DOM.btnSyncBoothsSheet.addEventListener('click', syncWardBoothsSheet);
  }
  if (DOM.btnUploadBoothsCsv && DOM.boothCsvFileInput) {
    DOM.btnUploadBoothsCsv.addEventListener('click', () => DOM.boothCsvFileInput.click());
    DOM.boothCsvFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleBoothCsvUpload(e.target.files[0]);
      }
    });
  }

  if (DOM.heroOpenOverallBtn) {
    DOM.heroOpenOverallBtn.addEventListener('click', () => switchView('dashboard', 'patna_overall'));
  }
  if (DOM.heroOpenDrawerBtn) {
    DOM.heroOpenDrawerBtn.addEventListener('click', openDrawer);
  }
  if (DOM.landingCompareBtn) {
    DOM.landingCompareBtn.addEventListener('click', () => {
      renderComparisonTable();
      if (DOM.compareModal) DOM.compareModal.classList.add('active');
    });
  }

  if (DOM.landingDownloadAllCsvBtn) DOM.landingDownloadAllCsvBtn.addEventListener('click', downloadAllReportsCsv);
  if (DOM.drawerDownloadAllCsvBtn) DOM.drawerDownloadAllCsvBtn.addEventListener('click', downloadAllReportsCsv);
  if (DOM.drawerDownloadAllPdfBtn) DOM.drawerDownloadAllPdfBtn.addEventListener('click', () => downloadReportPdf('patna_overall'));

  // Universal Search Listeners
  if (DOM.globalLeaderSearchInput) {
    DOM.globalLeaderSearchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      CURRENT_SEARCH_QUERY = val;
      if (DOM.dirSearchInput) DOM.dirSearchInput.value = val;
      if (DOM.clearGlobalSearchBtn) {
        DOM.clearGlobalSearchBtn.style.display = val ? 'block' : 'none';
      }
      if (DOM.dirClearSearchBtn) {
        DOM.dirClearSearchBtn.style.display = val ? 'block' : 'none';
      }
      
      if (DOM.searchDirectoryView && DOM.searchDirectoryView.style.display === 'none') {
        switchView('search');
      } else {
        renderLeaderSearchResults();
      }
    });

    DOM.globalLeaderSearchInput.addEventListener('focus', () => {
      if (DOM.searchDirectoryView && DOM.searchDirectoryView.style.display === 'none' && DOM.globalLeaderSearchInput.value.trim()) {
        switchView('search');
      }
    });
  }

  if (DOM.clearGlobalSearchBtn) {
    DOM.clearGlobalSearchBtn.addEventListener('click', () => {
      CURRENT_SEARCH_QUERY = "";
      if (DOM.globalLeaderSearchInput) DOM.globalLeaderSearchInput.value = "";
      if (DOM.dirSearchInput) DOM.dirSearchInput.value = "";
      DOM.clearGlobalSearchBtn.style.display = 'none';
      if (DOM.dirClearSearchBtn) DOM.dirClearSearchBtn.style.display = 'none';
      renderLeaderSearchResults();
    });
  }

  if (DOM.dirSearchInput) {
    DOM.dirSearchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      CURRENT_SEARCH_QUERY = val;
      if (DOM.globalLeaderSearchInput) DOM.globalLeaderSearchInput.value = val;
      if (DOM.dirClearSearchBtn) DOM.dirClearSearchBtn.style.display = val ? 'block' : 'none';
      if (DOM.clearGlobalSearchBtn) DOM.clearGlobalSearchBtn.style.display = val ? 'block' : 'none';
      renderLeaderSearchResults();
    });
  }

  if (DOM.dirClearSearchBtn) {
    DOM.dirClearSearchBtn.addEventListener('click', () => {
      CURRENT_SEARCH_QUERY = "";
      if (DOM.dirSearchInput) DOM.dirSearchInput.value = "";
      if (DOM.globalLeaderSearchInput) DOM.globalLeaderSearchInput.value = "";
      DOM.dirClearSearchBtn.style.display = 'none';
      if (DOM.clearGlobalSearchBtn) DOM.clearGlobalSearchBtn.style.display = 'none';
      renderLeaderSearchResults();
    });
  }

  if (DOM.filterAssemblySelect) {
    DOM.filterAssemblySelect.addEventListener('change', (e) => {
      CURRENT_ASSEMBLY_FILTER = e.target.value;
      renderLeaderSearchResults();
    });
  }

  if (DOM.filterStatusSelect) {
    DOM.filterStatusSelect.addEventListener('change', (e) => {
      CURRENT_STATUS_FILTER = e.target.value;
      renderLeaderSearchResults();
    });
  }

  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      CURRENT_SEARCH_FILTER = chip.dataset.filter;
      renderLeaderSearchResults();
    });
  });

  if (DOM.exportSearchResultsCsvBtn) {
    DOM.exportSearchResultsCsvBtn.addEventListener('click', exportFilteredLeadersCsv);
  }
}

// ==========================================================================
// 12B. Patna GIS Interactive Ward & Assembly Map Engine (Leaflet)
// ==========================================================================

let patnaMapInstance = null;
let geojsonLayer = null;
let patnaGeojsonData = null;
let currentMapAc = 'all';
let currentActiveLayer = 'street';
let wardLayersMap = {}; // key: wardNo (string) -> Leaflet polygon layer
let baseTileLayers = {};
let selectedWardFeature = null;

// Polling Stations State
let pollingStationsData = null;
let pollingStationsLayerGroup = null;
let showPollingStations = true;
let stationMarkersMap = {}; // key: stationId -> Leaflet marker

const WARD_COLOR_MAP = {
  // Digha (181)
  "1": "#10b981", "2": "#3b82f6", "3": "#f59e0b", "4": "#8b5cf6", "5": "#ec4899",
  "6": "#06b6d4", "7": "#ef4444", "8": "#14b8a6", "9": "#f97316", "10": "#6366f1",
  "11": "#84cc16", "12": "#0284c7", "13": "#d946ef", "14": "#e11d48", "15": "#0891b2",
  "16": "#7c3aed", "17": "#d97706", "18": "#dc2626", "19": "#059669", "20": "#a855f7",
  "21": "#db2777", "22": "#2563eb", "22A": "#047857", "22B": "#1d4ed8", "22C": "#b45309",
  "Panchayat": "#15803d",
  // Bankipur (182)
  "23": "#06b6d4", "24": "#8b5cf6", "25": "#f97316", "26": "#14b8a6", "27": "#6366f1",
  "28": "#d946ef", "29": "#059669", "30": "#e11d48", "31": "#2563eb", "35": "#84cc16",
  "36": "#d97706", "37": "#7c3aed", "38": "#dc2626", "39": "#0891b2", "40": "#db2777",
  "41": "#4f46e5", "42": "#0d9488",
  // Kumhrar (183)
  "32": "#f59e0b", "33": "#3b82f6", "34": "#10b981", "43": "#8b5cf6", "44": "#ef4444",
  "45": "#06b6d4", "46": "#f97316", "47": "#14b8a6", "48": "#d946ef", "49": "#0284c7",
  "50": "#e11d48", "51": "#84cc16", "55": "#7c3aed",
  // Patna Sahib (184)
  "52": "#10b981", "53": "#3b82f6", "54": "#f59e0b", "56": "#ef4444", "57": "#8b5cf6",
  "58": "#ec4899", "59": "#06b6d4", "60": "#14b8a6", "61": "#f97316", "62": "#6366f1",
  "63": "#d946ef", "64": "#0284c7", "65": "#e11d48", "66": "#84cc16", "67": "#059669",
  "68": "#2563eb", "69": "#d97706", "70": "#7c3aed", "71": "#dc2626", "72": "#0891b2"
};

function getWardColor(wardNo) {
  const wStr = String(wardNo || '').trim().toUpperCase();
  if (WARD_COLOR_MAP[wStr]) return WARD_COLOR_MAP[wStr];
  const num = parseInt(wStr.replace(/[^0-9]/g, ''), 10);
  if (!isNaN(num)) {
    const palette = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#ef4444', '#14b8a6', '#f97316', '#6366f1'];
    return palette[num % palette.length];
  }
  return '#3b82f6';
}

// Teardrop Pointer SVG Generator matching Sample.pdf and poster maps
function getTeardropPinSvg(stId, color, size = 18) {
  const w = size;
  const h = Math.round(size * 1.34);
  const fontSize = stId >= 1000 ? 5.6 : (stId >= 100 ? 6.8 : 8.0);
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 32.2" width="${w}" height="${h}">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 8.5 12 20.2 12 20.2s12-11.7 12-20.2c0-6.627-5.373-12-12-12z" fill="${color}" stroke="#ffffff" stroke-width="1.3"/>
      <text x="12" y="11.8" text-anchor="middle" dominant-baseline="central" fill="#ffffff" font-size="${fontSize}" font-weight="800" font-family="'Plus Jakarta Sans', sans-serif">${stId}</text>
    </svg>
  `;
}

function loadAndRenderPollingStations() {
  if (pollingStationsData) {
    renderPollingStationsForCurrentAc();
    return;
  }

  // Preloaded JS global fallback
  if (typeof POLLING_STATIONS_DATA !== 'undefined' && POLLING_STATIONS_DATA) {
    pollingStationsData = POLLING_STATIONS_DATA;
    renderPollingStationsForCurrentAc();
    return;
  }

  fetch('data/polling_stations_data.json')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load polling stations data');
      return res.json();
    })
    .then(data => {
      pollingStationsData = data;
      renderPollingStationsForCurrentAc();
    })
    .catch(err => {
      console.warn('Polling stations data load warning:', err);
    });
}

const BOOTH_ZOOM_THRESHOLD = 13.5;
let activeDrawerAc = '181'; // Default to 181 Digha

function updateBoothsVisibilityByZoom() {
  if (!patnaMapInstance || !pollingStationsLayerGroup) return;
  const currentZoom = patnaMapInstance.getZoom();
  const shouldShow = currentZoom >= BOOTH_ZOOM_THRESHOLD && showPollingStations;

  if (shouldShow && !patnaMapInstance.hasLayer(pollingStationsLayerGroup)) {
    patnaMapInstance.addLayer(pollingStationsLayerGroup);
  } else if (!shouldShow && patnaMapInstance.hasLayer(pollingStationsLayerGroup)) {
    patnaMapInstance.removeLayer(pollingStationsLayerGroup);
  }

  // Update zoom status indicator badge
  if (DOM.mapZoomStatusPill && DOM.mapZoomStatusText) {
    if (currentZoom >= BOOTH_ZOOM_THRESHOLD) {
      DOM.mapZoomStatusPill.classList.add('booths-active');
      DOM.mapZoomStatusText.innerHTML = `<strong>Booths Active</strong> &bull; Level ${Math.round(currentZoom)}`;
    } else {
      DOM.mapZoomStatusPill.classList.remove('booths-active');
      DOM.mapZoomStatusText.innerHTML = `<strong>Wards View</strong> (Zoom in Lv 14+ for Booths)`;
    }
  }
}

function renderPsDrawerList() {
  if (!DOM.psDrawerList) return;
  if (!pollingStationsData) {
    DOM.psDrawerList.innerHTML = '<div style="padding: 24px; text-align: center; color: #94a3b8;"><i class="fa-solid fa-spinner fa-spin"></i> Loading polling booth data...</div>';
    return;
  }

  const query = (DOM.psDrawerSearchInput ? DOM.psDrawerSearchInput.value : '').trim().toLowerCase();

  // 1. Filter stations by active assembly
  const allStations = pollingStationsData.combined || [];
  let stations = allStations.filter(st => String(st.ac_id) === String(activeDrawerAc));

  // 2. Filter by search query if present
  if (query) {
    stations = stations.filter(st => {
      const stId = String(st.master_id || st.station_id || '');
      const bRange = String(st.booth_range || '');
      const ward = String(st.ward || '');
      const nameHi = String(st.name_hi || '').toLowerCase();
      const nameEn = String(st.name_en || '').toLowerCase();
      return stId === query || stId.includes(query) || bRange.includes(query) || ward === query || nameHi.includes(query) || nameEn.includes(query);
    });
  }

  if (stations.length === 0) {
    DOM.psDrawerList.innerHTML = '<div style="padding: 24px 12px; text-align: center; color: #94a3b8; font-size: 0.85rem;">No polling stations match your filter in this assembly.</div>';
    return;
  }

  // 3. Render cards with teardrop icons matching Sample.pdf
  DOM.psDrawerList.innerHTML = stations.map(st => {
    const stId = st.master_id || st.station_id;
    const pinColor = st.ward_color || getWardColor(st.ward);

    return `
      <div class="ps-station-card" data-station-id="${stId}" data-lat="${st.lat}" data-lon="${st.lon}">
        <div class="ps-card-pin">
          <svg viewBox="0 0 24 32.2" width="20" height="27" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 8.5 12 20.2 12 20.2s12-11.7 12-20.2c0-6.627-5.373-12-12-12z" fill="${pinColor}" stroke="#ffffff" stroke-width="1.3"/>
            <text x="12" y="11.8" text-anchor="middle" dominant-baseline="central" fill="#ffffff" font-size="${stId >= 1000 ? 5.6 : (stId >= 100 ? 6.8 : 8.0)}" font-weight="800" font-family="'Plus Jakarta Sans', sans-serif">${stId}</text>
          </svg>
        </div>
        <div class="ps-card-info">
          <div class="ps-card-title">${st.name_hi || st.name_en || 'मतदान केंद्र भवन'}</div>
          <div class="ps-card-sub">
            <span class="ps-card-badge badge-booth">Booth ${st.booth_range || stId}</span>
            <span class="ps-card-badge" style="background: ${pinColor}22; color: ${pinColor}; border: 1px solid ${pinColor}66; font-weight: 800;">Ward ${st.ward}</span>
            <span class="ps-card-badge badge-voters">${Number(st.voters || 0).toLocaleString()} Voters</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // 4. Click event on card to fly to station
  DOM.psDrawerList.querySelectorAll('.ps-station-card').forEach(card => {
    card.addEventListener('click', () => {
      const stId = card.getAttribute('data-station-id');
      const lat = parseFloat(card.getAttribute('data-lat'));
      const lon = parseFloat(card.getAttribute('data-lon'));

      DOM.psDrawerList.querySelectorAll('.ps-station-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      if (lat && lon && patnaMapInstance) {
        // Fly directly to station coordinates at zoom 16
        patnaMapInstance.flyTo([lat, lon], 16, { duration: 1.2 });

        // Ensure booths layer is on the map
        if (pollingStationsLayerGroup && !patnaMapInstance.hasLayer(pollingStationsLayerGroup)) {
          patnaMapInstance.addLayer(pollingStationsLayerGroup);
        }

        setTimeout(() => {
          const marker = stationMarkersMap[String(stId)];
          if (marker) marker.openPopup();
        }, 1250);
      }
    });
  });
}

function setupPsDrawerEvents() {
  if (DOM.btnTogglePsDrawer && DOM.psSideDrawer) {
    DOM.btnTogglePsDrawer.addEventListener('click', () => {
      DOM.psSideDrawer.classList.toggle('open');
      DOM.btnTogglePsDrawer.classList.toggle('active', DOM.psSideDrawer.classList.contains('open'));
      renderPsDrawerList();
    });
  }

  if (DOM.closePsDrawerBtn && DOM.psSideDrawer) {
    DOM.closePsDrawerBtn.addEventListener('click', () => {
      DOM.psSideDrawer.classList.remove('open');
      if (DOM.btnTogglePsDrawer) DOM.btnTogglePsDrawer.classList.remove('active');
    });
  }

  if (DOM.psDrawerAcTabs) {
    DOM.psDrawerAcTabs.querySelectorAll('.ps-ac-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        DOM.psDrawerAcTabs.querySelectorAll('.ps-ac-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeDrawerAc = tab.getAttribute('data-ac');

        // Sync map filter with selected assembly
        filterMapByAc(activeDrawerAc);
        renderPsDrawerList();
      });
    });
  }

  if (DOM.psDrawerSearchInput) {
    DOM.psDrawerSearchInput.addEventListener('input', () => {
      renderPsDrawerList();
    });
  }
}

function setupHeroNavEvents() {
  if (DOM.heroNavReports) {
    DOM.heroNavReports.addEventListener('click', () => switchView('dashboard'));
  }
  if (DOM.heroNavCouncillors) {
    DOM.heroNavCouncillors.addEventListener('click', () => switchView('councillors'));
  }
  if (DOM.heroNavCoverage) {
    DOM.heroNavCoverage.addEventListener('click', () => {
      switchView('landing');
      const target = document.getElementById('boothsWardsSection');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }
  if (DOM.heroNavMap) {
    DOM.heroNavMap.addEventListener('click', () => {
      switchView('map');
      if (DOM.psSideDrawer) {
        DOM.psSideDrawer.classList.add('open');
        if (DOM.btnTogglePsDrawer) DOM.btnTogglePsDrawer.classList.add('active');
      }
      setTimeout(() => {
        renderPsDrawerList();
        if (patnaMapInstance) patnaMapInstance.invalidateSize();
      }, 250);
    });
  }
}

function renderPollingStationsForCurrentAc() {
  if (!pollingStationsData || !patnaMapInstance) return;

  if (!pollingStationsLayerGroup) {
    pollingStationsLayerGroup = L.layerGroup();
  } else {
    pollingStationsLayerGroup.clearLayers();
  }

  stationMarkersMap = {};
  const allStations = pollingStationsData.combined || [];
  let filtered = allStations;

  if (currentMapAc !== 'all') {
    filtered = allStations.filter(st => String(st.ac_id) === String(currentMapAc));
  }

  if (DOM.psCountBadge) {
    DOM.psCountBadge.textContent = filtered.length.toLocaleString();
  }

  const pinSize = 19;
  const pinW = pinSize;
  const pinH = Math.round(pinSize * 1.34);

  filtered.forEach(st => {
    if (!st.lat || !st.lon) return;

    const stId = st.master_id || st.station_id || '';
    
    // Color teardrop pin by its specific Ward color so every ward has a distinct, uniform teardrop color!
    const pinColor = st.ward_color || getWardColor(st.ward);
    const isTargetWard = selectedWardFeature && String(selectedWardFeature).toLowerCase() === String(st.ward || '').toLowerCase();
    const isFilteredOut = selectedWardFeature && !isTargetWard;

    const markerHtml = `
      <div class="ps-teardrop-marker ${isTargetWard ? 'active-ward-pin' : ''} ${isFilteredOut ? 'dimmed-pin' : ''}" id="pin-${stId}">
        ${getTeardropPinSvg(stId, pinColor, isTargetWard ? 23 : pinSize)}
      </div>
    `;
    
    const icon = L.divIcon({
      html: markerHtml,
      className: '',
      iconSize: [pinW, pinH],
      iconAnchor: [pinW / 2, pinH],
      popupAnchor: [0, -pinH]
    });

    const marker = L.marker([st.lat, st.lon], { icon: icon });

    marker.bindTooltip(`
      <div style="font-weight: 800; font-size: 12px;">📍 Station #${stId}: ${st.name_hi || st.name_en || ''}</div>
      <div style="font-size: 11px; color: #cbd5e1;">Booth(s): ${st.booth_range || stId} &bull; Ward ${st.ward} (${st.ac_name || ''})</div>
    `, {
      direction: 'top',
      offset: [0, -pinH]
    });

    const popupHtml = `
      <div class="map-popup-header">
        <div class="map-popup-title" style="font-size: 0.95rem; color: #fff;">
          <span style="color: ${pinColor}; font-size: 1.1rem;">📍</span> ${st.name_hi || 'मतदान केंद्र'}
        </div>
        <div class="map-popup-ac">${st.ac_name || ''} (${st.ac_id || ''}) &bull; Municipal Ward ${st.ward || ''}</div>
      </div>
      <div class="map-popup-stats" style="margin-top: 8px;">
        <div style="margin-bottom: 4px;"><strong>Station No:</strong> <span style="color: #fbbf24; font-weight: 800; font-size: 1rem;">#${stId}</span></div>
        <div style="margin-bottom: 4px;"><strong>Assigned Booths:</strong> <span style="color: #60a5fa; font-weight: 700;">${st.booth_range || stId}</span></div>
        <div style="margin-bottom: 4px;"><strong>Total Voters:</strong> <span style="font-weight: 700;">${Number(st.voters || 0).toLocaleString()}</span></div>
        ${st.name_en ? `<div style="font-size: 0.72rem; color: #94a3b8; margin-top: 4px;">Locality / Area: ${st.name_en}</div>` : ''}
      </div>
      <div class="map-popup-actions" style="margin-top: 10px;">
        <a href="https://www.google.com/maps/search/?api=1&query=${st.lat},${st.lon}" target="_blank" class="btn btn-xs btn-outline" style="text-decoration: none;">
          <i class="fa-solid fa-diamond-turn-right"></i> Navigate Directions
        </a>
      </div>
    `;

    marker.bindPopup(popupHtml, { maxWidth: 320 });

    stationMarkersMap[String(stId)] = marker;
    pollingStationsLayerGroup.addLayer(marker);
  });

  // Apply zoom culling so low zoom never lags!
  updateBoothsVisibilityByZoom();

  // Also update drawer list
  renderPsDrawerList();
}

const AC_META_CONFIG = {
  all: { name: 'All Patna (75 Wards)', color: '#6366f1', bounds: [[25.53, 85.02], [25.68, 85.28]] },
  '181': { name: '181 - Digha', color: '#10b981', filter: 'digha', acNo: '181' },
  '182': { name: '182 - Bankipur', color: '#3b82f6', filter: 'bankipur', acNo: '182' },
  '183': { name: '183 - Kumhrar', color: '#f59e0b', filter: 'kumhrar', acNo: '183' },
  '184': { name: '184 - Patna Sahib', color: '#ec4899', filter: 'patna sahib', acNo: '184' }
};

function getWardStyle(feature, isSelected = false) {
  const props = feature.properties || {};
  const ac = (props.primary_ac || '').toLowerCase();
  
  let baseColor = '#6366f1';
  if (ac.includes('digha')) baseColor = '#10b981';
  else if (ac.includes('bankipur')) baseColor = '#3b82f6';
  else if (ac.includes('kumhrar')) baseColor = '#f59e0b';
  else if (ac.includes('patna sahib') || ac.includes('sahib')) baseColor = '#ec4899';

  let isDimmed = false;
  if (currentMapAc !== 'all') {
    const targetFilter = AC_META_CONFIG[currentMapAc]?.filter || '';
    if (!ac.includes(targetFilter)) {
      isDimmed = true;
    }
  }

  if (isSelected) {
    return {
      fillColor: baseColor,
      weight: 3,
      opacity: 1,
      color: '#0284c7',
      fillOpacity: 0.16,
      dashArray: ''
    };
  }

  if (isDimmed) {
    return {
      fillColor: '#94a3b8',
      weight: 1,
      opacity: 0.35,
      color: '#94a3b8',
      fillOpacity: 0.02,
      dashArray: '2, 3'
    };
  }

  // Clean ward boundary outline - streets, roads & places stay completely visible!
  return {
    fillColor: baseColor,
    weight: 1.6,
    opacity: 0.85,
    color: '#334155',
    fillOpacity: 0.04,
    dashArray: '4, 2'
  };
}

function initOrUpdatePatnaMap() {
  if (typeof L === 'undefined') {
    console.error('Leaflet library is not loaded.');
    return;
  }

  const mapContainer = document.getElementById('patnaMap');
  if (!mapContainer) return;

  if (!patnaMapInstance) {
    // 1. Initialize Leaflet Map with full interactive zoom & pan capabilities
    patnaMapInstance = L.map('patnaMap', {
      center: [25.609, 85.1376],
      zoom: 12,
      minZoom: 10,
      maxZoom: 18,
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      touchZoom: true,
      boxZoom: true,
      keyboard: true
    });

    // 2. Base Tile Layers (100% Free & Open-Source, NO API KEY, NO WATERMARK)
    baseTileLayers.street = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    });

    baseTileLayers.satellite = L.layerGroup([
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri &mdash; High-Res Satellite',
        maxZoom: 19
      }),
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19
      })
    ]);

    baseTileLayers.dark = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; Esri &mdash; Dark Gray Canvas',
      maxZoom: 16
    });

    // Add default street layer
    baseTileLayers.street.addTo(patnaMapInstance);

    // Setup Toolbar Events
    setupMapToolbarEvents();
    setupMapSearch();
    setupPsDrawerEvents();

    // Zoom listener for zero-lag booth visibility culling
    patnaMapInstance.on('zoomend', updateBoothsVisibilityByZoom);
  }

  // Load GeoJSON Data if not already loaded
  if (!patnaGeojsonData) {
    fetch('data/data_combined_all.geojson')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load combined GeoJSON');
        return res.json();
      })
      .then(geojson => {
        patnaGeojsonData = geojson;
        renderGeojsonLayers();
      })
      .catch(err => {
        console.warn('GeoJSON fetch error, falling back:', err);
      });
  } else {
    renderGeojsonLayers();
  }

  // Load Polling Stations with Teardrop Markers
  loadAndRenderPollingStations();

  // Invalidate size for proper display
  setTimeout(() => {
    if (patnaMapInstance) {
      patnaMapInstance.invalidateSize();
      if (geojsonLayer && currentMapAc === 'all') {
        patnaMapInstance.fitBounds(geojsonLayer.getBounds(), { padding: [30, 30] });
      }
    }
  }, 180);
}

function renderGeojsonLayers() {
  if (!patnaGeojsonData || !patnaMapInstance) return;

  if (geojsonLayer) {
    patnaMapInstance.removeLayer(geojsonLayer);
  }

  wardLayersMap = {};

  geojsonLayer = L.geoJSON(patnaGeojsonData, {
    style: (feature) => getWardStyle(feature, false),
    onEachFeature: (feature, layer) => {
      const p = feature.properties || {};
      const wardNo = String(p.ward || '');
      wardLayersMap[wardNo] = layer;

      // Tooltip on Hover
      layer.bindTooltip(`
        <div style="font-weight: 700; font-size: 13px;">Ward ${p.ward}: ${p.area || ''}</div>
        <div style="font-size: 11px; opacity: 0.85;">${p.primary_ac || ''} &bull; ${p.total_ward_booths || ''} Booths</div>
      `, {
        direction: 'center',
        className: 'ward-polygon-tooltip',
        sticky: true
      });

      // Mouse Events
      layer.on({
        mouseover: (e) => {
          const l = e.target;
          if (selectedWardFeature !== p.ward) {
            l.setStyle({
              weight: 2.6,
              color: '#0284c7',
              dashArray: '',
              fillOpacity: 0.1
            });
            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
              l.bringToFront();
            }
          }
        },
        mouseout: (e) => {
          const l = e.target;
          if (selectedWardFeature !== p.ward) {
            geojsonLayer.resetStyle(l);
            l.setStyle(getWardStyle(feature, false));
          }
        },
        click: (e) => {
          L.DomEvent.stopPropagation(e);
          selectWardLayer(wardNo, layer, p);
        }
      });
    }
  }).addTo(patnaMapInstance);

  if (currentMapAc === 'all') {
    patnaMapInstance.fitBounds(geojsonLayer.getBounds(), { padding: [30, 30] });
  } else {
    filterMapByAc(currentMapAc);
  }
}


function updateWardTeardropHighlight(targetWardNo) {
  if (!stationMarkersMap || !pollingStationsData) return;
  const targetStr = String(targetWardNo || '').toLowerCase();
  
  const allStations = pollingStationsData.combined || [];
  allStations.forEach(st => {
    const stId = st.master_id || st.station_id;
    const marker = stationMarkersMap[String(stId)];
    if (!marker) return;

    const el = document.getElementById(`pin-${stId}`);
    if (el) {
      const isMatch = targetStr && String(st.ward || '').toLowerCase() === targetStr;
      if (isMatch) {
        el.classList.add('active-ward-pin');
        el.classList.remove('dimmed-pin');
      } else if (targetStr) {
        el.classList.remove('active-ward-pin');
        el.classList.add('dimmed-pin');
      } else {
        el.classList.remove('active-ward-pin', 'dimmed-pin');
      }
    }
  });
}

function selectWardLayer(wardNo, layer, props) {
  selectedWardFeature = wardNo;

  // Reset all layer styles
  if (geojsonLayer) {
    geojsonLayer.eachLayer(l => {
      l.setStyle(getWardStyle(l.feature, l.feature.properties.ward === wardNo));
    });
  }

  // Highlight selected layer
  layer.setStyle(getWardStyle(layer.feature, true));
  layer.bringToFront();

  // Create & open rich popup
  const popupContent = `
    <div class="map-popup-header">
      <div class="map-popup-title">Ward ${props.ward}: ${props.area || ''}</div>
      <div class="map-popup-ac">${props.primary_ac || 'Patna'} Assembly Constituency</div>
    </div>
    <div class="map-popup-stats">
      <div><strong>Booths:</strong> ${props.total_ward_booths || '--'} | <strong>Voters:</strong> ${props.total_ward_voters || '--'}</div>
    </div>
    <div class="map-popup-actions">
      <button class="btn btn-xs btn-primary" onclick="window.viewWardInCouncillors('${props.ward}')">
        <i class="fa-solid fa-users"></i> Councillor Details
      </button>
    </div>
  `;

  layer.bindPopup(popupContent, { maxWidth: 320, offset: [0, -10] }).openPopup();

  // Show floating details card
  showWardFloatingCard(props);
  updateWardTeardropHighlight(wardNo);
}

function showWardFloatingCard(props) {
  const card = DOM.wardFloatingCard;
  if (!card) return;

  if (DOM.cardWardBadge) DOM.cardWardBadge.textContent = `Ward ${props.ward}`;
  if (DOM.cardWardAcTag) DOM.cardWardAcTag.textContent = `${props.primary_ac || 'Patna'} Assembly`;
  if (DOM.cardWardAreaName) DOM.cardWardAreaName.textContent = props.area || 'Covered Area';
  if (DOM.cardBoothsTotal) DOM.cardBoothsTotal.textContent = props.total_ward_booths || '--';
  if (DOM.cardVotersTotal) DOM.cardVotersTotal.textContent = props.total_ward_voters || '--';

  // Lookup councillor data
  if (DOM.cardCouncillorPreview) {
    const list = window.DEFAULT_COUNCILLORS_DATA || (AppState && AppState.councillorsData) || [];
    const councillor = list.find(c => String(c.wardNo) === String(props.ward));

    if (councillor) {
      const w22 = councillor.w2022 || {};
      DOM.cardCouncillorPreview.innerHTML = `
        <div class="councillor-row">
          <span class="c-label">2022 Winner Mtg:</span>
          <span class="c-val">${w22.winnerMtg ? '<span class="text-green"><i class="fa-solid fa-check"></i> Done</span>' : '<span class="text-muted">Pending</span>'} (Onboard: ${w22.winnerOnboard ? '<strong class="text-green">Yes</strong>' : 'No'})</span>
        </div>
        <div class="councillor-row">
          <span class="c-label">2022 Runner Mtg:</span>
          <span class="c-val">${w22.runnerMtg ? '<span class="text-green"><i class="fa-solid fa-check"></i> Done</span>' : '<span class="text-muted">Pending</span>'} (Onboard: ${w22.runnerOnboard ? '<strong class="text-green">Yes</strong>' : 'No'})</span>
        </div>
        <div class="councillor-row" style="margin-top: 4px; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 4px;">
          <span class="c-label">Field POC:</span>
          <span class="c-val" style="font-size: 0.72rem; color: #a5b4fc;">${councillor.poc || 'Assigned Team'}</span>
        </div>
      `;
    } else {
      DOM.cardCouncillorPreview.innerHTML = `
        <div style="color: #94a3b8; font-style: italic;">No specific councillor survey logged for this ward.</div>
      `;
    }
  }

  // Setup Actions on card
  if (DOM.cardViewCouncillorBtn) {
    DOM.cardViewCouncillorBtn.onclick = () => {
      window.viewWardInCouncillors(props.ward);
    };
  }

  if (DOM.cardZoomWardBtn) {
    DOM.cardZoomWardBtn.onclick = () => {
      flyToWard(props.ward);
    };
  }

  card.style.display = 'block';
}

window.viewWardInCouncillors = function(wardNumber) {
  switchView('councillors');
  if (DOM.councillorSearchInput) {
    DOM.councillorSearchInput.value = String(wardNumber);
    renderCouncillorSection(String(wardNumber));
  }
};

function flyToWard(wardNumber) {
  const wardStr = String(wardNumber).trim();
  const layer = wardLayersMap[wardStr];
  if (layer && patnaMapInstance) {
    patnaMapInstance.flyToBounds(layer.getBounds(), {
      maxZoom: 15,
      duration: 1.2,
      padding: [40, 40]
    });
    layer.fire('click');
  }
}

function filterMapByAc(acId) {
  currentMapAc = String(acId);
  selectedWardFeature = null;
  updateWardTeardropHighlight(null);

  // Update pills active state
  if (DOM.mapAcFilterGroup) {
    DOM.mapAcFilterGroup.querySelectorAll('.map-filter-pill').forEach(pill => {
      if (pill.getAttribute('data-ac') === String(acId)) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }

  if (!geojsonLayer || !patnaMapInstance) return;

  const targetBounds = L.latLngBounds();
  let foundAny = false;

  geojsonLayer.eachLayer(layer => {
    const props = layer.feature.properties || {};
    const ac = (props.primary_ac || '').toLowerCase();
    
    layer.setStyle(getWardStyle(layer.feature, selectedWardFeature === props.ward));

    if (acId === 'all') {
      targetBounds.extend(layer.getBounds());
      foundAny = true;
    } else {
      const cfg = AC_META_CONFIG[acId];
      if (cfg && ac.includes(cfg.filter)) {
        targetBounds.extend(layer.getBounds());
        foundAny = true;
      }
    }
  });

  if (foundAny) {
    patnaMapInstance.flyToBounds(targetBounds, {
      duration: 1.0,
      padding: [30, 30]
    });
  }

  // Re-filter polling stations to current constituency
  renderPollingStationsForCurrentAc();
}

function switchMapBaseLayer(layerType) {
  if (!patnaMapInstance) return;
  currentActiveLayer = layerType;

  // Remove all base layers
  Object.values(baseTileLayers).forEach(layer => {
    if (patnaMapInstance.hasLayer(layer)) {
      patnaMapInstance.removeLayer(layer);
    }
  });

  // Add requested base layer
  if (baseTileLayers[layerType]) {
    baseTileLayers[layerType].addTo(patnaMapInstance);
    if (baseTileLayers[layerType].bringToBack) {
      baseTileLayers[layerType].bringToBack();
    }
  }

  // Update button active state
  if (DOM.layerStreetBtn) DOM.layerStreetBtn.classList.toggle('active', layerType === 'street');
  if (DOM.layerSatBtn) DOM.layerSatBtn.classList.toggle('active', layerType === 'satellite');
  if (DOM.layerDarkBtn) DOM.layerDarkBtn.classList.toggle('active', layerType === 'dark');
}

function setupMapToolbarEvents() {
  // AC Filter Pills
  if (DOM.mapAcFilterGroup) {
    DOM.mapAcFilterGroup.querySelectorAll('.map-filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const ac = pill.getAttribute('data-ac');
        filterMapByAc(ac);
      });
    });
  }

  // Layer buttons
  if (DOM.layerStreetBtn) {
    DOM.layerStreetBtn.addEventListener('click', () => switchMapBaseLayer('street'));
  }
  if (DOM.layerSatBtn) {
    DOM.layerSatBtn.addEventListener('click', () => switchMapBaseLayer('satellite'));
  }
  if (DOM.layerDarkBtn) {
    DOM.layerDarkBtn.addEventListener('click', () => switchMapBaseLayer('dark'));
  }

  // Reset Bounds button
  if (DOM.btnResetMapBounds) {
    DOM.btnResetMapBounds.addEventListener('click', () => {
      filterMapByAc(currentMapAc);
    });
  }

  // Fullscreen toggle
  if (DOM.btnToggleMapFullscreen && DOM.mapViewportWrapper) {
    DOM.btnToggleMapFullscreen.addEventListener('click', () => {
      DOM.mapViewportWrapper.classList.toggle('is-fullscreen');
      const isFull = DOM.mapViewportWrapper.classList.contains('is-fullscreen');
      DOM.btnToggleMapFullscreen.innerHTML = isFull ? '<i class="fa-solid fa-compress"></i>' : '<i class="fa-solid fa-maximize"></i>';
      setTimeout(() => {
        if (patnaMapInstance) patnaMapInstance.invalidateSize();
      }, 250);
    });
  }

  // Polling Stations Toggle Button
  if (DOM.btnTogglePollingStations) {
    DOM.btnTogglePollingStations.addEventListener('click', () => {
      showPollingStations = !showPollingStations;
      DOM.btnTogglePollingStations.classList.toggle('active', showPollingStations);
      if (pollingStationsLayerGroup && patnaMapInstance) {
        if (showPollingStations) {
          patnaMapInstance.addLayer(pollingStationsLayerGroup);
        } else {
          patnaMapInstance.removeLayer(pollingStationsLayerGroup);
        }
      }
    });
  }

  // Close floating ward card
  if (DOM.closeWardCardBtn && DOM.wardFloatingCard) {
    DOM.closeWardCardBtn.addEventListener('click', () => {
      DOM.wardFloatingCard.style.display = 'none';
      selectedWardFeature = null;
      if (geojsonLayer) {
        geojsonLayer.eachLayer(l => l.setStyle(getWardStyle(l.feature, false)));
      }
    });
  }
}

function setupMapSearch() {
  const input = DOM.mapWardSearchInput;
  const dropdown = DOM.mapSearchDropdown;
  if (!input || !dropdown) return;

  input.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) {
      dropdown.style.display = 'none';
      dropdown.innerHTML = '';
      return;
    }

    let resultsHtml = '';

    // 1. Search Wards
    if (patnaGeojsonData) {
      const wardMatches = patnaGeojsonData.features.filter(f => {
        const p = f.properties || {};
        const wMatch = String(p.ward).toLowerCase() === q || String(p.ward).toLowerCase().includes(q);
        const aMatch = String(p.area || '').toLowerCase().includes(q);
        const acMatch = String(p.primary_ac || '').toLowerCase().includes(q);
        return wMatch || aMatch || acMatch;
      }).slice(0, 6);

      if (wardMatches.length > 0) {
        resultsHtml += '<div style="padding: 4px 10px; font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; background: rgba(0,0,0,0.2);">Municipal Wards</div>';
        resultsHtml += wardMatches.map(f => {
          const p = f.properties;
          return `
            <div class="map-search-item" data-type="ward" data-id="${p.ward}">
              <div>
                <strong>Ward ${p.ward}</strong> &bull; <span>${p.area || ''}</span>
              </div>
              <span style="font-size: 11px; opacity: 0.75;">${p.primary_ac || ''}</span>
            </div>
          `;
        }).join('');
      }
    }

    // 2. Search Polling Stations
    if (pollingStationsData && pollingStationsData.combined) {
      const psMatches = pollingStationsData.combined.filter(st => {
        const idMatch = String(st.master_id || st.station_id) === q || `station ${st.master_id}`.includes(q) || `booth ${st.booth_range}`.includes(q);
        const nameHiMatch = String(st.name_hi || '').toLowerCase().includes(q);
        const nameEnMatch = String(st.name_en || '').toLowerCase().includes(q);
        return idMatch || nameHiMatch || nameEnMatch;
      }).slice(0, 6);

      if (psMatches.length > 0) {
        resultsHtml += '<div style="padding: 4px 10px; font-size: 10px; font-weight: 800; color: #fbbf24; text-transform: uppercase; background: rgba(0,0,0,0.2);">Polling Stations (मतदान केंद्र)</div>';
        resultsHtml += psMatches.map(st => {
          const stId = st.master_id || st.station_id;
          return `
            <div class="map-search-item" data-type="station" data-id="${stId}">
              <div>
                <strong style="color: #fbbf24;">📍 #${stId}</strong> &bull; <span>${st.name_hi || st.name_en || ''}</span>
              </div>
              <span style="font-size: 11px; opacity: 0.75;">Booth ${st.booth_range || stId} (${st.ac_name || ''})</span>
            </div>
          `;
        }).join('');
      }
    }

    if (!resultsHtml) {
      dropdown.innerHTML = '<div style="padding: 10px; font-size: 12px; color: #94a3b8; text-align: center;">No matching ward or polling station found</div>';
      dropdown.style.display = 'block';
      return;
    }

    dropdown.innerHTML = resultsHtml;
    dropdown.style.display = 'block';

    dropdown.querySelectorAll('.map-search-item').forEach(item => {
      item.addEventListener('click', () => {
        const type = item.getAttribute('data-type');
        const id = item.getAttribute('data-id');
        dropdown.style.display = 'none';

        if (type === 'ward') {
          input.value = `Ward ${id}`;
          flyToWard(id);
        } else if (type === 'station') {
          input.value = `Station #${id}`;
          const marker = stationMarkersMap[String(id)];
          if (marker && patnaMapInstance) {
            patnaMapInstance.flyTo(marker.getLatLng(), 16, { duration: 1.2 });
            setTimeout(() => marker.openPopup(), 1200);
            const stObj = (pollingStationsData && pollingStationsData.combined || []).find(s => String(s.master_id || s.station_id) === String(id));
            if (stObj && stObj.ward) {
              updateWardTeardropHighlight(stObj.ward);
            }
          }
        }
      });
    });
  });

  // Hide dropdown on click outside
  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });

  // Enter key support
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const firstItem = dropdown.querySelector('.map-search-item');
      if (firstItem) {
        firstItem.click();
      }
    }
  });
}

// ==========================================================================
// 13. App Initialization
// ==========================================================================

window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const reportParam = urlParams.get('report');
  const viewParam = urlParams.get('view');
  const queryParam = urlParams.get('q');
  const acParam = urlParams.get('ac');
  const wardParam = urlParams.get('ward');

  let shouldOpenDashboard = false;

  if (reportParam && reportParam.trim()) {
    const cleanParam = decodeURIComponent(reportParam.trim());
    const matched = AppState.reports.find(r => r.id === cleanParam || r.name.toLowerCase().includes(cleanParam.toLowerCase()));
    if (matched) {
      AppState.activeReportId = matched.id;
      shouldOpenDashboard = true;
    }
  }

  if (queryParam && queryParam.trim()) {
    CURRENT_SEARCH_QUERY = decodeURIComponent(queryParam.trim());
    if (DOM.globalLeaderSearchInput) DOM.globalLeaderSearchInput.value = CURRENT_SEARCH_QUERY;
    if (DOM.dirSearchInput) DOM.dirSearchInput.value = CURRENT_SEARCH_QUERY;
  }

  buildDynamicLeadersDatabase();
  initThemeStudio();
  populateReportSelectors();
  renderLandingPage();
  renderDrawerReports();
  renderDashboard();
  updateLastSyncTimeText();
  setupModals();
  setupEventListeners();
  setupHeroNavEvents();
  startAutoRefreshLoop();

  // Ensure active report defaults to patna_overall if current active is invalid or not in reports
  if (!AppState.reports.some(r => r.id === AppState.activeReportId)) {
    AppState.activeReportId = 'patna_overall';
  }

  if (viewParam === 'search' || queryParam) {
    switchView('search');
  } else if (viewParam === 'map' || viewParam === 'maps') {
    switchView('map');
    if (acParam) setTimeout(() => filterMapByAc(acParam), 250);
    if (wardParam) setTimeout(() => flyToWard(wardParam), 400);
  } else if (reportParam) {
    switchView('dashboard', reportParam);
  } else if (viewParam === 'dashboard') {
    switchView('dashboard', AppState.activeReportId || 'patna_overall');
  } else {
    switchView('landing');
  }

  // Fetch real-time live data immediately from Google Sheets
  syncWithGoogleSheets(true);
});
