import { Helmet } from "react-helmet";

import ComicsList from "../comicsList/ComicsList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBannet from '../appBanner/AppBanner';

const ComicsPage = () => {

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="page with Marvel comics"
                />
                <title>Marvel comics page</title>
            </Helmet>
            <AppBannet/>
            <ErrorBoundary>
                <ComicsList/>
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage;