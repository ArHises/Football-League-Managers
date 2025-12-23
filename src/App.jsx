import './App.css'
import {useEffect, useState} from "react";
import {getAllLeagues} from "./services/api.js";

function App() {

  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    const fetchLeagues = async () => {
      const response = await getAllLeagues();
      if (response.status === 200) {
        setLeagues(response.data);
        // console.log(response);
      } else {
        console.error("Error fetching leagues from API");
      }

    }
    fetchLeagues();
  }, []);

  return (
    <>
      <select>
        {leagues.map((league) => (
            <option key={league.id} value={league.id}>
              {league.name}
            </option>
        ))}
      </select>
    </>
  )
}

export default App
