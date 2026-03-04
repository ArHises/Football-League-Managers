import {useContext} from "react";
import {Table} from "../../components/Table.jsx";
import "./Home.css";
import {LeagueContext} from "../../components/LeagueContext.jsx";

export const Home = () => {
    const { currentLeague } = useContext(LeagueContext);
    return (
        <div className="page">
            <h1>Home Page</h1>
            {currentLeague !== -1 ? (<Table leagueId={currentLeague} />) :
                <h3>Please select a league from the menu.</h3>}
        </div>
    );
}