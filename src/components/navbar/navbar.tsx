import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import "./navbar.scss";
import { useSelector } from "react-redux";

const Navbar = () => {
    const pageTitle = useSelector((state: any) => state.currentPageTitle);
    console.log(pageTitle);

    return (
        <nav className="main-navbar">
            <Link to="/" className="branding">
                <img src={logo} alt="App-Logo" />
            </Link>
            <h2 className="current-page-title">{pageTitle}</h2>
            <Link to="about">About</Link>
        </nav>
    );
};

export default Navbar;
