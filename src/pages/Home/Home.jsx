import {useEffect, useState} from "react";
import {getAllLeagues} from "../../services/api.js";
import {Table} from "../../components/Table.jsx";
import "./Home.css";

export const Home = () => {
    const [leagues, setLeagues] = useState([]);
    const [currentLeague, setCurrentLeague] = useState(-1);

    useEffect(() => {
        const fetchLeagues = async () => {
            const response = await getAllLeagues();
            if (response.status === 200) {
                setLeagues(response.data);
            } else {
                console.error("Error fetching leagues from API");
            }
        }
        fetchLeagues();
    }, []);
    return (
        <div >
            <h1>Home Page</h1>
            <section className="Leagues">
                {leagues.map((league) => (
                    <span
                        className="League"
                        key={league.id}
                        onClick={() => setCurrentLeague(league.id)}>
                        {league.name}
                    </span>
                ))}
            </section>

            {currentLeague !== -1 && (<Table leagueId={currentLeague} />)}
        </div>
    );
}