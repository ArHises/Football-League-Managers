import {useState} from "react";
import {NavLink} from "react-router-dom";

export const NavBar = () => {
    const [pages , setPages] = useState([]);
    return (
        <nav>
            <NavLink to="/">
                Home
            </NavLink>
        </nav>
    )
}