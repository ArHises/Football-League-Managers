import {useEffect, useState} from "react";
import {getLeagueSquadByIdAndTeamId} from "../services/api.js";

export const PlayerList = ({leagueId, teamId , teamName}) => {

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            if (leagueId === null || teamId === null) return;

            const response = await getLeagueSquadByIdAndTeamId(leagueId, teamId);
            if (response.status === 200) {
                setPlayers(response.data);
                console.log("The squad:", response.data);
            } else {
                console.error("Error fetching squad from API");
            }
        };
        fetchPlayers()
    }, [leagueId, teamId])

  return (
      <>
          <div className={"PlayerList"}>
              {/*<h4>Squad for Team {teamName}:</h4>*/}
              {players.length > 0 ? (
                  players.map((player) => (
                  <div key={player.id} >{player.firstName} {player.lastName}</div>
              ))) : (
                  <p>No players found or loading...</p>
              )}
          </div>
      </>
  );
}