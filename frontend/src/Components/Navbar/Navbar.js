import { NavLink } from "react-router-dom";
import { MyContext } from "../../App";
import "./Navbar.css";
import { useContext } from "react";
const Navbar = () => {
    const { isAuth } = useContext(MyContext);
    return (
        <div id="navbar">
            <NavLink to="/"><div id="logo" className="orbitron-text">
                VeriPass
            </div></NavLink>
            {isAuth ?
                <NavLink to="/profile">Profile</NavLink>
                :
                <NavLink to="/login">Login</NavLink>}
        </div>
    );
};
export default Navbar;