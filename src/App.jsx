import './App.css'
import {useEffect, useState} from "react";
import {getAllLeagues} from "./services/api.js";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home/Home.jsx";
import {NavBar} from "./components/NavBar.jsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tables" element={null} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
