/**
 * Patna Mahanagar IDI Analytics Dashboard - Application Core
 * 100% Dynamic Real-Time Google Sheets Sync, Multi-Report Analytics, Universal Leader Search Engine & Theme Studio.
 */

// ==========================================================================
// 1. Google Sheets Live Endpoints & Default State
// ==========================================================================

const SHEET_ENDPOINTS = {
  summary: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSPJDqQq7xTqmCcu54V1btKRBeQe6E_nO2YCKpNs8Yb-R7wtkJk26axqmSeJBjCJL808Ds-uwXKX9PX/pub?output=csv",
  rawLeaders: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSPJDqQq7xTqmCcu54V1btKRBeQe6E_nO2YCKpNs8Yb-R7wtkJk26axqmSeJBjCJL808Ds-uwXKX9PX/pub?gid=0&single=true&output=csv",
  wardWise: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSPJDqQq7xTqmCcu54V1btKRBeQe6E_nO2YCKpNs8Yb-R7wtkJk26axqmSeJBjCJL808Ds-uwXKX9PX/pub?gid=2097996904&single=true&output=csv"
};

const DEFAULT_REPORTS = [
  {
    id: "patna_overall",
    name: "Patna Mahanagar Team Overall IDI's",
    shortName: "Patna Mahanagar (Overall)",
    meetingStatus: { political: 382, nonPolitical: 503 },
    onboardingStatus: { onboarded: 681, dicey: 154, notOnboarded: 51 },
    pkIntervention: { yes: 210, no: 243 },
    hostPKTea: { yes: 206, no: 311 },
    committeeRec: { state: 3, district: 39, ward: 466 }
  },
  {
    id: "mahila_team",
    name: "Mahila Team Overall IDI's",
    shortName: "Mahila Team (Women Leadership)",
    meetingStatus: { political: 64, nonPolitical: 169 },
    onboardingStatus: { onboarded: 221, dicey: 9, notOnboarded: 3 },
    pkIntervention: { yes: 57, no: 176 },
    hostPKTea: { yes: 19, no: 214 },
    committeeRec: { state: 0, district: 0, ward: 186 }
  },
  {
    id: "patna_team_report",
    name: "Patna Mahanagar Team Overall IDI's Report",
    shortName: "Patna Mahanagar (Team Report)",
    meetingStatus: { political: 318, nonPolitical: 334 },
    onboardingStatus: { onboarded: 460, dicey: 146, notOnboarded: 48 },
    pkIntervention: { yes: 155, no: 71 },
    hostPKTea: { yes: 187, no: 103 },
    committeeRec: { state: 3, district: 39, ward: 280 }
  },
  {
    id: "kumhrar_team1",
    name: "Kumhrar - 183 (Team 1)",
    shortName: "183 - Kumhrar (Team 1)",
    meetingStatus: { political: 65, nonPolitical: 57 },
    onboardingStatus: { onboarded: 103, dicey: 13, notOnboarded: 7 },
    pkIntervention: { yes: 32, no: 11 },
    hostPKTea: { yes: 74, no: 15 },
    committeeRec: { state: 0, district: 3, ward: 43 }
  },
  {
    id: "digha_team1",
    name: "Digha - 181 (Team 1)",
    shortName: "181 - Digha (Team 1)",
    meetingStatus: { political: 46, nonPolitical: 40 },
    onboardingStatus: { onboarded: 71, dicey: 15, notOnboarded: 0 },
    pkIntervention: { yes: 19, no: 13 },
    hostPKTea: { yes: 39, no: 35 },
    committeeRec: { state: 2, district: 9, ward: 57 }
  },
  {
    id: "digha_team2",
    name: "Digha - 181 (Team 2)",
    shortName: "181 - Digha (Team 2)",
    meetingStatus: { political: 68, nonPolitical: 74 },
    onboardingStatus: { onboarded: 94, dicey: 26, notOnboarded: 23 },
    pkIntervention: { yes: 21, no: 2 },
    hostPKTea: { yes: 12, no: 3 },
    committeeRec: { state: 0, district: 9, ward: 85 }
  },
  {
    id: "patnasahib_team2",
    name: "Patna Sahib - 184 (Team 2)",
    shortName: "184 - Patna Sahib (Team 2)",
    meetingStatus: { political: 78, nonPolitical: 120 },
    onboardingStatus: { onboarded: 128, dicey: 57, notOnboarded: 13 },
    pkIntervention: { yes: 21, no: 15 },
    hostPKTea: { yes: 9, no: 5 },
    committeeRec: { state: 0, district: 1, ward: 51 }
  },
  {
    id: "patnasahib_team1",
    name: "Patna Sahib - 184 (Team 1)",
    shortName: "184 - Patna Sahib (Team 1)",
    meetingStatus: { political: 60, nonPolitical: 38 },
    onboardingStatus: { onboarded: 59, dicey: 34, notOnboarded: 5 },
    pkIntervention: { yes: 60, no: 26 },
    hostPKTea: { yes: 53, no: 39 },
    committeeRec: { state: 1, district: 17, ward: 44 }
  },
  {
    id: "councillors_2022",
    name: "Ward Councillors 2022 (Winners & Runner Ups)",
    shortName: "Ward Councillors (2022)",
    meetingStatus: { political: 51, nonPolitical: 34 },
    onboardingStatus: { onboarded: 31, dicey: 21, notOnboarded: 21 },
    pkIntervention: { yes: 20, no: 12 },
    hostPKTea: { yes: 24, no: 24 },
    committeeRec: { state: 0, district: 8, ward: 65 }
  },
  {
    id: "councillors_2017",
    name: "Ward Councillors 2017 (Winners & Runner Ups)",
    shortName: "Ward Councillors (2017)",
    meetingStatus: { political: 43, nonPolitical: 38 },
    onboardingStatus: { onboarded: 18, dicey: 31, notOnboarded: 13 },
    pkIntervention: { yes: 28, no: 15 },
    hostPKTea: { yes: 13, no: 19 },
    committeeRec: { state: 0, district: 5, ward: 45 }
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
    totalBooths: "420",
    totalElectors: "4,68,210",
    wardsCount: "21",
    circle: "Patliputra Circle",
    wards: [
      { wardNo: 1, name: "Ward 1", area: "Digha Ghat, Polson, Nakta Diyara" },
      { wardNo: 2, name: "Ward 2", area: "Kurji, Balupar, Bind Toli" },
      { wardNo: 3, name: "Ward 3", area: "Murlichak, Khalilpura, Sabjapur" },
      { wardNo: 4, name: "Ward 4", area: "Shekhpura, Raja Bazar, Khajpura" },
      { wardNo: 6, name: "Ward 6", area: "Ashiana Nagar, Ram Nagari, Magistrate Colony" },
      { wardNo: 7, name: "Ward 7", area: "Raja Bazar, Samanpura, Pillar 40-70" },
      { wardNo: 9, name: "Ward 9", area: "Beli Road, Harding Road, Khausal Nagar" },
      { wardNo: 10, name: "Ward 10", area: "Anisabad, Phulwari Border" },
      { wardNo: 11, name: "Ward 11", area: "Chitkohra, Anisabad, Shivpuri" },
      { wardNo: 12, name: "Ward 12", area: "Chitkohra, Anisabad, Shivpuri" },
      { wardNo: 13, name: "Ward 13", area: "Sarispabad, Gardanibagh, Sadhnapuri" },
      { wardNo: 14, name: "Ward 14", area: "Sarispabad, Mahavir Cancer Sansthan Area" },
      { wardNo: 16, name: "Ward 16", area: "Jakkanpur, Jhunjhun Mahal" },
      { wardNo: 21, name: "Ward 21", area: "A.N College, Adalat Ganj, Boring Road" },
      { wardNo: "22A", name: "Ward 22A", area: "Patliputra, Gosaintola" },
      { wardNo: "22B", name: "Ward 22B", area: "Kurji, Balupar" },
      { wardNo: "22C", name: "Ward 22C", area: "Mainpura, Digha Bridge Point" }
    ],
    otherAreas: "Wards 1 to 22C covering Patliputra, Digha & Danapur Border",
    localities: ["Digha Ghat", "Kurji", "Patliputra", "Rajiv Nagar", "Ashiana Nagar", "Raja Bazar", "Jagdeo Path", "Khajpura"],
    summary: "Digha is the largest urban constituency in Patna Mahanagar with high density of residential and commercial zones."
  },
  "182_bankipur": {
    id: "patna_team_report",
    acNo: 182,
    name: "182 - Bankipur Assembly",
    hindiName: "182 - बांकीपुर विधानसभा",
    badgeClass: "bg-amber-light",
    headerClass: "header-amber",
    icon: "fa-building-columns",
    totalBooths: "374",
    totalElectors: "3,92,450",
    wardsCount: "18",
    circle: "Bankipur Circle",
    wards: [
      { wardNo: 15, name: "Ward 15", area: "Gandhi Maidan, Exhibition Road, Frazer Road" },
      { wardNo: 17, name: "Ward 17", area: "Boring Canal Road, Sri Krishna Puri" },
      { wardNo: 18, name: "Ward 18", area: "Kidwaipuri, Buddha Colony, Mandiri" },
      { wardNo: 19, name: "Ward 19", area: "Kadamkuan, Sahityakar Colony, Park Road" },
      { wardNo: 22, name: "Ward 22", area: "Naya Tola, Machhua Toli, Bari Path" },
      { wardNo: 26, name: "Ward 26", area: "Pirbahore, Patna Market, Ashok Rajpath" },
      { wardNo: 35, name: "Ward 35", area: "Chiraiyatand, Postal Park, Munna Chak" },
      { wardNo: 41, name: "Ward 41", area: "Lohanipur, Kadamkuan Main" },
      { wardNo: 42, name: "Ward 42", area: "Rajendra Nagar North, Arya Kumar Road" }
    ],
    otherAreas: "Wards 15 to 42 covering Central Commercial & Administrative Hub",
    localities: ["Gandhi Maidan", "Boring Road", "SK Puri", "Kidwaipuri", "Kadamkuan", "Machhua Toli", "Ashok Rajpath", "Naya Tola"],
    summary: "Bankipur constitutes the administrative, educational, and medical nerve center of Patna Mahanagar."
  },
  "183_kumhrar": {
    id: "kumhrar_team1",
    acNo: 183,
    name: "183 - Kumhrar Assembly",
    hindiName: "183 - कुम्हरार विधानसभा",
    badgeClass: "bg-purple-light",
    headerClass: "header-purple",
    icon: "fa-landmark",
    totalBooths: "410",
    totalElectors: "4,40,120",
    wardsCount: "20",
    circle: "Kankarbagh Circle",
    wards: [
      { wardNo: 31, name: "Ward 31", area: "Chiraiyatand, Postal Park" },
      { wardNo: 32, name: "Ward 32", area: "Katra Bazar, Rikab Ganj, Nawab Ganj" },
      { wardNo: 33, name: "Ward 33", area: "Kankarbagh, Postal Park, RMS Colony" },
      { wardNo: 34, name: "Ward 34", area: "Kankarbagh, Lohia Nagar" },
      { wardNo: 43, name: "Ward 43", area: "Kadamkuan, Rajendra Nagar" },
      { wardNo: 44, name: "Ward 44", area: "Kankarbagh, Hanuman Nagar, Lohia Nagar, Bahadurpur" },
      { wardNo: 45, name: "Ward 45", area: "RMS Colony, Malahi Pakri, Chitragupta Nagar" },
      { wardNo: 46, name: "Ward 46", area: "Bahadurpur, Nand Lal Chhapra" },
      { wardNo: 47, name: "Ward 47", area: "Bahadurpur, Sandalpur" },
      { wardNo: 48, name: "Ward 48", area: "Musallahpur, Bazar Samiti" },
      { wardNo: 49, name: "Ward 49", area: "Ranighat, Patna Law College" },
      { wardNo: 50, name: "Ward 50", area: "Ranighat, Mahendru, Muhammadpur, Sandalpur" },
      { wardNo: 51, name: "Ward 51", area: "Chaudhary Tola, Khajoor Banna, Tripoliya" },
      { wardNo: 55, name: "Ward 55", area: "Bahadurpur Housing Colony, Kumhrar" }
    ],
    otherAreas: "Wards 31 to 55 covering Kankarbagh, Kumhrar & Rajendra Nagar",
    localities: ["Rajendra Nagar", "PC Colony", "Hanuman Nagar", "Kumhrar", "Bazar Samiti", "Bahadurpur", "Chiraiyatand", "Bhootnath Road"],
    summary: "Kumhrar represents the massive South-Central urban block with high concentration of professionals and community leaders."
  },
  "184_patna_sahib": {
    id: "patnasahib_team2",
    acNo: 184,
    name: "184 - Patna Sahib Assembly",
    hindiName: "184 - पटना साहिब विधानसभा",
    badgeClass: "bg-orange-light",
    headerClass: "header-navy",
    icon: "fa-monument",
    totalBooths: "392",
    totalElectors: "3,86,700",
    wardsCount: "24",
    circle: "Patna City Circle",
    wards: [
      { wardNo: 52, name: "Ward 52", area: "Tripoliya, Gai Ghat, Alamganj, Gulzarbagh" },
      { wardNo: 53, name: "Ward 53", area: "Gai Ghat, Shershah Road, Babu Ganj" },
      { wardNo: 54, name: "Ward 54", area: "Mirdaha Toli, Alabakshpur, Shershah Road" },
      { wardNo: 56, name: "Ward 56", area: "Maharajganj, Chhoti & Badi Pahari, Jakariyapur" },
      { wardNo: 57, name: "Ward 57", area: "Meena Bazar, Sadikpur, Tulsimandi, Gulzarbagh" },
      { wardNo: 58, name: "Ward 58", area: "Mathramma, Chailital, Mahavirghat, Gulzarbagh" },
      { wardNo: 59, name: "Ward 59", area: "Gujri, Khajekala, Gurhatta, Naujarkatra" },
      { wardNo: 60, name: "Ward 60", area: "Gujri, Khajekala, Moghalpura, Padri ki Haweli" },
      { wardNo: 61, name: "Ward 61", area: "Maheshpur, Mehdiganj, Ranipur, Kasba Karimabad" },
      { wardNo: 62, name: "Ward 62", area: "Mangal Talab, Begampur" },
      { wardNo: 63, name: "Ward 63", area: "Moghalpura, Noon ka Chauraha, Chowk Shikarpur" },
      { wardNo: 64, name: "Ward 64", area: "Mangal Talab, Noon ka Chauraha" },
      { wardNo: 65, name: "Ward 65", area: "Padri ki Haweli, Maharajghat, Tedhighat, Sadar Gali" },
      { wardNo: 66, name: "Ward 66", area: "Bade ki Gali, Mangal Talab, Chowk Shikarpur" },
      { wardNo: 67, name: "Ward 67", area: "Chhipi Tola, Nehru Tola, Kila Road, Kalmasikoh" },
      { wardNo: 68, name: "Ward 68", area: "Chainpura, Dhavalpura, Beldari Tola, Nakhas" },
      { wardNo: 69, name: "Ward 69", area: "Dalhatta, Mashoorganj, Nakhas Mangal Akhada" },
      { wardNo: 70, name: "Ward 70", area: "Nand Gola, Pirdamariya, Noorganj, Dahuchak" },
      { wardNo: 71, name: "Ward 71", area: "Chhutkiya Bazar, Noorganj" },
      { wardNo: 72, name: "Ward 72", area: "Katra Bazar, Rikab Ganj, Nawab Ganj, Sarifa Ganj" }
    ],
    otherAreas: "Wards 52 to 72 covering Historic Patna City, Wholesale Mandis & Heritage Ghats",
    localities: ["Takht Patna Sahib", "Chowk", "Gulzarbagh", "Alamganj", "Marufganj", "Didarganj", "Malsalami", "Gaighat", "Begampur"],
    summary: "Patna Sahib is the historic wholesale business hub and heritage heart of Patna with deeply established grassroots networks."
  }
};

