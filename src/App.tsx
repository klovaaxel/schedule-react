import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/navbar/navbar";
import { About } from "./pages/about/about";
import { Home } from "./pages/home/home";
import "react-widgets/scss/styles.scss";

function App() {
    return (
        <div className="App">
            <Navbar />
            <section className="page">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="about" element={<About />} />
                </Routes>
            </section>
        </div>
    );
}

export default App;
