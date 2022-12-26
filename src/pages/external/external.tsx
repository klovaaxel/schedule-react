import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import "./external.scss";

const ExteralSite = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [searchParams] = useSearchParams();

    const titleParam: string | null = searchParams.get("title");
    const title: string = titleParam ? titleParam : "";

    const urlParam: string | null = searchParams.get("url");
    const url: string = urlParam ? urlParam : "";

    useEffect(() => {
        dispatch({
            type: "CHANGE_PAGE",
            value: {
                currentPageTitle: t(title),
                currentPage: title,
            },
        });
    }, [dispatch, t, title, searchParams]);

    return (
        <section className="external">
            <iframe title={title} src={url} />
        </section>
    );
};

export default ExteralSite;
