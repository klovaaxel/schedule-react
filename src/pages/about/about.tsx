import { Link } from "react-router-dom";
import logo from "../../logo.svg";

export const About = () => {
    return (
        <main>
            <h1>Hello world!</h1>
            <p>I'm a about page</p>
            <Link to="/">Home</Link>
        </main>
    );
};
