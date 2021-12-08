import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import CharsPage from "../pages/CharsPage";
import ComicsPage from "../pages/ComicsPage";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBannet from '../appBanner/AppBanner'

import decoration from '../../resources/img/vision.png';
import ComicsList from "../comicsList/ComicsList";

const App = () => {
    // const [selectedChar, setSelectedChar] = useState(null)
    // const [selectedComics, setSelectedComics] = useState(null);

    // const onSelectedChar = (id) => {
    //     setSelectedChar(id)
    // }

    // const onSelectedComics = (id) => {
    //     setSelectedComics(id);
    // }

    return (
        <div className="app">
            <Router>
                <AppHeader/>
                <main>
                    <Routes>
                            <Route path='/' element={<CharsPage/>}/>
                            <Route path='comics' element={<ComicsPage/>}/>
                    </Routes>
                </main>
            </Router>
        </div>
    )
}

export default App;