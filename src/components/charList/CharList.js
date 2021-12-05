import './charList.scss';

import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import MarvelService from '../../services/MarvelService';

const CharList = (props) => {

    const [chars, setChars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newCharsLoading, setNewCharsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charsEnded, setCharsEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChars();
    }, []);

    const updateChars = (offset) => {
        onCharsLoding();
        marvelService
            .getAllCharacters(offset)
            .then(onCharsLoaded)
            .catch(onError)
    }

    const onCharsLoding = () => {
        setNewCharsLoading(() => true);
    }

    const onCharsLoaded = (newChars) => {
        let ended = false;
        if(newChars.length < 9) {
            ended = true
        }

        setChars((chars) => [...chars, ...newChars]);
        setLoading(() => false);
        setNewCharsLoading(() => false);
        setOffset((offset) =>offset + 9);
        setCharsEnded(() => ended);
    }

    const onError = () => {
        setError(() => true);
        setLoading(() => false);
    }

    const items = useRef([]);

    const focusOnItem = (id) => {
        items.current.forEach(item => item.classList.remove('char__item_selected'));
        items.current[id].classList.add('char__item_selected');
        items.current[id].focus();
    }

    const {onSelectedChar} = props;

    const toRender = chars.map((char, i) => {
        const {name, id, thumbnail} = char;
        const defultImage = thumbnail.indexOf('image_not_available') > -1 ? {'objectFit': 'contain'} : null;

        return (
            <li 
                className="char__item"
                tabIndex={0} 
                key={id}
                id={id}
                onClick={() => {
                    onSelectedChar(id);
                    focusOnItem(i)
                }}
                onKeyPress={(e) => {
                    if (e.key === ' ' || e.key === "Enter") {
                        onSelectedChar(id);
                        focusOnItem(i);
                    }}}
                ref={elem => items.current[i] = elem}>
                <img src={thumbnail} alt={name}  style={defultImage}/>
                <div className="char__name">{name}</div>
            </li>
        )
    })

    const errorMassage = error ? <ErrorMassage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? toRender : null;

    return (
        <div className="char__list">
            {errorMassage}
            {spinner}
            <ul className="char__grid">
                {content}
            </ul>
            <button className="button button__main button__long"
            onClick={() => updateChars(offset)}
            disabled={newCharsLoading}
            style={{display: charsEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func
}

export default CharList;