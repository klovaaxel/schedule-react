import { useEffect, useLayoutEffect } from "react";
//import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import Spinner from "../../components/loading-spinner/loading-spinner";
import { GetScehdule } from "../../objects/schedule/schedule-api";
import { useQuery } from "react-query";
import { Post } from "./post";
import { IPost } from "../../objects/schedule/schedule-interface";
import "./schedule.scss";
import { GetWeekNumber } from "../../components/week-number";
import { GetCourseList } from "../../objects/course/course-api";
import { useTranslation } from "react-i18next";

export function Schedule() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const { t } = useTranslation();

    // Fetch group data
    const { data: courseList } = useQuery(["GetCourseList"], GetCourseList);

    // Fetch schedule data
    const { data: schedule, status: scheduleStatus } = useQuery({
        queryKey: [
            `schedule-${id}`,
            `${
                courseList?.find((g) => {
                    return g.id === id;
                })?.scheduleUrl
            }`,
        ],
        queryFn: GetScehdule,
        enabled: !!courseList,
    });

    // Change PageTitle in navbar
    useEffect(() => {
        dispatch({
            type: "CHANGE_PAGE",
            value: {
                currentPageTitle: `${schedule?.name}`,
                currentPage: `course-${id}`,
            },
        });
    }, [schedule, dispatch, id]);

    // Scroll selected or current week into view
    useLayoutEffect(() => {
        const selectedWeek = document.querySelector(
            `li[data-week="${searchParams.get("week") ?? ""}"]`
        );
        const currentWeek = document.querySelector(
            `li[data-week="${GetWeekNumber()}"]`
        );
        selectedWeek?.classList?.add("selected");
        currentWeek?.classList?.add("current");

        const week = selectedWeek != null ? selectedWeek : currentWeek;
        if (week != null) {
            week?.scrollIntoView({
                behavior: "auto",
                block: "center",
                inline: "center",
            });
        }
    }, [schedule, scheduleStatus, searchParams]);

    return (
        <article className="schedule">
            {scheduleStatus === "success" && (
                <>
                    <h1>{schedule?.name}</h1>
                    <ul>
                        {schedule?.posts.map((post: IPost) => (
                            <li key={post.id} data-week={post.sequenceNumber}>
                                <Post post={post} />
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {(scheduleStatus === "loading" || scheduleStatus === "idle") && (
                <Spinner />
            )}

            {scheduleStatus === "error" && <h3>{t("something-went-wrong")}</h3>}
        </article>
    );
}
