import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GetGroupList } from "../../objects/group/group-api";
import { GroupModel } from "../../objects/group/group-model";
import DropdownList from "react-widgets/DropdownList";
import "./home.scss";
import GroupOverview from "./components/group-overview";

export const Home = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [groups, setGroups] = useState<GroupModel[]>([]);

    // let isLoading: boolean = false;

    useEffect(() => {
        // isLoading = true;

        dispatch({ type: "CHANGE_PAGE_TITLE", value: "TC-Stenungsund" });

        const doAsync = async () => {
            //If groups are missing get groups
            if (groups.length <= 0) {
                const groups = await GetGroupList();
                setGroups(groups);
            }
        };

        doAsync();
        // isLoading = false;
    });

    return (
        <main className="home-page">
            <aside>
                <Link to="/about">About</Link>
                <Link to="/course/17tei">Course</Link>
            </aside>
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
            <section className="groups">
                <ul>
                    {groups.map((group) => {
                        return (
                            <li key={group.id}>
                                <GroupOverview {...group} />
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
