import { createContext, useState, useEffect } from "react";
import { getAllLeagues } from "../services/api.js";

// eslint-disable-next-line react-refresh/only-export-components
export const LeagueContext = createContext(null);

export const LeagueProvider = ({ children }) => {
    const [leagues, setLeagues] = useState([]);
    const [currentLeague, setCurrentLeague] = useState(-1);

    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const response = await getAllLeagues();
                if (response.status === 200) {
                    setLeagues(response.data);
                }
            } catch (error) {
                console.error("Error fetching leagues:", error);
            }
        };
        fetchLeagues();
    }, []);

    return (
        <LeagueContext.Provider value={{ leagues, currentLeague, setCurrentLeague }}>
            {children}
        </LeagueContext.Provider>
    );
};