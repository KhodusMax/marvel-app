import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
// import CharsPage from "../pages/CharsPage";
// import ComicsPage from "../pages/ComicsPage";
// import SingleComicPage from "../pages/singleComicPage/SingleComicPage";
// import PageNotFound from "../pages/404";

const CharsPage = lazy(() => import('../pages/CharsPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/singleComicPage/SingleComicPage'));
const PageNotFound = lazy(() => import('../pages/404'));

const App = () => {

    return (
        <Suspense fallback={<Spinner/>}>
            <div className="app">
                <Router>
                    <AppHeader/>
                    <main>
                        <Routes>
                            <Route path='/' element={<CharsPage/>}/>
                            <Route path='comics' element={<ComicsPage/>}/>
                            <Route path='comics/:comicId' element={<SingleComicPage/>}/>
                            <Route path='*' element={<PageNotFound/>}/>
                        </Routes>
                    </main>
                </Router>
             </div>
        </Suspense>
    )
}

export default App;