import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import useMarvelService from '../../../services/MarvelService';


import Spinner from '../../spinner/Spinner';
import ErrorMassage from '../../errorMassage/ErrorMassage';
import AppBanner from '../../appBanner/AppBanner';

import './singleCharPage.scss';


const SingleCharPage = () => {
    const {charId} = useParams();
    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [charId])

    const updateChar = () => {
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const errorMassage = error ? <ErrorMassage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <>
            <AppBanner/>
            {spinner}
            {errorMassage}
            {content}
        </>
    )
}

const View = ({char}) => {
    const {name, thumbnail, description} = char;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__char-img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
        </div>
    )
}

export default SingleCharPage;