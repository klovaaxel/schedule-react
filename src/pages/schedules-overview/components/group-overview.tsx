import ReactMarkdown from "react-markdown";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { GetWeekNumber } from "../../../components/week-number";
import { CourseModel } from "../../../objects/course/course-model";
import { GroupModel } from "../../../objects/group/group-model";
import { GetScehdule } from "../../../objects/schedule/schedule-api";

interface props {
    group: GroupModel;
    week?: number;
}

//import { useTranslation } from "react-i18next";
const GroupOverview = (props: props) => {
    //const { t } = useTranslation();

    const group = props.group;
    const week = props.week ?? GetWeekNumber();

    function GetWeekV2(course: CourseModel, weekNumber: number): string {
        const { data: schedule } = useQuery(
            [`schedule-${course.id}`, course.scheduleUrl],
            GetScehdule
        );

        const markdown = schedule?.posts.find((w) => w.week === week)?.content;
        return markdown ?? "";
    }

    return (
        <section className="group">
            <h2>{group.id}</h2>
            <ul>
                {group.courses?.map((course) => {
                    return (
                        <li key={course.id} className="course">
                            <Link
                                to={
                                    course.scheduleUrl.endsWith(".md")
                                        ? "/course/" +
                                          course.id +
                                          "?week=" +
                                          week
                                        : "beta/course/" +
                                          course.id +
                                          "?week=" +
                                          week
                                }
                            >
                                <h3>{course.name}</h3>
                                {course.scheduleUrl.endsWith(".md") ? (
                                    <section
                                        className="schedule"
                                        dangerouslySetInnerHTML={{
                                            __html: GetWeek(course, week),
                                        }}
                                    ></section>
                                ) : (
                                    <ReactMarkdown>
                                        {GetWeekV2(course, week)}
                                    </ReactMarkdown>
                                )}
                            </Link>
                            <aside className="assignments">
                                <Link
                                    to={
                                        course.scheduleUrl.includes(".md")
                                            ? "/course/" +
                                              course.id +
                                              "#" +
                                              "Assignment?"
                                            : "/beta/course/" +
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
        `<div class="week ${weekNumber} [^"]*".*?div>`,
        "gms"
    );

    const weekMatches = course.scheduleData.match(regEx) ?? [];
    const week = weekMatches[0];

    return week;
};
