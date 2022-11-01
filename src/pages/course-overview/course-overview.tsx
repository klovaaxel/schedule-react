import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const CourseOverview = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { id } = useParams();

    useEffect(() => {
        dispatch({ type: "CHANGE_PAGE_TITLE", value: "Course Name" });
    });

    return <h1>Hello world, I am {id}</h1>;
};

export default CourseOverview;
