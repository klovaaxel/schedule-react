import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import "./home.scss";

export const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: "CHANGE_PAGE_TITLE", value: "Home" });
    });

    return (
        <section>
            <h1>Hello world!</h1>
            <p>I'm a homepage</p>
            <Link to="/about">About</Link>
            <section>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </section>
        </section>
    );
};
