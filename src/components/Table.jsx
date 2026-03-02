import { useEffect, useState } from "react";
import { getLeagueById, getLeagueHistoryByIdAndTeam } from "../services/api.js";
import { PlayerList } from "./PlayerList.jsx";
import { HistoryList } from "./HistoryList.jsx";

export const Table = ({ leagueId }) => {
    const [league, setLeague] = useState([]);
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const pointsPerTeam = {};
    const goalDiffPerTeam = {};

    useEffect(() => {
        const fetchLeague = async () => {
            const response = await getLeagueById(leagueId);
            if (response.status === 200) {
                setLeague(response.data);
                console.log("The League:", leagueId, response.data);
            } else {
                console.error("Error fetching league from API");
            }

            for (const team of response.data) {
                try {
                    const response = await getLeagueHistoryByIdAndTeam(
                        leagueId,
                        team.id,
                    );

                    if (response.status === 200) {
                        for (const match of response.data) {
                            if (match.homeTeam.id === team.id) {
                                var count = 0;
                                for (const goal of match.goals) {
                                    count = 0;
                                    if (goal.home) {
                                        count++;
                                    }
                                }
                                if (count > match.goals.length - count) {
                                    pointsPerTeam[team.id] =
                                        (pointsPerTeam[team.id] || 0) + 3;
                                } else if (
                                    count ===
                                    match.goals.length - count
                                ) {
                                    pointsPerTeam[team.id] =
                                        (pointsPerTeam[team.id] || 0) + 1;
                                }
                                goalDiffPerTeam[team.id] =
                                    (goalDiffPerTeam[team.id] || 0) +
                                    count -
                                    (match.goals.length - count);
                            } else {
                                for (const goal of match.goals) {
                                    count = 0;
                                    if (!goal.home) {
                                        count++;
                                    }
                                }
                                if (count > match.goals.length - count) {
                                    pointsPerTeam[team.id] =
                                        (pointsPerTeam[team.id] || 0) + 3;
                                } else if (
                                    count ===
                                    match.goals.length - count
                                ) {
                                    pointsPerTeam[team.id] =
                                        (pointsPerTeam[team.id] || 0) + 1;
                                }
                                goalDiffPerTeam[team.id] =
                                    (goalDiffPerTeam[team.id] || 0) +
                                    count -
                                    (match.goals.length - count);
                            }
                        }

                        console.log("The history:", response.data);
                    } else {
                        console.error("Error fetching history from API");
                    }
                } catch (e) {
                    console.error(
                        e?.message ?? "Error fetching history from API",
                    );
                }
            }
        };
        fetchLeague();
    }, [leagueId]);

    const handleTeamClick = (teamId) => {
        if (selectedTeamId === teamId) {
            setSelectedTeamId(null);
        } else {
            setSelectedTeamId(teamId);
        }
    };

    const sortTeamsByPoints = () => {
        // 1. Convert { "Team A": 10, "Team B": 12 } into [["Team A", 10], ["Team B", 12]]
        const teamsArray = Object.entries(pointsPerTeam);

        // 2. Sort by the second element (points) in descending order
        teamsArray.sort((teamA, teamB) => {
            const pointsA = teamA[1];
            const pointsB = teamB[1];
            return pointsB - pointsA;
        });

        return teamsArray;
    };

    const sortTeamsByGoalDifference = () => {
        // 1. Convert { "Team A": 5, "Team B": 3 } into [["Team A", 5], ["Team B", 3]]
        const teamsArray = Object.entries(goalDiffPerTeam);
        // 2. Sort by the second element (goal difference) in descending order
        teamsArray.sort((teamA, teamB) => {
            const goalDiffA = teamA[1];
            const goalDiffB = teamB[1];
            return goalDiffB - goalDiffA;
        });

        return teamsArray;
    };

    const sortTeamsAlphabetically = () => {
        // 1. Convert { "Team A": 5, "Team B": 3 } into [["Team A", 5], ["Team B", 3]]
        const teamsArray = Object.entries(pointsPerTeam);
        // 2. Sort by the first element (team name) in alphabetical order
        teamsArray.sort((teamA, teamB) => {
            const nameA = teamA[0].toUpperCase(); // ignore upper and lowercase
            const nameB = teamB[0].toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });

        return teamsArray;
    };

    return (
        <section className="Table">
            The Table for league {leagueId}:
            <section>
                <label>sort by: </label>
                <select
                    onChange={(e) => {
                        const sortBy = e.target.value;
                        if (sortBy === "points") {
                            setSortedLeague(sortTeamsByPoints());
                        } else if (sortBy === "goal difference") {
                            setSortedLeague(sortTeamsByGoalDifference());
                        } else if (sortBy === "Abc") {
                            setSortedLeague(sortTeamsAlphabetically());
                        }
                    }}
                >
                    <option>points</option>
                    <option>goal difference</option>
                    <option>Abc</option>
                </select>
            </section>
            {league.map((team) => (
                <div className="TableRow" key={team.id}>
                    <div className="Team">
                        <div
                            onClick={() => handleTeamClick(team.id)}
                            style={{ cursor: "pointer", color: "blue" }}
                        >
                            {team.name}
                        </div>
                    </div>
                    {selectedTeamId === team.id && (
                        <div className="Information-Table">
                            <PlayerList leagueId={leagueId} teamId={team.id} />
                            <HistoryList leagueId={leagueId} teamId={team.id} />
                        </div>
                    )}
                </div>
            ))}
        </section>
    );
};
