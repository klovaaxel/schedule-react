import { useEffect, useState } from "react";
//import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { GetCourse } from "../../objects/course/course-api";
import { CourseModel } from "../../objects/course/course-model";
import "./course-overview.scss";

const CourseOverview = () => {
    const dispatch = useDispatch();
    //const { t } = useTranslation();
    const { id } = useParams();
    const [course, setCourse] = useState<CourseModel>();

    useEffect(() => {
        async function getCourseInfo() {
            if (!course) {
                const course = await GetCourse("weuweb01");
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

    var showdown = require("showdown"),
        converter = new showdown.Converter(),
        text = course?.scheduleData,
        html = converter.makeHtml(text);

    console.log(course?.scheduleData);

    return (
        <article className="course-overview">
            <section dangerouslySetInnerHTML={{ __html: html }}></section>
        </article>
    );
};

export default CourseOverview;
