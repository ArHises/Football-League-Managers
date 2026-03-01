import {NavLink} from "react-router-dom";

export const NavBar = () => {
    return (
        <nav>
            <NavLink to="/">
                Home
            </NavLink>
            <span> / </span>
            <NavLink to="/league-round-history">
                League round history
            </NavLink>
            <span> / </span>
            <NavLink to="/top-kickers">
                Top Kickers
            </NavLink>
            <span> / </span>
            <NavLink to="/statistic">
                Statistic
            </NavLink>
        </nav>
    )
}
