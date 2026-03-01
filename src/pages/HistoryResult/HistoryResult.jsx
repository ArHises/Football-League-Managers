import {useCallback, useContext, useEffect, useState} from "react";
import { getLeagueHistoryByIdAndRound } from "../../services/api.js";
import { LeagueContext } from "../../components/LeagueContext.jsx";
import { HistoryList } from "../../components/HistoryList.jsx";
import "./HistoryResult.css";

export const HistoryResultPage = () => {
    const { currentLeague } = useContext(LeagueContext);

    const [startRound, setStartRound] = useState('1');
    const [endRound, setEndRound] = useState('99');
    const [leagueRoundHistory, setLeagueRoundHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = useCallback(async () => {
        if (!currentLeague || currentLeague === -1) {
            alert("Please select a league first");
            return;
        }
        if (!startRound || !endRound || Number(startRound) > Number(endRound)) {
            alert("Please enter valid start and end rounds");
            return;
        }

        setLoading(true);
        setLeagueRoundHistory([]);

        const allMatches = [];

        try {
            for (let i = Number(startRound); i <= Number(endRound); i++) {
                const response = await getLeagueHistoryByIdAndRound(currentLeague, i);
                if (response.status === 200 && response.data.length !== 0) {
                    allMatches.push(...response.data);
                } else {
                    break;
                }
            }
            setLeagueRoundHistory(allMatches);
        } catch (error) {
            console.error("Error fetching history:", error);
        } finally {
            setLoading(false);
        }
    }, [currentLeague, startRound, endRound]);

    useEffect(() => {
        if (!currentLeague || currentLeague === -1) {
            return;
        }
        handleSearch();
    }, [currentLeague, handleSearch]);

    return (
        <div className="HistoryResult page">
            <h2>League Round History</h2>
            {currentLeague > 0 ? (
                <div>
                    <div className="filters">
                        <input
                            type="number"
                            value={startRound}
                            onChange={(e) => setStartRound(e.target.value)}
                            placeholder="Start Round"
                            min="1"
                        />
                        <input
                            type="number"
                            value={endRound}
                            onChange={(e) => setEndRound(e.target.value)}
                            placeholder="End Round"
                            min={startRound}
                        />
                        <button onClick={handleSearch} disabled={loading}>
                            {loading ? "Loading..." : "Show History"}
                        </button>
                    </div>

                    <div className="results-list">
                        {loading ? (
                            <p>Loading...</p>
                        ) : leagueRoundHistory.length > 0 ? (
                            <HistoryList matches={leagueRoundHistory} />
                        ) : (
                            <p>No matches found. Select rounds and click Search.</p>
                        )}
                    </div>
                </div>
            ) : (
                <h3>Please select a league from the menu.</h3>
            )}
        </div>
    );
};