import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";


const CharsPage = lazy(() => import('../pages/CharsPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/singleComicPage/SingleComicPage'));
const SingleCharPage = lazy(() => import('../pages/singleCharPage/SingleCharPage'))
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
                            <Route path='characters/:charId' element={<SingleCharPage/>}/>
                            <Route path='*' element={<PageNotFound/>}/>
                        </Routes>
                    </main>
                </Router>
             </div>
        </Suspense>
    )
}

export default App;