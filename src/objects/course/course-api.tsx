import resolveJSON from "../../components/resolve-json";
import { getWeekNumber } from "../../components/week-number";
import ICourse from "./course-interface";
import { CourseModel } from "./course-model";

export const GetCourseList = async () => {
    const request = await window.fetch(
        "https://raw.githubusercontent.com/klovaaxel/schedule-react/db/courses.json"
    );

    const response = request.ok ? await request.json() : null;
    const courseList: ICourse[] = (await resolveJSON(response)) ?? null;
    const modelList: CourseModel[] = courseList.map((x) => new CourseModel(x));

    return modelList;
};

export const GetCourse = async (id: string) => {
    // TODO : optimise : get single course data instead of all when asking for one
    const courseList: CourseModel[] = await GetCourseList();
    const course: CourseModel | null =
        (await courseList).find((x) => x.id === id) ?? null;
    if (course) {
        course.scheduleData = await GetSchedule(course?.scheduleUrl);
    }
    return course;
};

export const GetSchedule = async (url: string) => {
    const response = await window.fetch(url);
    let schedule = await response.text();

    // TODO: Clean up this mess...
    const weeks =
        (schedule + "DOCEND").match(/\n##(.+?(?=\n##)|.+?(?=DOCEND))/gms) ?? [];

    for (const week of weeks) {
        const weekNumMatch = /(##[^0-9,\n]*)(\d{1,2})/g.exec(week);
        const weekNum = weekNumMatch ? weekNumMatch[2] : "";

        const tagStart = `<div class="week ${weekNum}${
            weekNum === getWeekNumber().toString() ? " current" : ""
        }" markdown="1">\n\n`;

        const tagEnd = `</div>`;

        schedule = schedule.replace(week, tagStart + week + tagEnd);
    }

    schedule.replace("DOCEND", "");
    return schedule;
};