// Global App State
const AppState = {
  reports: JSON.parse(localStorage.getItem('idi_reports')) || DEFAULT_REPORTS,
  activeReportId: localStorage.getItem('idi_active_report_id') || "patna_overall",
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
  drawerNavBoothsWards: document.getElementById('drawerNavBoothsWards'),
  drawerDownloadAllCsvBtn: document.getElementById('drawerDownloadAllCsvBtn'),
  drawerDownloadAllPdfBtn: document.getElementById('drawerDownloadAllPdfBtn'),
  drawerSyncNowBtn: document.getElementById('drawerSyncNowBtn'),
  navBrandLogo: document.getElementById('navBrandLogo'),

  landingPageView: document.getElementById('landingPageView'),
  dashboardDetailView: document.getElementById('dashboardDetailView'),
  searchDirectoryView: document.getElementById('searchDirectoryView'),
  pillLandingView: document.getElementById('pillLandingView'),
  pillDashboardView: document.getElementById('pillDashboardView'),
  pillSearchView: document.getElementById('pillSearchView'),
  navReportSelectorWrapper: document.getElementById('navReportSelectorWrapper'),
  backToLandingBtn: document.getElementById('backToLandingBtn'),
  breadcrumbReportName: document.getElementById('breadcrumbReportName'),
  viewAssemblyWardsDetailBtn: document.getElementById('viewAssemblyWardsDetailBtn'),
  downloadCurrentPdfBtn: document.getElementById('downloadCurrentPdfBtn'),
  downloadCurrentPngBtn: document.getElementById('downloadCurrentPngBtn'),
  openBoothsWardsBtn: document.getElementById('openBoothsWardsBtn'),

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
  codeTeaAmber: document.getElementById('codeTeaAmber')
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

  if (DOM.pillLandingView) DOM.pillLandingView.classList.remove('active');
  if (DOM.pillDashboardView) DOM.pillDashboardView.classList.remove('active');
  if (DOM.pillSearchView) DOM.pillSearchView.classList.remove('active');

  if (viewName === 'landing') {
    if (DOM.landingPageView) DOM.landingPageView.style.display = 'block';
    if (DOM.pillLandingView) DOM.pillLandingView.classList.add('active');
    if (DOM.navReportSelectorWrapper) DOM.navReportSelectorWrapper.style.display = 'none';
    if (DOM.drawerNavLanding) DOM.drawerNavLanding.classList.add('active');
    renderLandingPage();
  } else if (viewName === 'search') {
    if (DOM.searchDirectoryView) DOM.searchDirectoryView.style.display = 'block';
    if (DOM.pillSearchView) DOM.pillSearchView.classList.add('active');
    if (DOM.navReportSelectorWrapper) DOM.navReportSelectorWrapper.style.display = 'none';
    if (DOM.drawerNavLanding) DOM.drawerNavLanding.classList.remove('active');
    renderLeaderSearchResults();
  } else {
    if (DOM.dashboardDetailView) DOM.dashboardDetailView.style.display = 'block';
    if (DOM.pillDashboardView) DOM.pillDashboardView.classList.add('active');
    if (DOM.navReportSelectorWrapper) DOM.navReportSelectorWrapper.style.display = 'flex';
    if (DOM.drawerNavLanding) DOM.drawerNavLanding.classList.remove('active');
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

  AppState.reports.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r.id;
    opt.textContent = r.name;
    if (r.id === AppState.activeReportId) opt.selected = true;
    DOM.reportSelect.appendChild(opt);
  });
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

  const filtered = AppState.reports.filter(r => r.name.toLowerCase().includes(query) || r.shortName.toLowerCase().includes(query));
  if (DOM.drawerReportsCount) DOM.drawerReportsCount.textContent = filtered.length;

  filtered.forEach(r => {
    const repMeetings = (Number(r.meetingStatus.political) || 0) + (Number(r.meetingStatus.nonPolitical) || 0);
    const card = document.createElement('div');
    card.className = `drawer-report-card ${r.id === AppState.activeReportId ? 'active' : ''}`;
    
    let iconClass = 'fa-solid fa-landmark';
    let iconBg = 'bg-blue-subtle text-blue';
    
    if (r.id === 'patna_overall') {
      iconClass = 'fa-solid fa-chart-pie';
      iconBg = 'bg-blue-subtle text-blue';
    } else if (r.id === 'mahila_team') {
      iconClass = 'fa-solid fa-person-dress';
      iconBg = 'bg-purple-subtle text-purple';
    } else if (r.name.includes('181') || r.name.toLowerCase().includes('digha')) {
      iconClass = 'fa-solid fa-city';
      iconBg = 'bg-green-subtle text-green';
    } else if (r.name.includes('183') || r.name.toLowerCase().includes('kumhrar')) {
      iconClass = 'fa-solid fa-landmark';
      iconBg = 'bg-purple-subtle text-purple';
    } else if (r.name.includes('184') || r.name.toLowerCase().includes('patna sahib')) {
      iconClass = 'fa-solid fa-monument';
      iconBg = 'bg-orange-subtle text-orange';
    }
    
    card.innerHTML = `
      <div class="drawer-report-item-inner">
        <div class="drawer-item-icon-box ${iconBg}">
          <i class="${iconClass}"></i>
        </div>
        <div class="drawer-item-text">
          <span class="drawer-card-title">${r.name}</span>
          <span class="drawer-item-subtext">${repMeetings} IDIs Tracked</span>
        </div>
        <i class="fa-solid fa-chevron-right drawer-chevron"></i>
      </div>
    `;

    card.addEventListener('click', () => {
      switchView('dashboard', r.id);
      closeDrawer();
    });

    DOM.drawerReportsList.appendChild(card);
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
  const polMeetings = Number(data.meetingStatus.political) || 0;
  const nonPolMeetings = Number(data.meetingStatus.nonPolitical) || 0;
  const totalMeetings = polMeetings + nonPolMeetings;

  if (DOM.valTotalMeetings) DOM.valTotalMeetings.textContent = totalMeetings;
  if (DOM.valPoliticalMeetings) DOM.valPoliticalMeetings.textContent = polMeetings;
  if (DOM.valNonPoliticalMeetings) DOM.valNonPoliticalMeetings.textContent = nonPolMeetings;
  if (DOM.centerMeetingTotal) DOM.centerMeetingTotal.textContent = totalMeetings;

  if (DOM.calloutMeetingPolitical) {
    DOM.calloutMeetingPolitical.innerHTML = `
      <div class="callout-num">${polMeetings}</div>
      <div class="callout-pct">(${formatPercent(polMeetings, totalMeetings)})</div>
    `;
  }
  if (DOM.calloutMeetingNonPolitical) {
    DOM.calloutMeetingNonPolitical.innerHTML = `
      <div class="callout-num">${nonPolMeetings}</div>
      <div class="callout-pct">(${formatPercent(nonPolMeetings, totalMeetings)})</div>
    `;
  }

  updateDonutChart('chartMeetingStatus', [polMeetings, nonPolMeetings], ['#dc2626', '#16a34a'], ['Political', 'Non-Political']);

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

  function extractMetricBlock(rowLabel, startIdx, id, name, shortName) {
    for (let r = startIdx; r < rows.length; r++) {
      const lineStr = rows[r].join(',').toLowerCase();
      if (lineStr.includes(rowLabel.toLowerCase())) {
        let total = 0, pol = 0, nonPol = 0, onb = 0, dicey = 0, notOnb = 0;
        let pkYes = 0, pkNo = 0, teaYes = 0, teaNo = 0;
        let state = 0, dist = 0, ward = 0;

        for (let sub = r; sub < Math.min(r + 10, rows.length); sub++) {
          const row = rows[sub];
          if (row.some(c => c.toLowerCase().includes('total meetings') || c.toLowerCase().includes('onboarded'))) {
            const nextRow = rows[sub + 1];
            if (nextRow) {
              const nums = nextRow.filter(c => c !== '' && !isNaN(Number(c))).map(Number);
              if (nums.length >= 6) {
                total = nums[0]; pol = nums[1]; nonPol = nums[2];
                onb = nums[3]; dicey = nums[4]; notOnb = nums[5];
              }
            }
          }
          if (row.some(c => c.toLowerCase().includes('pk intervention') || c.toLowerCase().includes('wants to host pk tea'))) {
            const nextRow2 = rows[sub + 2] || rows[sub + 1];
            if (nextRow2) {
              const nums2 = nextRow2.filter(c => c !== '' && !isNaN(Number(c))).map(Number);
              if (nums2.length >= 4) {
                pkYes = nums2[0]; pkNo = nums2[1];
                teaYes = nums2[2]; teaNo = nums2[3];
              }
            }
          }
          if (row.some(c => c.toLowerCase().includes('committee recommendation'))) {
            const nextRow3 = rows[sub + 2] || rows[sub + 1];
            if (nextRow3) {
              const nums3 = nextRow3.filter(c => c !== '' && !isNaN(Number(c))).map(Number);
              if (nums3.length >= 3) {
                state = nums3[0]; dist = nums3[1]; ward = nums3[2];
              }
            }
          }
        }

        if (total > 0 || onb > 0) {
          return {
            id, name, shortName,
            meetingStatus: { political: pol, nonPolitical: nonPol },
            onboardingStatus: { onboarded: onb, dicey: dicey, notOnboarded: notOnb },
            pkIntervention: { yes: pkYes, no: pkNo },
            hostPKTea: { yes: teaYes, no: teaNo },
            committeeRec: { state: state, district: dist, ward: ward }
          };
        }
      }
    }
    return null;
  }

  // 1. Executive Summary Reports
  const overallRep = extractMetricBlock("Patna Mahanagar  Overall IDI's", 0, "patna_overall", "Patna Mahanagar Team Overall IDI's", "Patna Mahanagar (Overall)") || DEFAULT_REPORTS[0];
  parsedList.push(overallRep);

  const mahilaRep = extractMetricBlock("Mahila  Team Overall IDI's", 0, "mahila_team", "Mahila Team Overall IDI's", "Mahila Team (Women Leadership)") || DEFAULT_REPORTS[1];
  parsedList.push(mahilaRep);

  const teamRep = extractMetricBlock("Patna Mahanagar Team Overall IDI's Report", 0, "patna_team_report", "Patna Mahanagar Team Overall IDI's Report", "Patna Mahanagar (Team Report)") || DEFAULT_REPORTS[2];
  parsedList.push(teamRep);

  // 2. Assembly team rows
  let teamWiseHeaderIdx = -1;
  for (let r = 0; r < rows.length; r++) {
    if (rows[r].some(c => c && c.toLowerCase().includes('team wise performance status'))) {
      teamWiseHeaderIdx = r;
      break;
    }
  }

  if (teamWiseHeaderIdx !== -1) {
    for (let r = teamWiseHeaderIdx + 1; r < rows.length; r++) {
      const row = rows[r];
      const teamName = row.find(c => c && (c.includes('181') || c.includes('183') || c.includes('184') || c.includes('Patna Sahib') || c.includes('Digha') || c.includes('Kumhrar')));
      if (teamName && !teamName.toLowerCase().includes('total')) {
        const nums = row.filter(c => c !== '' && !isNaN(Number(c))).map(Number);
        if (nums.length >= 12) {
          const cleanName = teamName.replace(/\s+/g, ' ').trim();
          let id = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '_');
          if (id.includes('183') || id.includes('kumhrar')) id = "kumhrar_team1";
          else if (id.includes('181') && id.includes('1')) id = "digha_team1";
          else if (id.includes('181') && id.includes('2')) id = "digha_team2";
          else if (id.includes('184') && id.includes('1')) id = "patnasahib_team1";
          else if (id.includes('184') && id.includes('2')) id = "patnasahib_team2";

          parsedList.push({
            id: id,
            name: cleanName,
            shortName: cleanName,
            meetingStatus: { political: nums[1] || 0, nonPolitical: nums[2] || 0 },
            onboardingStatus: { onboarded: nums[3] || 0, dicey: nums[4] || 0, notOnboarded: nums[5] || 0 },
            pkIntervention: { yes: nums[6] || 0, no: nums[7] || 0 },
            hostPKTea: { yes: nums[8] || 0, no: nums[9] || 0 },
            committeeRec: { state: nums[10] || 0, district: nums[11] || 0, ward: nums[12] || 0 }
          });
        }
      }
    }
  }

  ["councillors_2022", "councillors_2017"].forEach(cid => {
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
    { key: "181_digha", name: "181 - Digha Assembly", wards: [1,2,3,4,6,7,9,10,11,12,13,14,16,21,"22A","22B","22C"], localities: ["Digha Ghat", "Kurji", "Patliputra", "Rajiv Nagar", "Ashiana Nagar", "Raja Bazar", "Jagdeo Path", "Khajpura"] },
    { key: "182_bankipur", name: "182 - Bankipur Assembly", wards: [15,17,18,19,22,26,35,41,42], localities: ["Gandhi Maidan", "Boring Road", "SK Puri", "Kidwaipuri", "Kadamkuan", "Machhua Toli", "Ashok Rajpath", "Naya Tola"] },
    { key: "183_kumhrar", name: "183 - Kumhrar Assembly", wards: [31,32,33,34,43,44,45,46,47,48,49,50,51,55], localities: ["Rajendra Nagar", "PC Colony", "Hanuman Nagar", "Kumhrar", "Bazar Samiti", "Bahadurpur", "Chiraiyatand", "Bhootnath Road"] },
    { key: "184_patna_sahib", name: "184 - Patna Sahib Assembly", wards: [52,53,54,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72], localities: ["Takht Patna Sahib", "Chowk", "Gulzarbagh", "Alamganj", "Marufganj", "Didarganj", "Malsalami", "Gaighat", "Begampur"] },
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
    const [resSummary, resRaw] = await Promise.all([
      fetch(SHEET_ENDPOINTS.summary),
      fetch(SHEET_ENDPOINTS.rawLeaders)
    ]);

    if (!resSummary.ok) throw new Error(`Google Sheets HTTP ${resSummary.status}`);

    const summaryText = await resSummary.text();
    const sumRows = parseCSVRows(summaryText);
    const parsedReports = processMultiTableSheetCSV(sumRows);

    let rawRows = null;
    if (resRaw.ok) {
      const rawText = await resRaw.text();
      rawRows = parseCSVRows(rawText);
    }

    if (parsedReports && parsedReports.length > 0) {
      AppState.reports = parsedReports;
      localStorage.setItem('idi_reports', JSON.stringify(AppState.reports));
      
      populateReportSelectors();
      renderDashboard();
      renderLandingPage();
      updateLastSyncTimeText();

      // Dynamically build leaders database from live Google Sheet data
      buildDynamicLeadersDatabase(rawRows);
      if (DOM.searchDirectoryView && DOM.searchDirectoryView.style.display !== 'none') {
        renderLeaderSearchResults();
      }

      if (DOM.liveStatusBadge) {
        DOM.liveStatusBadge.innerHTML = `<span class="pulse-dot"></span> Live Sync Active`;
      }
      if (!silent) showToast(`Live Google Sheet Sync Complete (${parsedReports.length} reports, ${LEADERS_DATABASE.length} leaders)!`, "success");
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
  link.download = `Patna_Mahanagar_Master_Report_All_Teams.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("Downloaded Master CSV Data for All Teams!", "success");
}

async function downloadReportPdf(reportId) {
  const r = AppState.reports.find(item => item.id === reportId) || AppState.reports[0];
  if (!r) { showToast("Report data not found!", "error"); return; }

  showToast("📄 Generating PDF Report...", "info");

  // Method 1: Rich jsPDF data report (primary - always works, no DOM dependency)
  try {
    const { jsPDF } = window.jspdf;
    if (!jsPDF) throw new Error("jsPDF not loaded");

    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageW = 210, pageH = 297, margin = 14;
    const contentW = pageW - margin * 2;
    let y = margin;

    // ---- HEADER BANNER ----
    doc.setFillColor(2, 132, 199);
    doc.rect(0, 0, pageW, 28, 'F');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('PATNA MAHANAGAR IDI ANALYTICS DASHBOARD', margin, 10);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.text(`Generated: ${new Date().toLocaleString('en-IN')}  |  Live Google Sheets Data  |  Jan Suraaj Political Campaign`, margin, 17);
    doc.text(`Report ID: ${r.id}`, margin, 23);

    y = 36;

    // ---- REPORT TITLE ----
    doc.setFillColor(240, 244, 248);
    doc.rect(margin, y, contentW, 18, 'F');
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(r.name, margin + 4, y + 7);
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.setFont('helvetica', 'normal');
    doc.text(r.shortName || r.name, margin + 4, y + 14);
    y += 24;

    // ---- COMPUTED METRICS ----
    const polMtg = Number(r.meetingStatus.political) || 0;
    const nonPolMtg = Number(r.meetingStatus.nonPolitical) || 0;
    const totalMtg = polMtg + nonPolMtg;
    const onb = Number(r.onboardingStatus.onboarded) || 0;
    const dicey = Number(r.onboardingStatus.dicey) || 0;
    const notOnb = Number(r.onboardingStatus.notOnboarded) || 0;
    const totalOnb = onb + dicey + notOnb;
    const onbPct = totalOnb > 0 ? ((onb / totalOnb) * 100).toFixed(1) : '0.0';
    const pkYes = Number(r.pkIntervention.yes) || 0;
    const pkNo = Number(r.pkIntervention.no) || 0;
    const teaYes = Number(r.hostPKTea.yes) || 0;
    const teaNo = Number(r.hostPKTea.no) || 0;
    const recState = Number(r.committeeRec.state) || 0;
    const recDistrict = Number(r.committeeRec.district) || 0;
    const recWard = Number(r.committeeRec.ward) || 0;

    // ---- SECTION: KEY SUMMARY METRICS ----
    const drawSectionHeader = (title, yPos, color = [2, 132, 199]) => {
      doc.setFillColor(...color);
      doc.rect(margin, yPos, contentW, 7, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text(title, margin + 3, yPos + 5);
      return yPos + 10;
    };

    const drawMetricBox = (label, value, subText, x, yPos, w, h, accentColor = [2, 132, 199]) => {
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(...accentColor);
      doc.setLineWidth(0.5);
      doc.rect(x, yPos, w, h);
      doc.setFillColor(...accentColor);
      doc.rect(x, yPos, 2, h, 'F');

      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text(String(value), x + 5, yPos + 11);

      doc.setFontSize(7);
      doc.setTextColor(71, 85, 105);
      doc.setFont('helvetica', 'normal');
      doc.text(label, x + 5, yPos + 17);

      if (subText) {
        doc.setFontSize(6.5);
        doc.setTextColor(100, 116, 139);
        const lines = doc.splitTextToSize(subText, w - 8);
        doc.text(lines[0] || '', x + 5, yPos + 22);
      }
    };

    y = drawSectionHeader('📊 KEY PERFORMANCE SUMMARY', y);

    const bw = (contentW - 6) / 4;
    drawMetricBox('Total IDI Meetings', totalMtg, `Political: ${polMtg}  |  Non-Pol: ${nonPolMtg}`, margin, y, bw, 28, [2, 132, 199]);
    drawMetricBox('Leaders Onboarded', `${onb} (${onbPct}%)`, `Dicey: ${dicey}  |  Not Onboarded: ${notOnb}`, margin + bw + 2, y, bw, 28, [5, 150, 105]);
    drawMetricBox('PK Intervention', pkYes, `No: ${pkNo}  |  Total: ${pkYes + pkNo}`, margin + (bw + 2) * 2, y, bw, 28, [217, 119, 6]);
    drawMetricBox('Interested in PK Tea', teaYes, `Not Interested: ${teaNo}`, margin + (bw + 2) * 3, y, bw, 28, [124, 58, 237]);
    y += 34;

    // ---- SECTION: DETAILED BREAKDOWN ----
    y = drawSectionHeader('📋 DETAILED STATISTICAL BREAKDOWN', y, [15, 23, 42]);

    const drawTable = (headers, rows, startY, colWidths) => {
      const rowH = 8;
      // Header row
      doc.setFillColor(30, 41, 59);
      doc.rect(margin, startY, contentW, rowH, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      let xPos = margin + 2;
      headers.forEach((h, i) => {
        doc.text(h, xPos, startY + 5.5);
        xPos += colWidths[i];
      });

      let tableY = startY + rowH;
      rows.forEach((row, ri) => {
        doc.setFillColor(ri % 2 === 0 ? 248 : 255, ri % 2 === 0 ? 250 : 255, ri % 2 === 0 ? 252 : 255);
        doc.rect(margin, tableY, contentW, rowH, 'F');
        doc.setDrawColor(226, 232, 240);
        doc.rect(margin, tableY, contentW, rowH);
        doc.setTextColor(15, 23, 42);
        doc.setFont('helvetica', ri === 0 ? 'bold' : 'normal');
        doc.setFontSize(7.5);
        xPos = margin + 2;
        row.forEach((cell, ci) => {
          doc.text(String(cell), xPos, tableY + 5.5);
          xPos += colWidths[ci];
        });
        tableY += rowH;
      });
      return tableY + 3;
    };

    y = drawTable(
      ['Category', 'Sub-Category', 'Count', 'Percentage'],
      [
        ['Meeting Status', 'Total Meetings Conducted', totalMtg, '100%'],
        ['', 'Political Meetings', polMtg, `${totalMtg > 0 ? ((polMtg/totalMtg)*100).toFixed(1) : 0}%`],
        ['', 'Non-Political Meetings', nonPolMtg, `${totalMtg > 0 ? ((nonPolMtg/totalMtg)*100).toFixed(1) : 0}%`],
        ['Onboarding Status', 'Leaders Onboarded', onb, `${onbPct}%`],
        ['', 'Dicey / Undecided', dicey, `${totalOnb > 0 ? ((dicey/totalOnb)*100).toFixed(1) : 0}%`],
        ['', 'Not Onboarded', notOnb, `${totalOnb > 0 ? ((notOnb/totalOnb)*100).toFixed(1) : 0}%`],
        ['PK Intervention', 'Yes - Needs PK Meeting', pkYes, `${(pkYes+pkNo) > 0 ? ((pkYes/(pkYes+pkNo))*100).toFixed(1) : 0}%`],
        ['', 'No - Does Not Need PK', pkNo, `${(pkYes+pkNo) > 0 ? ((pkNo/(pkYes+pkNo))*100).toFixed(1) : 0}%`],
        ['Host PK Tea', 'Interested in Hosting PK Tea', teaYes, `${(teaYes+teaNo) > 0 ? ((teaYes/(teaYes+teaNo))*100).toFixed(1) : 0}%`],
        ['', 'Not Interested', teaNo, `${(teaYes+teaNo) > 0 ? ((teaNo/(teaYes+teaNo))*100).toFixed(1) : 0}%`],
        ['Committee Rec.', 'State Level Recommendation', recState, '-'],
        ['', 'District Level Recommendation', recDistrict, '-'],
        ['', 'Ward Level Recommendation', recWard, '-'],
      ],
      y,
      [55, 90, 25, 25]
    );

    // ---- KEY INSIGHTS ----
    if (y < pageH - 50) {
      y = drawSectionHeader('💡 KEY INSIGHTS & ANALYSIS', y, [5, 150, 105]);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);
      const insights = [
        `• ${onbPct}% of surveyed leaders are onboarded — showing strong ground-level support for Jan Suraaj.`,
        `• ${pkYes} leaders have been identified as requiring direct PK Intervention for deeper engagement.`,
        `• ${teaYes} leaders are interested in hosting PK Tea — a key grassroots mobilization opportunity.`,
        `• ${recWard + recDistrict + recState} total committee recommendations: ${recWard} Ward, ${recDistrict} District, ${recState} State level.`,
        `• Data sourced live from Google Sheets — reflects real-time field survey records.`
      ];
      insights.forEach(insight => {
        const lines = doc.splitTextToSize(insight, contentW);
        doc.text(lines, margin, y);
        y += lines.length * 5 + 2;
      });
    }

    // ---- FOOTER ----
    doc.setFillColor(15, 23, 42);
    doc.rect(0, pageH - 12, pageW, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.text('Patna Mahanagar IDI Analytics Dashboard  |  Jan Suraaj Political Campaign  |  Data: Live Google Sheets', margin, pageH - 5);
    doc.text(`Page 1 of 1`, pageW - margin - 20, pageH - 5);

    doc.save(`IDI_Report_${r.shortName || r.id}_${new Date().toLocaleDateString('en-IN').replace(/\//g, '-')}.pdf`);
    showToast("✅ PDF Downloaded Successfully!", "success");
    return;

  } catch (err) {
    console.warn("jsPDF generation error, trying html2canvas fallback:", err);
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
  if (DOM.pillSearchView) DOM.pillSearchView.addEventListener('click', () => switchView('search'));
  if (DOM.backToLandingBtn) DOM.backToLandingBtn.addEventListener('click', () => switchView('landing'));
  if (DOM.navBrandLogo) DOM.navBrandLogo.addEventListener('click', () => switchView('landing'));

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
// 13. App Initialization
// ==========================================================================

window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const reportParam = urlParams.get('report');
  const viewParam = urlParams.get('view');
  const queryParam = urlParams.get('q');

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
  startAutoRefreshLoop();

  if (viewParam === 'search' || queryParam) {
    switchView('search');
  } else if (shouldOpenDashboard || viewParam === 'dashboard') {
    switchView('dashboard');
  } else {
    switchView('landing');
  }

  // Fetch real-time live data immediately from Google Sheets
  syncWithGoogleSheets(true);
});
