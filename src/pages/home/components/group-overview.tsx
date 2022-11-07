import { GroupModel } from "../../../objects/group/group-model";

//import { useTranslation } from "react-i18next";
const GroupOverview = (group: GroupModel) => {
    //const { t } = useTranslation();

    return (
        <article>
            <h3>{group.id}</h3>
            <ul>
                {group.courses?.map((course) => {
                    return (
                        <li key={course.id}>
                            <h4>{course.id}</h4>
                        </li>
                    );
                })}
            </ul>
        </article>
    );
};

export default GroupOverview;
