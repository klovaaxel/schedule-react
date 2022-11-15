import { Link } from "react-router-dom";
import { getWeekNumber } from "../../../components/week-number";
import { CourseModel } from "../../../objects/course/course-model";
import { GroupModel } from "../../../objects/group/group-model";

//import { useTranslation } from "react-i18next";
const GroupOverview = (group: GroupModel) => {
    //const { t } = useTranslation();

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
                                        __html: GetWeek(course),
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

const GetWeek = (course: CourseModel, weekNumber: number = getWeekNumber()) => {
    const regEx = new RegExp(
        `<div class="week ${weekNumber}[^"]*".*?div>`,
        "gms"
    );

    const weekMatches = course.scheduleData.match(regEx) ?? [];
    const week = weekMatches[0];

    return week;
};

// course.scheduleData.match(
//         new RegExp(
//             `<div class="week 10[^"]*".*?div>`,
//             "gms"
//         )
