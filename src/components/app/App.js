<<<<<<< HEAD
=======
// import { useState } from "react";
>>>>>>> 6fc580411bcdbbebeb8d5cc8e2208f835005dfdf
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import CharsPage from "../pages/CharsPage";
import ComicsPage from "../pages/ComicsPage";
import SingleComicPage from "../pages/singleComicPage/SingleComicPage";
import ErrorMassage from "../errorMassage/ErrorMassage";

const App = () => {

    return (
        <div className="app">
            <Router>
                <AppHeader/>
                <main>
                    <Routes>
                            <Route path='/' element={<CharsPage/>}/>
                            <Route path='comics' element={<ComicsPage/>}/>
                            <Route path='comics/:comicId' element={<SingleComicPage/>}/>
                            <Route path='*' element={<ErrorMassage/>}/>
                    </Routes>
                </main>
            </Router>
        </div>
    )
}

export default App;