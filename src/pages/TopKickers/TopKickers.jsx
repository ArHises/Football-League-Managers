import {useContext, useEffect, useState} from "react";
import {getLeagueHistoryById} from "../../services/api.js";
import {LeagueContext} from "../../components/LeagueContext.jsx";
import "./TopKickers.css";

const getPlayerGoalCounts = (matches) => {
    const stats = {};

    matches.forEach((match) => {
        if (!match.goals) return;

        match.goals.forEach((goal) => {
            const player = goal.scorer;
            const playerId = player?.id;

            if (playerId) {
                if (!stats[playerId]) {
                    stats[playerId] = {
                        firstName: player.firstName,
                        lastName: player.lastName,
                        id: playerId,
                        scores: 0
                    };
                }
                stats[playerId].scores += 1;
            }
        });
    });

    return stats;
};

export const TopKickers = () => {

    const { currentLeague } = useContext(LeagueContext);
    const [kickers, setKickers] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentLeague || currentLeague === -1) {
            return;
        }
        const fetchData = async () => {
            setLoading(true);
            const response = await getLeagueHistoryById(currentLeague);
            if (response && response.status === 200) {
                console.log(response.data);
                const topKickers = getPlayerGoalCounts(response.data);
                console.log(topKickers);
                setKickers(topKickers);
            }
            setLoading(false);
        }
        fetchData();
    }, [currentLeague]);

    const getTopThreeScorers = (playersMap) => {
        const playersArray = Object.values(playersMap);
        playersArray.sort((playerA, playerB) => playerB.scores - playerA.scores);
        return playersArray.slice(0, 3);
    };

    return (
        <div className="TopKickers page">
            <h2>Top Kickers</h2>
            {
                (currentLeague !== null && currentLeague !== -1 && !loading) ? (
                    getTopThreeScorers(kickers).map((kicker) => (
                        <div className="Kicker" key={kicker.id}>
                            <p>
                                <span>{kicker.firstName} {kicker.lastName}</span>
                                <strong>{kicker.scores}</strong>
                            </p>
                        </div>
                    ))
                ) : <h3>Please select a league from the menu.</h3>
            }
        </div>
    );
}