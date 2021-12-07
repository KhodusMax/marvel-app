import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBannet from '../appBanner/AppBanner'

import decoration from '../../resources/img/vision.png';
import ComicsList from "../comicsList/ComicsList";

const App = () => {
    const [selectedChar, setSelectedChar] = useState(null)
    const [selectedComics, setSelectedComics] = useState(null);

    const onSelectedChar = (id) => {
        setSelectedChar(id)
    }

    const onSelectedComics = (id) => {
        setSelectedComics(id);
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/* <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onSelectedChar={onSelectedChar}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo selectedChar={selectedChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/> */}
                <AppBannet/>
                <ErrorBoundary>
                    <ComicsList onSelectedComics={onSelectedComics}/>
                </ErrorBoundary>
            </main>
        </div>
    )
}

export default App;