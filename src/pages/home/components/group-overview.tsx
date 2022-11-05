//import { useTranslation } from "react-i18next";
const GroupOverview = (group: any) => {
    //const { t } = useTranslation();

    return (
        <article>
            <h3>{group.id}</h3>
            <p>I'm a Group!</p>
        </article>
    );
};

export default GroupOverview;
