import { useEffect } from "react";
//import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { GetCourse } from "../../objects/course/course-api";

const CourseOverview = () => {
    const dispatch = useDispatch();
    //const { t } = useTranslation();
    const { id } = useParams();

    async function test() {
        console.log(await GetCourse("weuweb01"));
    }

    useEffect(() => {
        dispatch({ type: "CHANGE_PAGE_TITLE", value: "Course Name" });

        test();
    });

    return <h1>Hello world, I am {id}</h1>;
};

export default CourseOverview;
