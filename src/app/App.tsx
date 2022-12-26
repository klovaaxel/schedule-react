import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Navbar from "../components/navbar/navbar";
import "react-widgets/scss/styles.scss";
import CourseOverview from "../pages/course-overview/course-overview";
import ExteralSite from "../pages/external/external";
import ReactGA from "react-ga4";
import { PrivacyPolicy } from "../pages/privacy-policy/privacy-policy";
import Footer from "../components/footer/footer";
import SchedulesOverview from "../pages/schedules-overview/scheudles-overview";
import Assignment from "../pages/assignment/assignment";

function App() {
    ReactGA.initialize("G-R91340SD8Y");
    ReactGA.pageview(window.location.pathname);

    return (
        <div className="App">
            <Navbar />
            <section className="page">
                <Routes>
                    <Route path="/" element={<SchedulesOverview />} />
                    <Route path="course/:id" element={<CourseOverview />} />
                    <Route path="external" element={<ExteralSite />} />
                    <Route path="privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="assignment" element={<Assignment />} />
                </Routes>
            </section>
            <Footer />
        </div>
    );
}

export default App;
