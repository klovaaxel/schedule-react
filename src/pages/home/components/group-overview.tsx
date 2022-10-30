import { useTranslation } from "react-i18next";
import IGroup from "../../../interfaces/i-group";

const GroupOverview = (group: IGroup) => {
    const { t } = useTranslation();

    return (
        <article>
            <h3>{group.id}</h3>
            <p>I'm a Group!</p>
        </article>
    );
};

export default GroupOverview;
