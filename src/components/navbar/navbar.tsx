import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import "./navbar.scss";

export const Navbar = () => {
    return (
        <nav className="main-navbar">
            <Link to="/" className="branding">
                <img src={logo} alt="App-Logo" />
                <h2>React TS Schedule</h2>
            </Link>
            <Link to="about">About</Link>
        </nav>
    );
};
