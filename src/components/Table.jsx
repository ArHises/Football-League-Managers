import { useEffect, useState } from "react";
import { getLeagueById, getLeagueHistoryByIdAndTeam } from "../services/api.js";
import { PlayerList } from "./PlayerList.jsx";
import { HistoryList } from "./HistoryList.jsx";

export const Table = ({ leagueId }) => {
    const [leagueData, setLeagueData] = useState([]);
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const [sortBy, setSortBy] = useState("points");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLeagueData = async () => {
            setLoading(true);
            try {
                const response = await getLeagueById(leagueId);
                if (response.status !== 200) {
                    console.error("Error fetching league from API");
                    return;
                }

                const baseTeams = response.data;
                const enrichedTeams = [];

                for (const team of baseTeams) {
                    let teamPoints = 0;
                    let teamGoalDiff = 0;

                    const historyRes = await getLeagueHistoryByIdAndTeam(leagueId, team.id);

                    if (historyRes.status === 200) {
                        for (const match of historyRes.data) {
                            const isHome = match.homeTeam.id === team.id;
                            let myTeamGoals = 0;
                            let opponentGoals = 0;

                            for (const goal of match.goals) {
                                if ((isHome && goal.home) || (!isHome && !goal.home)) {
                                    myTeamGoals++;
                                } else {
                                    opponentGoals++;
                                }
                            }

                            if (myTeamGoals > opponentGoals) {
                                teamPoints += 3;
                            } else if (myTeamGoals === opponentGoals) {
                                teamPoints += 1;
                            }

                            teamGoalDiff += (myTeamGoals - opponentGoals);
                        }
                    }

                    enrichedTeams.push({
                        ...team,
                        points: teamPoints,
                        goalDifference: teamGoalDiff
                    });
                }

                setLeagueData(enrichedTeams);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchLeagueData();
    }, [leagueId]);

    let sortedLeague = [...leagueData];

    sortedLeague.sort((teamA, teamB) => {
        if (sortBy === "points") {
            return teamB.points - teamA.points;
        } else if (sortBy === "goal difference") {
            return teamB.goalDifference - teamA.goalDifference;
        } else if (sortBy === "Abc") {
            return teamA.name.localeCompare(teamB.name);
        }
        return 0;
    });

    const handleTeamClick = (teamId) => {
        setSelectedTeamId((prevId) => (prevId === teamId ? null : teamId));
    };

    return (
        <section className="Table">
            <section>
                <label>sort by: </label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="points">points</option>
                    <option value="goal difference">goal difference</option>
                    <option value="Abc">Abc</option>
                </select>
            </section>

            {!loading? sortedLeague.map((team, index) => {
                const isFirst = index === 0;
                const isBottom3 = index >= sortedLeague.length - 3;
                const rankClassName = isFirst
                    ? "TableTeamName--first"
                    : (isBottom3
                        ? "TableTeamName--bottom3"
                        : "");

                return (
                    <div className="TableRow" key={team.id}>
                        <div className="Team">
                            <div
                                onClick={() => handleTeamClick(team.id)}
                                className={`TableTeamName ${rankClassName}`}
                            >
                                {team.name} (Pts: {team.points}, GD: {team.goalDifference})
                            </div>
                        </div>
                        {selectedTeamId === team.id && (
                            <div className="Information-Table">
                                <PlayerList leagueId={leagueId} teamId={team.id} />
                                <HistoryList leagueId={leagueId} teamId={team.id} />
                            </div>
                        )}
                    </div>
                );
            }) : <p>Loading...</p>}
        </section>
    );
};