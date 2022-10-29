import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import "./navbar.scss";
import { useSelector } from "react-redux";

const Navbar = () => {
    const pageTitle = useSelector((state: any) => state.currentPageTitle);
    console.log(pageTitle);

    return (
        <nav className="main-navbar">
            <Link to="/" className="logo">
                <img src={logo} alt="App-Logo" />
            </Link>

            <h2 className="page-title">{pageTitle}</h2>

            <nav className="pages">
                <Link to="about">About</Link>
            </nav>
        </nav>
    );
};

export default Navbar;
