import { Link } from "react-router-dom";
import "./footer.scss";

const Footer = () => {
    return (
        <footer className="main-footer">
            <Link to="Privacy-Policy/"> Privacy policy</Link>
        </footer>
    );
};

export default Footer;
