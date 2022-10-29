import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import "./navbar.scss";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const Navbar = () => {
    const pageTitle = useSelector((state: any) => state.currentPageTitle);
    console.log(pageTitle);

    const { t, i18n } = useTranslation();

    return (
        <nav className="main-navbar">
            <Link to="/" className="logo">
                <img src={logo} alt="App-Logo" />
            </Link>

            <h2 className="page-title">{pageTitle}</h2>

            <nav className="pages">
                <Link to="about">
                    <FontAwesomeIcon icon={faCircleInfo} />
                    {t("navbar.link-titles.about")}
                </Link>
            </nav>
        </nav>
    );
};

export default Navbar;
