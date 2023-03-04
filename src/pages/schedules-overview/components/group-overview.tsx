import ReactMarkdown from "react-markdown";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import AssingmentChip from "../../../components/assignment-chip/assignment-chip";
import { GetWeekNumber } from "../../../components/week-number";
import { CourseModel } from "../../../objects/course/course-model";
import { GroupModel } from "../../../objects/group/group-model";
import { GetScehdule } from "../../../objects/schedule/schedule-api";
import { IPost } from "../../../objects/schedule/schedule-interface";

interface props {
    group: GroupModel;
    week?: number;
}

//import { useTranslation } from "react-i18next";
const GroupOverview = (props: props) => {
    //const { t } = useTranslation();

    const group = props.group;
    const weekNumber = props.week ?? GetWeekNumber();

    function GetPostByWeek(
        course: CourseModel,
        weekNumber: number
    ): IPost | null {
        const { data: schedule } = useQuery(
            [`schedule-${course.id}`, course.scheduleUrl],
            GetScehdule
        );

        const week = schedule?.posts.find((w) => w.week === weekNumber);
        return week ?? null;
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
                                    !course.scheduleUrl.endsWith(".beta.md")
                                        ? "/course/" +
                                          course.id +
                                          "?week=" +
                                          weekNumber
                                        : "beta/course/" +
                                          course.id +
                                          "?week=" +
                                          weekNumber
                                }
                            >
                                <h3>{course.name}</h3>
                                {!course.scheduleUrl.endsWith(".beta.md") ? (
                                    <section
                                        className="schedule"
                                        dangerouslySetInnerHTML={{
                                            __html: GetWeek(course, weekNumber),
                                        }}
                                    ></section>
                                ) : (
                                    <ReactMarkdown>
                                        {GetPostByWeek(course, weekNumber)
                                            ?.content ?? ""}
                                    </ReactMarkdown>
                                )}
                            </Link>
                            <aside className="assignments">
                                {GetPostByWeek(
                                    course,
                                    weekNumber
                                )?.assignments.map((assignment) => {
                                    return (
                                        <AssingmentChip
                                            props={{
                                                assignment: assignment,
                                                course: course,
                                            }}
                                        />
                                    );
                                })}
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
