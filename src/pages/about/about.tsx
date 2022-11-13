import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export const About = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "CHANGE_PAGE",
            value: { currentPageTitle: "About", currentPage: "about" },
        });
    });

    return (
        <section>
            <h1>Hello world!</h1>
            <p>I'm a about page</p>
            <Link to="/">Home</Link>
        </section>
    );
};

export default About;
