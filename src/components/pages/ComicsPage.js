import ComicsList from "../comicsList/ComicsList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBannet from '../appBanner/AppBanner';

const ComicsPage = () => {

    return (
        <>
            <AppBannet/>
            <ErrorBoundary>
                <ComicsList/>
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage;