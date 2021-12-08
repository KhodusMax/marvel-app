import { useState } from "react";

import ComicsList from "../comicsList/ComicsList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBannet from '../appBanner/AppBanner';

const ComicsPage = () => {
    const [selectedComics, setSelectedComics] = useState(null);

    const onSelectedComics = (id) => {
        setSelectedComics(id);
    }

    return (
        <>
            <AppBannet/>
            <ErrorBoundary>
                <ComicsList onSelectedComics={onSelectedComics}/>
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage;