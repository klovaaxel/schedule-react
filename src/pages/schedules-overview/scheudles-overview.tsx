import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { GetGroupList } from "../../objects/group/group-api";
import { GroupModel } from "../../objects/group/group-model";
import DropdownList from "react-widgets/DropdownList";
import GroupOverview from "./components/group-overview";
import "./schedules-overview.scss";
import { getWeekNumber } from "../../components/week-number";
import Spinner from "../../components/loading-spinner/loading-spinner";
import GetSettings from "../../objects/general/settings-api";

export default function SchedulesOverview() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [groups, setGroups] = useState<GroupModel[]>([]);
    const [shownGroups, setShownGroups] = useState<GroupModel[]>([]);

    const [week, setWeek] = useState<number>(getWeekNumber());
    const [schoolWeeks, setSchoolWeeks] = useState<number[]>();

    useEffect(() => {
        dispatch({
            type: "CHANGE_PAGE",
            value: {
                currentPageTitle: "TC-Stenugnsund",
                currentPage: "schedule-overview",
            },
        });
    }, [groups, dispatch]);

    useEffect(() => {
        const doAsync = async () => {
            //If groups are missing get groups
            if (groups.length <= 0) {
                const groups = await GetGroupList();
                setGroups(groups);
                setShownGroups(groups);
                setIsLoading(false);
            }
        };

        doAsync();
    }, [groups, shownGroups]);

    useEffect(() => {
        const doAsync = async () => {
            const settings = await GetSettings();
            setSchoolWeeks(settings.schoolWeeks);
        };

        doAsync();
    });

    return (
        <main className="schedules-overview">
            {isLoading ? <Spinner></Spinner> : null}
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
                            data={schoolWeeks}
                            onChange={(week) => setWeek(week)}
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
                                    groupId !== t("all-groups")
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
        </main>
    );
}
