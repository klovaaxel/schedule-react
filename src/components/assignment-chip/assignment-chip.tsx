import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { CourseModel } from "../../objects/course/course-model";
import "./assignemnt-chip.scss";

interface props {
    assignment: string;
    course: CourseModel | null;
}

export default function AssingmentChip({ props }: { props: props }) {
    const assignment: string = props.assignment;
    const course: CourseModel | null = props.course;

    console.log(assignment);

    const isLink = assignment.match(/\[.*\]\(.*\)/gms)?.length ?? 0 > 0;

    let assignmentLink = isLink
        ? Array.from(assignment.matchAll(/(\[.*\])(\(.*\))/gms))[0][2]
        : "";
    assignmentLink = assignmentLink.substring(1, assignmentLink.length - 1);

    let assignmentContent = isLink
        ? Array.from(assignment.matchAll(/(\[.*\])(\(.*\))/gms))[0][1]
        : assignment;
    if (assignmentContent !== assignment) {
        assignmentContent = assignmentContent.substring(
            1,
            assignmentContent.length - 1
        );
    }

    console.log(Array.from(assignment.matchAll(/(\[.*\])(\(.*\))/gms)));

    if (course ? course.scheduleUrl.endsWith(".beta.md") : true) {
        if (isLink) {
            return (
                <a href={assignmentLink} className="assignment-chip">
                    <ReactMarkdown>{assignmentContent}</ReactMarkdown>
                </a>
            );
        } else {
            return (
                <span className="assignment-chip">
                    <ReactMarkdown>{assignmentContent}</ReactMarkdown>
                </span>
            );
        }
    } else {
        if (isLink) {
            return (
                <a href={assignmentLink} className="assignment-chip">
                    <ReactMarkdown>{assignmentContent}</ReactMarkdown>
                </a>
            );
        } else {
            return (
                <span className="assignment-chip">
                    <ReactMarkdown>{assignmentContent}</ReactMarkdown>
                </span>
            );
        }
    }
}
