import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import BackButton from "../../components/back-button/back-button";
import Spinner from "../../components/loading-spinner/loading-spinner";
import { GetAssignment } from "../../objects/assignment/assignment-api";
import "./assignment.scss";

const CourseOverview = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [assignment, setAssignment] = useState<string>();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        dispatch({
            type: "CHANGE_PAGE",
            value: {
                currentPageTitle: "Uppgift:",
                currentPage: `assignment`,
            },
        });
    }, [assignment, dispatch]);

    useEffect(() => {
        async function fetchData() {
            const assignment = await GetAssignment(
                searchParams.get("url") ?? ""
            );
            setAssignment(assignment);
            setIsLoading(false);
        }

        fetchData();
    }, [searchParams]);

    return (
        <section className="assignment">
            <aside>
                <BackButton />
            </aside>
            <article className="course-overview">
                {isLoading ? <Spinner></Spinner> : null}
                <section
                    dangerouslySetInnerHTML={{
                        __html: assignment ?? "",
                    }}
                ></section>
            </article>
        </section>
    );
};

export default CourseOverview;
