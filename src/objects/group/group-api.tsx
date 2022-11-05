import IGroup from "./group-inteface";
import { GroupModel } from "./group-model";

export const GetGroupList = async () => {
    const response = await window.fetch(
        process.env.PUBLIC_URL + "/group-list.json"
    );

    const groupList: IGroup[] = response.ok ? await response.json() : null;
    const modelList: GroupModel[] = groupList.map((x) => new GroupModel(x));

    return modelList;
};
