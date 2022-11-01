import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import DropdownList from "react-widgets/DropdownList";
import GroupOverview from "./components/group-overview";
import "./home.scss";

export const Home = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch({ type: "CHANGE_PAGE_TITLE", value: "TC-Stenungsund" });
    });

    const groups = [
        {
            id: "22tei",
            name: "2022 Informations- och medieteknik",
        },
    ];

    return (
        <main className="home-page">
            <header>
                <h1 className="page-title">{t("schedule")}</h1>
                <nav>
                    <span className="input-group">
                        <label htmlFor="week-selector">
                            {t("week-selector-label")}
                        </label>
                        <DropdownList
                            id="week-selector"
                            title={t("week-selector-tooltip")}
                            className="week selector"
                            defaultValue="Yellow"
                            data={["Red", "Yellow", "Blue", "Orange"]}
                        />
                    </span>

                    <span className="input-group">
                        <label htmlFor="group-selector">
                            {t("group-selector-label")}
                        </label>
                        <DropdownList
                            id="group-selector"
                            className="group selector"
                            defaultValue="Yellow"
                            data={["Red", "Yellow", "Blue", "Orange"]}
                        />
                    </span>
                </nav>
            </header>
            <section>
                <p>Groups : </p>
                <Link to="/about">About</Link>
                <Link to="/course/17tei">Course</Link>
                <ul className="course-list">
                    {groups.map((group) => {
                        return (
                            <li key={group.id}>
                                <GroupOverview {...group} />;
                            </li>
                        );
                    })}
                </ul>
            </section>
            <aside>
                <h2>{t("assignments")}</h2>
            </aside>
        </main>
    );
};
