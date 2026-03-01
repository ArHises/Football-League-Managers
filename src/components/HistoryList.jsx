import {useEffect, useState} from "react";
import {getLeagueHistoryByIdAndTeam} from "../services/api.js";

export const HistoryList = ({leagueId, teamId, matches}) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const effectiveHistory = Array.isArray(matches) ? matches : history;

    useEffect(() => {
        // If we received matches directly, this component is presentational-only.
        if (Array.isArray(matches)) return;

        const fetchHistory = async () => {
            if (leagueId === null || leagueId === undefined || leagueId === -1) return;
            if (teamId === null || teamId === undefined || teamId === -1) return;

            setLoading(true);
            setError(null);

            try {
                const response = await getLeagueHistoryByIdAndTeam(leagueId, teamId);
                if (response.status === 200) {
                    setHistory(response.data);
                    console.log("The history:", response.data);
                } else {
                    setError("Error fetching history from API");
                }
            } catch (e) {
                setError(e?.message ?? "Error fetching history from API");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [leagueId, teamId, matches]);

    const getScore = (goals, isHome) => {
        if (!goals) return 0;
        return goals.filter(goal => goal.home === isHome).length;
    };

    return (
        <div className={"HistoryList"}>
            <h4>Match History:</h4>

            {error && <p className={"HistoryList-Error"}>{error}</p>}
            {loading && <p>Loading...</p>}

            {!loading && effectiveHistory.length > 0 ? (
                <table className={"HistoryList-Table"}>
                    <thead>
                    <tr className={"HistoryList-HeaderRow"}>
                        <th className={"HistoryList-Team HistoryList-Team--away"}>Away</th>
                        <th className={"HistoryList-Score"}>Score</th>
                        <th className={"HistoryList-Team HistoryList-Team--home"}>Home</th>
                    </tr>
                    </thead>
                    <tbody>
                    {effectiveHistory.map((match, index) => (
                        <tr
                            className={"HistoryList-Row"}
                            key={match?.id != null ? `${match.id}-${match?.round ?? index}` : index}
                        >
                            <td className={"HistoryList-Team HistoryList-Team--away"}>{match?.awayTeam?.name}</td>
                            <td className={"HistoryList-Score"}>
                                <strong>
                                    {getScore(match?.goals, false)} - {getScore(match?.goals, true)}
                                </strong>
                            </td>
                            <td className={"HistoryList-Team HistoryList-Team--home"}>{match?.homeTeam?.name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                !loading && <p>No history found or loading...</p>
            )}
        </div>
    );
}