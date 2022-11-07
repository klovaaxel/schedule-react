import IGroup from "./group-inteface";
import { GroupModel } from "./group-model";
import resolveJSON from "../../components/resolve-json";

export const GetGroupList = async () => {
    const request = await window.fetch(
        "https://raw.githubusercontent.com/klovaaxel/schedule-react/db/groups.json"
    );

    const response = request.ok ? await request.json() : null;
    const groupList: IGroup[] = (await resolveJSON(response)) ?? null;
    const modelList: GroupModel[] = groupList.map((x) => new GroupModel(x));

    console.log(modelList);

    return modelList;
};
