import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import "./back-button.scss";

const BackButton = () => {
    const { t } = useTranslation();

    return (
        <button
            className="btn back"
            type="button"
            onClick={() => window.history.back()}
        >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>{t("go-back")}</span>
        </button>
    );
};

export default BackButton;
