import {useContext, useEffect, useState, useMemo} from "react";
import {LeagueContext} from "../../components/LeagueContext.jsx";
import {getLeagueHistoryById} from "../../services/api.js";

import "./Statistic.css";

export const Statistic = () => {
    const { currentLeague } = useContext(LeagueContext);
    const [leagueRoundHistory, setLeagueRoundHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!currentLeague || currentLeague === -1) return;

            setLoading(true);
            try {
                const response = await getLeagueHistoryById(currentLeague);
                if (response && response.status === 200) {
                    setLeagueRoundHistory(response.data);
                }
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [currentLeague]);

    const stats = useMemo(() => {

        let firstHalfGoals = 0;
        let secondHalfGoals = 0;
        let earliestGoal = null;
        let latestGoal = null;
        const goalsPerRound = {};

        leagueRoundHistory.forEach((match) => {
            const round = match.round;
            const matchGoalsCount = match.goals.length;

            if (goalsPerRound[round] === undefined) {
                goalsPerRound[round] = 0;
            }
            goalsPerRound[round] += matchGoalsCount;

            match.goals.forEach((goal) => {
                const minute = goal.minute;

                if (minute < 45) {
                    firstHalfGoals++;
                } else {
                    secondHalfGoals++;
                }

                if (earliestGoal === null || minute < earliestGoal) {
                    earliestGoal = minute;
                }
                if (latestGoal === null || minute > latestGoal) {
                    latestGoal = minute;
                }
            });
        });

        let maxRound = null;
        let minRound = null;
        let maxGoals = -1;
        let minGoals = Infinity;

        Object.entries(goalsPerRound).forEach(([round, count]) => {
            if (count > maxGoals) {
                maxGoals = count;
                maxRound = round;
            }
            if (count < minGoals) {
                minGoals = count;
                minRound = round;
            }
        });

        return {
            firstHalfGoals,
            secondHalfGoals,
            earliestGoal: earliestGoal ?? "-",
            latestGoal: latestGoal ?? "-",
            mostGoalsRound: maxRound ?? "-",
            mostGoalsCount: maxGoals > -1 ? maxGoals : 0,
            leastGoalsRound: minRound ?? "-",
            leastGoalsCount: minGoals === Infinity ? 0 : minGoals
        };

    }, [leagueRoundHistory]);

    return (
        <div className="Statistic">
            <h2>General Statistics</h2>
            {loading ? (
                <p className="loading-text">Loading...</p>
            ) : (
                // Added "stats-container" class here for the Grid layout
                <div className="stats-container">

                    {/* 1. Halves Comparison */}
                    <div className="stat-card">
                        <h3>Goals by Half</h3>
                        <p>First Half: <strong>{stats.firstHalfGoals}</strong></p>
                        <p>Second Half: <strong>{stats.secondHalfGoals}</strong></p>
                    </div>

                    {/* 2. Earliest/Latest Goals */}
                    <div className="stat-card">
                        <h3>Timing Records</h3>
                        <p>Earliest Goal: <strong>{stats.earliestGoal}'</strong></p>
                        <p>Latest Goal: <strong>{stats.latestGoal}'</strong></p>
                    </div>

                    {/* 3. Rounds Stats */}
                    <div className="stat-card">
                        <h3>Round Statistics</h3>
                        <p>
                            Highest Scoring (Round {stats.mostGoalsRound}):
                            <strong>{stats.mostGoalsCount}</strong>
                        </p>
                        <p>
                            Lowest Scoring (Round {stats.leastGoalsRound}):
                            <strong>{stats.leastGoalsCount}</strong>
                        </p>
                    </div>

                </div>
            )}
        </div>
    );
}