import { useContext } from "react";
import { LeagueContext } from "./LeagueContext";

export const LeagueSelector = () => {
    const { leagues, setCurrentLeague, currentLeague } = useContext(LeagueContext);

    return (
            <section className="Leagues">
                <h3 className="Leagues-header">Leagues: </h3>
                {leagues.map((league) => (
                    <span
                        className={`League ${league.id === currentLeague ? 'active' : ''}`}
                        key={league.id}
                        onClick={() => setCurrentLeague(league.id)}
                    >
                        {league.name}
                    </span>
                ))}
            </section>
    );
};