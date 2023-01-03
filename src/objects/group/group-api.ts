import IGroup from "./group-inteface";
import { GroupModel } from "./group-model";
import resolveJSON from "../../components/resolve-json";
import { GetSchedule } from "../course/course-api";

export const GetGroupList = async () => {
    const request = await window.fetch(
        "https://raw.githubusercontent.com/klovaaxel/schedule-react/db/groups.json"
    );

    const response = request.ok ? await request.json() : null;
    const groupList: IGroup[] = (await resolveJSON(response)) ?? null;
    const modelList: GroupModel[] = groupList.map((x) => new GroupModel(x));

    for (const group of modelList) {
        for (const course of group?.courses ?? []) {
            course.scheduleData = await GetSchedule(course.scheduleUrl);
        }
    }

    return modelList;
};
