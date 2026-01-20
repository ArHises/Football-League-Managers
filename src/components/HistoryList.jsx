import {useEffect, useState} from "react";
import {getLeagueHistoryByIdAndTeam} from "../services/api.js";

export const HistoryList = ({leagueId, teamId}) => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            if (leagueId === null || teamId === null) return;

            const response = await getLeagueHistoryByIdAndTeam(leagueId, teamId);
            if (response.status === 200) {
                setHistory(response.data);
                console.log("The history:", response.data);
            } else {
                console.error("Error fetching history from API");
            }
        };
        fetchPlayers()
    }, [leagueId, teamId])

    const getScore = (goals, isHome) => {
        if (!goals) return 0;
        return goals.filter(goal => goal.home === isHome).length;
    }

    return (
        <>
            <div className={"HistoryList"}>
                {history.length > 0 ? (
                    history.map((match) => (
                        <div className={"HistoryList-Row"} key={match.id} >
                            <span>
                                <span>{match.awayTeam.name}</span>
                                <strong>{getScore(match.goals, false)}
                                 -
                                {getScore(match.goals, true)}
                                </strong>
                                <span>{match.homeTeam.name}</span>
                            </span>
                        </div>
                    ))) : (
                    <p>No history found or loading...</p>
                )}
            </div>
        </>
    );
}