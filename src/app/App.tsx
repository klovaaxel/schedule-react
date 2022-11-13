import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Navbar from "../components/navbar/navbar";
import { About } from "../pages/about/about";
import { Home } from "../pages/home/home";
import "react-widgets/scss/styles.scss";
import CourseOverview from "../pages/course-overview/course-overview";
import ExteralSite from "../pages/external/external";
import ReactGA from "react-ga4";

function App() {
    ReactGA.initialize("G-R91340SD8Y");
    ReactGA.pageview(window.location.pathname);

    return (
        <div className="App">
            <Navbar />
            <section className="page">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="course/:id" element={<CourseOverview />} />
                    <Route path="external" element={<ExteralSite />} />
                </Routes>
            </section>
        </div>
    );
}

export default App;
