import './charInfo.scss';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';

const CharInfo = (props) => {

    // state = {
    //     char: null,
    //     loading: false,
    //     error: false
    // }
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    // componentDidMount() {
    //     this.updateChar();
    // }

    useEffect(() => {
        updateChar()
    }, [props])

    // componentDidUpdate(preProps) {
    //     if (preProps !== this.props) {
    //         this.updateChar();
    //     }
    // }

    const updateChar = () => {
        const {selectedChar} = props

        if (!selectedChar) {
            return;
        }

        onCharLoading()
        
        marvelService
            .getCharacter(selectedChar)
            .then(onCharLoaded)
            .catch(onError)
    }

    const onCharLoaded = (char) => {
        // this.setState({
        //     char,
        //     loading: false
        // });
        setChar(char);
        setLoading(false);
    }
    
    const onCharLoading = () => {
        // this.setState({
        //     loading: true
        // })
        setLoading(true);
    }

    const onError = (err) => {
        console.log(err)
        // this.setState({
        //     loading: false,
        //     error: true
        // })
        setLoading(false);
        setError(true);
    }

    const errorMassage = error ? <ErrorMassage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;
    const skeleton = char || loading || error  ? null : <Skeleton/>;

    return (
        <div className="char__info">
            {skeleton}
            {errorMassage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    let checkedDescription = ''

    if (description === '') {
        checkedDescription =  `Out of description`
    } else {
        checkedDescription = description;
    }

    const defultImage = thumbnail.indexOf('image_not_available') > -1 ? {'objectFit': 'contain'} : {'objectFit' : 'cover'};

    const comicsRender = comics.map((elem, i) => {
        return (
            <li className="char__comics-item" key={i}>
                {elem.name}
            </li>
        )
    })

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} style={defultImage} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {checkedDescription}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {comicsRender}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    selectedChar: PropTypes.number
}

export default CharInfo;