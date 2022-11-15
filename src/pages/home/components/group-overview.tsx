import { useState } from "react";
import { Link } from "react-router-dom";
import { getWeekNumber } from "../../../components/week-number";
import { CourseModel } from "../../../objects/course/course-model";
import { GroupModel } from "../../../objects/group/group-model";

interface props {
    group: GroupModel;
    week?: number;
}

//import { useTranslation } from "react-i18next";
const GroupOverview = (props: props) => {
    //const { t } = useTranslation();

    const group = props.group;
    const week = props.week ?? getWeekNumber();

    return (
        <section className="group">
            <h2>{group.id}</h2>
            <ul>
                {group.courses?.map((course) => {
                    return (
                        <li key={course.id} className="course">
                            <Link to={"/course/" + course.id + "?week=current"}>
                                <h3>{course.name}</h3>
                                <section
                                    className="schedule"
                                    dangerouslySetInnerHTML={{
                                        __html: GetWeek(course, week),
                                    }}
                                ></section>
                            </Link>
                            <aside className="assignments">
                                <Link
                                    to={
                                        "/course/" +
                                        course.id +
                                        "#" +
                                        "Assignment?"
                                    }
                                >
                                    Im a Assingment
                                </Link>
                            </aside>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

export default GroupOverview;

const GetWeek = (course: CourseModel, weekNumber: number) => {
    const regEx = new RegExp(
        `<div class="week ${weekNumber}[^"]*".*?div>`,
        "gms"
    );

    const weekMatches = course.scheduleData.match(regEx) ?? [];
    const week = weekMatches[0];

    return week;
};
