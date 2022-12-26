import { current } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
//import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { GetCourse } from "../../objects/course/course-api";
import { CourseModel } from "../../objects/course/course-model";
import { Adsense } from "@ctrl/react-adsense";
import "./course-overview.scss";
import Spinner from "../../components/loading-spinner/loading-spinner";

const CourseOverview = () => {
    const dispatch = useDispatch();
    //const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { id } = useParams();
    const [course, setCourse] = useState<CourseModel>();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        dispatch({
            type: "CHANGE_PAGE",
            value: {
                currentPageTitle: `${course?.name}`,
                currentPage: `course-${id}`,
            },
        });
    }, [course, dispatch, id]);

    useEffect(() => {
        async function getCourseInfo() {
            if (!course) {
                const course = await GetCourse(id);
                setCourse(course ? course : new CourseModel(null));
            }
            setIsLoading(false);
        }

        getCourseInfo();
    }, [id, course]);

    useEffect(() => {
        const weekNum = searchParams.get("week") ?? "";
        const week = document.getElementsByClassName(weekNum)[0];
        week?.classList?.add("selected");

        week?.scrollIntoView({
            behavior: "auto",
            block: "center",
            inline: "center",
        });
    }, [course, searchParams]);

    return (
        <article className="course-overview">
            {isLoading ? <Spinner></Spinner> : null}
            <section
                dangerouslySetInnerHTML={{ __html: course?.scheduleData ?? "" }}
            ></section>
            <aside>
                Ads here:
                <Adsense
                    client="ca-pub-4836602045702579"
                    slot="7256118071"
                    style={{ display: "block" }}
                    layout="in-article"
                    format="auto"
                />
            </aside>
        </article>
    );
};

export default CourseOverview;
