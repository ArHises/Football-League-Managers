import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home/Home.jsx";
import {NavBar} from "./components/NavBar.jsx";
import {HistoryResultPage} from "./pages/HistoryResult/HistoryResult.jsx";
import {LeagueProvider} from "./components/LeagueContext.jsx";
import {LeagueSelector} from "./components/LeagueSelector.jsx";
import {TopKickers} from "./pages/TopKickers/TopKickers.jsx";
import {Statistic} from "./pages/Statistic/Statistic.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <NavBar />
                <LeagueProvider>
                    <LeagueSelector />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/league-round-history" element={<HistoryResultPage />} />
                        <Route path="/top-kickers" element={<TopKickers />} />
                        <Route path="/statistic" element={<Statistic />} />
                    </Routes>
                </LeagueProvider>
            </BrowserRouter>
        </>
    )
}

export default App
