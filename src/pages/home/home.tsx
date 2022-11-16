import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GetGroupList } from "../../objects/group/group-api";
import { GroupModel } from "../../objects/group/group-model";
import DropdownList from "react-widgets/DropdownList";
import GroupOverview from "./components/group-overview";
import "./home.scss";
import { getWeekNumber } from "../../components/week-number";

export const Home = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [groups, setGroups] = useState<GroupModel[]>([]);
    const [shownGroups, setShownGroups] = useState<GroupModel[]>([]);

    const [week, setWeek] = useState<number>(getWeekNumber());

    // let isLoading: boolean = false;

    useEffect(() => {
        // isLoading = true;

        dispatch({
            type: "CHANGE_PAGE",
            value: {
                currentPageTitle: "TC-Stenugnsund",
                currentPage: "home",
            },
        });

        const doAsync = async () => {
            //If groups are missing get groups
            if (groups.length <= 0) {
                const groups = await GetGroupList();
                setGroups(groups);
                setShownGroups(groups);
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
                            defaultValue={getWeekNumber()}
                            data={["42", "43", "44", "45"]}
                            onChange={(week) => setWeek(parseInt(week))}
                        />
                    </span>

                    <span className="input-group">
                        <label htmlFor="group-selector">
                            {t("group-selector-label")}
                        </label>
                        <DropdownList
                            id="group-selector"
                            className="group selector"
                            defaultValue={t("all-groups")}
                            data={groups
                                .map((g) => g.id)
                                .concat([t("all-groups")])}
                            onChange={(groupId) =>
                                setShownGroups(
                                    groupId != t("all-groups")
                                        ? [
                                              groups.find(
                                                  (g) => g.id === groupId
                                              ) ?? new GroupModel(null),
                                          ]
                                        : groups
                                )
                            }
                        />
                    </span>
                </nav>
            </header>
            <section className="groups">
                <ul>
                    {shownGroups.map((group) => {
                        return (
                            <li key={group.id}>
                                <GroupOverview
                                    {...{ group: group, week: week }}
                                />
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
