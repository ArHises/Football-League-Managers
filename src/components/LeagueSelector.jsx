// LeagueSelector.js
import { useContext } from "react";
import { LeagueContext } from "./LeagueContext"; // Adjust import path as needed

export const LeagueSelector = () => {
    // Access the state from the Context
    const { leagues, setCurrentLeague, currentLeague } = useContext(LeagueContext);

    return (
        <div className="Leagues">
            <section className="Leagues">
                {leagues.map((league) => (
                    <span
                        className={`League ${league.id === currentLeague ? 'active' : ''}`}
                        key={league.id}
                        onClick={() => setCurrentLeague(league.id)}
                        style={{ cursor: 'pointer', margin: '0 10px' }} // Optional basic styling
                    >
                        {league.name}
                    </span>
                ))}
            </section>
        </div>
    );
};