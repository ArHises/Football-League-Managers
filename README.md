    src/
    │
    ├── assets/                 # Static assets (images, icons)
    │
    ├── components/             # Reusable UI components
    │   ├── common/
    │   │   ├── Navbar.jsx          # Navigation between the 4 main pages
    │   │   ├── LeagueSelector.jsx  # Dropdown to select league (required on all pages)
    │   │   └── Layout.jsx          # Wraps the app with Navbar and LeagueSelector
    │   │
    │   ├── table/
    │   │   ├── StandingsTable.jsx  # The main league table
    │   │   ├── TableRow.jsx        # Individual row (handles logic for Blue/Red colors)
    │   │   └── TeamDetails.jsx     # Expands to show Squad & Team History
    │   │
    │   ├── history/
    │   │   ├── RoundFilter.jsx     # Inputs for Min/Max round filtering
    │   │   └── MatchList.jsx       # Displays list of matches (Arsenal 3 – 2 Liverpool)
    │   │
    │   └── stats/
    │       └── StatCard.jsx        # Component to display individual stats (Top scorers, etc.)
    │
    ├── context/
    │   └── LeagueContext.jsx   # Manages the globally selected League ID
    │
    ├── hooks/
    │   ├── useFetchData.js     # Generic hook for API calls
    │   └── useLeagueStats.js   # Logic to process raw data into stats (Goals per half, etc.)
    │
    ├── pages/                  # The 4 main pages requested
    │   ├── TablePage.jsx       # "טבלאות"
    │   ├── HistoryPage.jsx     # "היסטוריית תוצאות"
    │   ├── TopScorersPage.jsx  # "טבלת המבקיעים המובילים"
    │   └── GeneralStatsPage.jsx# "סטטיסטיקה כללית"
    │
    ├── services/
    │   └── api.js              # Centralized Axios/Fetch functions for all endpoints:
    │                           # getLeagues, getTeams, getHistory, getRound, getSquad
    │
    ├── utils/
    │   ├── calculations.js     # Pure logic functions:
    │   │                       # - Calculate Points (Win=3, Draw=1)
    │   │                       # - Calculate Goal Diff
    │   │                       # - Sort Table (Points -> GD -> Name)
    │   │                       # - Find Earliest/Latest Goal
    │   └── formatters.js       # Helper to format the match string "{home} {score} - {score} {away}"
    │
    ├── App.jsx                 # Routes setup (React Router)
    ├── index.css               # Global styles
    └── main.jsx                # Entry point