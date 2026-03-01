import axios from "axios";

const api = axios.create({
    baseURL: 'https://app.seker.live/fm1',
    timeout: 10000, // 10 sec
});

const CACHE = new Map();

const requestWithCache = (url) => {
    if (CACHE.has(url)) {
        console.log(`Serving from cache: ${url}`);
        return CACHE.get(url);
    }

    const request = api.get(url).catch((error) => {
        CACHE.delete(url);
        throw error;
    });

    CACHE.set(url, request);

    return request;
};

export const getAllLeagues = () => requestWithCache('/leagues');

export const getLeagueById = (leagueId) => requestWithCache(`/teams/${leagueId}`);

export const getLeagueHistoryById = (leagueId) => requestWithCache(`/history/${leagueId}`);

export const getLeagueHistoryByIdAndRound = (leagueId, round) => requestWithCache(`/round/${leagueId}/${round}`);

export const getLeagueSquadByIdAndTeamId = (leagueId, teamId) => requestWithCache(`/squad/${leagueId}/${teamId}`);

export const getLeagueHistoryByIdAndTeam = (leagueId, teamId) => requestWithCache(`/history/${leagueId}/${teamId}`);

export const clearCache = () => {
    CACHE.clear();
};

