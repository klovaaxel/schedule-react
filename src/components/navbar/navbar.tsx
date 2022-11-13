import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import "./navbar.scss";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBookOpen,
    faCalendarDays,
    faIdCard,
    faTv,
    faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const Navbar = () => {
    const pageTitle = useSelector((state: any) => state.currentPageTitle);
    const currentPage = useSelector((state: any) => state.currentPage);

    const { t } = useTranslation();

    return (
        <nav className="main-navbar">
            <Link to="/" className="logo">
                <img src={logo} alt="App-Logo" />
            </Link>

            <h2 className="page-title">{pageTitle}</h2>

            <nav className="pages">
                <Link
                    to="external?title=Skola24&url=https://web.skola24.se/timetable/timetable-viewer/stenungsund.skola24.se/Nösnäsgymnasiet/"
                    className={currentPage === "about" ? "active" : ""}
                >
                    <FontAwesomeIcon icon={faCalendarDays} />
                    <span>{t("navbar.link-titles.course-schedule")}</span>
                </Link>
                <Link
                    to="external?title=Matsedeln&url=https://www.skolmaten.se/nosnasgymnasiet/"
                    className={currentPage === "food-schedule" ? "active" : ""}
                >
                    <FontAwesomeIcon icon={faUtensils} />
                    <span>{t("navbar.link-titles.food-schedule")}</span>
                </Link>
                <Link
                    to="external?title=Matsedeln&url=https://stenungsund.skola24.se/"
                    className={currentPage === "student-login" ? "active" : ""}
                >
                    <FontAwesomeIcon icon={faIdCard} />
                    <span>{t("navbar.link-titles.student-login")}</span>
                </Link>
                <Link
                    to="external?title=Matsedeln&url=https://tcstenungsund.github.io/digital-signage/"
                    className={currentPage === "student-info" ? "active" : ""}
                >
                    <FontAwesomeIcon icon={faTv} />
                    <span>{t("navbar.link-titles.student-info")}</span>
                </Link>
                <Link
                    to="https://www.netacad.com/"
                    className={
                        currentPage === "reading-material" ? "active" : ""
                    }
                >
                    <FontAwesomeIcon icon={faBookOpen} />
                    <span>{t("navbar.link-titles.reading-material")}</span>
                </Link>
            </nav>
        </nav>
    );
};

export default Navbar;
