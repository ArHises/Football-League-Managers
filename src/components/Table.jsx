import {useEffect, useState} from "react";
import {getLeagueById} from "../services/api.js";
import {PlayerList} from "./PlayerList.jsx";
import {HistoryList} from "./HistoryList.jsx";

export const Table = ({leagueId}) => {

    const [league, setLeague] = useState([]);
    const [selectedTeamId, setSelectedTeamId] = useState(null);

    useEffect(() => {
        const fetchLeague = async () => {
            const response = await getLeagueById(leagueId);
            if (response.status === 200) {
                setLeague(response.data);
                console.log("The League:", leagueId, response.data);
            } else {
                console.error("Error fetching league from API");
            }
        };
        fetchLeague()
    }, [leagueId])

    const handleTeamClick = (teamId) => {
        if (selectedTeamId === teamId) {
            setSelectedTeamId(null);
        } else {
            setSelectedTeamId(teamId);
        }
    };

    return (
        <section className="Table">
            The Table for league {leagueId}:
            {league.map((team) => (
                <div className="TableRow" key={team.id}>
                    <div className="Team">
                        <div onClick={() => handleTeamClick(team.id)}
                             style={{ cursor: "pointer", color: "blue" }}>
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
    )
}