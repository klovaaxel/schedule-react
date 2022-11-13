import { useEffect, useState } from "react";
//import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { GetCourse } from "../../objects/course/course-api";
import { CourseModel } from "../../objects/course/course-model";

const CourseOverview = () => {
    const dispatch = useDispatch();
    //const { t } = useTranslation();
    const { id } = useParams();
    const [course, setCourse] = useState<CourseModel>();

    useEffect(() => {
        async function getCourseInfo() {
            const course = await GetCourse("weuweb01");

            setCourse(course ? course : new CourseModel(null));
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

    return <h1>Hello world, I am {id}</h1>;
};

export default CourseOverview;
