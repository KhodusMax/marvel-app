import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import MarvelService from '../../services/MarvelService';


const RandomChar = (props) => {

    // state = {
    //     char: {},
    //     loading: true,
    //     error: false
    // }

    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
    }, [])

    // componentDidMount() {
    //     this.updateChar();
    // }

    const onCharLoaded = (char) => {
        // this.setState({
        //     char,
        //     loading: false
        // });
        setChar(() => char);
        setLoading(() => false);
    }
    
    const onCharLoading = () => {
        // this.setState({
        //     loading: true
        // })
        setLoading(() => true);
    }

    const onError = () => {
        // this.setState({
        //     loading: false,
        //     error: true
        // })
        setLoading(() => false);
        setError(() => true)
    }

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400-1011000) + 1011000);
        onCharLoading()
        marvelService
            .getCharacter(id)
            .then(onCharLoaded)
            .catch(onError)
    }

    const errorMassage = error ? <ErrorMassage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;

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
    let checked = ''

    if (description === 'undefined' || description === '') {
        checked =  `Out of description`
    } else if (description.length > 50) {
        checked =  `${description.slice(0, 200)}...`;
    } else {
        checked = description;
    }

    const defultImage = thumbnail.indexOf('image_not_available') > -1 ? {'objectFit': 'contain'} : null;

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