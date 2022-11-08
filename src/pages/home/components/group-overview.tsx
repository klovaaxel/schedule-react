import { Link } from "react-router-dom";
import { GroupModel } from "../../../objects/group/group-model";

//import { useTranslation } from "react-i18next";
const GroupOverview = (group: GroupModel) => {
    //const { t } = useTranslation();

    return (
        <section className="group">
            <h2>{group.id}</h2>
            <ul>
                {group.courses?.map((course) => {
                    return (
                        <li key={course.id} className="course">
                            <Link to={"/course/" + course.id}>
                                <h3>{course.name}</h3>
                                <article>
                                    This weeks lesson plan is a mess and i dont
                                    like it
                                </article>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

export default GroupOverview;
