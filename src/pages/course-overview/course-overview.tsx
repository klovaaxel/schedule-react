import { current } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
//import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { GetCourse } from "../../objects/course/course-api";
import { CourseModel } from "../../objects/course/course-model";
import { Adsense } from "@ctrl/react-adsense";
import "./course-overview.scss";

const CourseOverview = () => {
    const dispatch = useDispatch();
    //const { t } = useTranslation();
    const { id } = useParams();
    const [course, setCourse] = useState<CourseModel>();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        async function getCourseInfo() {
            if (!course) {
                const course = await GetCourse(id);
                setCourse(course ? course : new CourseModel(null));
            }
        }

        getCourseInfo();
    });

    useEffect(() => {
        dispatch({
            type: "CHANGE_PAGE",
            value: {
                currentPageTitle: `${course?.name}`,
                currentPage: `course-${id}`,
            },
        });
    });

    useEffect(() => {
        const weekNum = searchParams.get("week") ?? "";
        const week = document.getElementsByClassName(weekNum)[0];
        week?.scrollIntoView({
            behavior: "auto",
            block: "center",
            inline: "center",
        });
    });

    return (
        <article className="course-overview">
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
