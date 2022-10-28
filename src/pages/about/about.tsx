import { Link } from "react-router-dom";

export const About = () => {
    return (
        <section>
            <h1>Hello world!</h1>
            <p>I'm a about page</p>
            <Link to="/">Home</Link>
        </section>
    );
};
