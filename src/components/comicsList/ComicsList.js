import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';

import './comicsList.scss';

const ComicsList = (props) => {
    
    const [comics, setComics] = useState([]);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics, clearError} = useMarvelService();

    useEffect(() => {
        updateComics(offset, true);
    }, []);

    const updateComics = (offset, initial) => {
        clearError();
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true)
        getAllComics(offset)
            .then(onComicsLoaded)
    }

    const onComicsLoaded = (newComics) => {
        let ended = false;
        if(newComics.length < 8) {
            ended = true
        }

        setComics((comics) => [...comics, ...newComics]);
        setNewComicsLoading(false);
        setOffset((offset) =>offset + 8);
        setComicsEnded(ended);
    }

    const items = useRef([]);

    const focusOnItem = (id) => {
        items.current.forEach(item => item.classList.remove('char__item_selected'));
        items.current[id].classList.add('char__item_selected');
        items.current[id].focus();
    }

        const {onSelectedComics} = props;

        const toRender = comics.map((comics, i) => {
            const {id, title, description, pageCount, thumbnail, language, price} = comics;

            return (
                <li className="comics__item"
                tabIndex={0} 
                key={id}
                id={id}
                onClick={() => {
                    onSelectedComics(id);
                    focusOnItem(i)
                }}
                onKeyPress={(e) => {
                    if (e.key === ' ' || e.key === "Enter") {
                        onSelectedComics(id);
                        focusOnItem(i);
                    }}}
                ref={elem => items.current[i] = elem}>
                    <a href="#">
                        <img src={thumbnail} alt={title} className="comics__item-img"/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </a>
                </li>
            )
        })

    const errorMassage = error ? <ErrorMassage/> : null;
    const spinner = loading && !newComicsLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMassage}
            {spinner}
            <ul className="comics__grid">
                {toRender}
            </ul>
            <button className="button button__main button__long"
            onClick={() => updateComics(offset)}
            disabled={newComicsLoading}
            style={{display: comicsEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

ComicsList.propTypes = {
    onSelectedChar: PropTypes.func
}

export default ComicsList;