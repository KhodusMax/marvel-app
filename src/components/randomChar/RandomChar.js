import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import useMarvelService from '../../services/MarvelService';


const RandomChar = () => {
    const [char, setChar] = useState({});
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [])

    const onCharLoaded = (newChar) => {
        setChar(newChar);
    }

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400-1011000) + 1011000);
        clearError()
        getCharacter(id)
            .then(onCharLoaded)
    }
    const errorMassage = error ? <ErrorMassage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="randomchar">
            {errorMassage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    let checked = '';

    if (description === '') {
        checked =  `Out of description`
    } else if (description && description.length > 50) {
        checked =  `${description.slice(0, 200)}...`;
    } else {
        checked = description;
    }

    const defultImage = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {'objectFit': 'contain'} : {'objectFit' : 'cover'};


    return ( <div className="randomchar__block">
                <img src={thumbnail} alt="Random character" style={defultImage} className="randomchar__img"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">
                        {checked}
                    </p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>)
}

export default RandomChar;