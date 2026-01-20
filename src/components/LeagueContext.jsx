// LeagueContext.js
import { createContext, useState, useEffect } from "react";
import { getAllLeagues } from "../services/api.js";

// 1. Create the Context
export const LeagueContext = createContext(null);

// 2. Create the Provider Component
export const LeagueProvider = ({ children }) => {
    const [leagues, setLeagues] = useState([]);
    // Default to -1 or null
    const [currentLeague, setCurrentLeague] = useState(-1);

    // Fetching logic moves here
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

    // 3. Expose data and functions to the rest of the app
    return (
        <LeagueContext.Provider value={{ leagues, currentLeague, setCurrentLeague }}>
            {children}
        </LeagueContext.Provider>
    );
};