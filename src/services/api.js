import axios from "axios";

// -הנתיב /leagues ייתן את רשימת הליגות.
//
// -הנתיב /teams/{leagueId} ייתן את רשימת הקבוצות בליגה ספציפית, בהינתן ה-id שלה. כלומר, אם ה-id של ליגה מסוימת הוא 2, אז נשלח את הבקשה לנתיב /teams/2
//
// -הנתיב /history/{leagugeId} ייתן את היסטוריית המשחקים בליגה ספציפית, בהינתן ה-id שלה.
//
// -הנתיב /round/{leagueId}/{round} ייתן את היסטוריית המשחקים בליגה ספציפית במחזור מסוים, בהינתן פרמטרים אלה. לדוגמה: /round/2/4 ייתן את רשימת המשחקים בליגה 2 במחזור 4.
//
// -הנתיב /squad/{leagueId}/{teamId} ייתן את רשימת השחקנים של קבוצה ספציפית מליגה ספציפית, בהינתן פרמטרים אלה.
//
// -הנתיב /history/{leagueId}/{teamId} ייתן את היסטוריית המשחקים בליגה ספציפית לקבוצה ספציפית, בהינתן פרמטרים אלה.

const api = axios.create({
    baseURL: 'https://app.seker.live/fm1',
    timeout: 10000, // wait 10 seconds for response
});

export const getAllLeagues = () => api.get('/leagues');

export const getLeagueById = (leagueId) => api.get(`/teams/${leagueId}`);

export const getLeagueHistoryById = (leagueId) => api.get(`/history/${leagueId}`);

export const getLeagueHistoryByIdAndRound = (leagueId, round) => api.get(`/round/${leagueId}/${round}`);

export const getLeagueSquadByIdAndTeamId = (leagueId, teamId) => api.get(`/squad/${leagueId}/${teamId}`);

export const getLeagueHistoryByIdAndTeam = (leagueId, teamId) => api.get(`/history/${leagueId}/${teamId}`);
