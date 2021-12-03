import './charInfo.scss';

import { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';

class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(preProps) {
        if (preProps !== this.props) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const {selectedChar} = this.props

        if (!selectedChar) {
            return;
        }

        this.onCharLoading()
        
        this.marvelService
            .getCharacter(selectedChar)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        });
    }
    
    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = (err) => {
        console.log(err)
        this.setState({
            loading: false,
            error: true
        })
    }

    render() {
        const {char, error, loading} = this.state
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
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    let checkedDescription = ''

    if (description === 'undefined' || description === '') {
        checkedDescription =  `Out of description`
    } else {
        checkedDescription = description;
    }

    const defultImage = thumbnail.indexOf('image_not_available') > -1 ? {'objectFit': 'contain'} : null;

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