import './charList.scss';

import { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {

    state = {
        chars: [],
        loading: true,
        error: false,
        newCharsLoding: false,
        offset: 210,
        charsEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChars();
    }

    updateChars = (offset) => {
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharsLoaded)
            .catch(this.onError)
    }

    onCharsLoding = () => {
        this.setState({
            newCharsLoding: true
        })
    }

    onCharsLoaded = (newChars) => {
        let ended = false;
        if(newChars.length < 9) {
            ended = true
        }

        this.setState(({offset, chars}) => ({
            chars: [...chars, ...newChars],
            loading: false,
            newCharsLoding: false,
            offset: offset + 9,
            charsEnded: ended
        }));
    }

    charSelect = (elem) => {
        const {onSelectedChar} = this.props;

        console.log(elem.target.parentElement)
        onSelectedChar(1011101)
        
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    items = [];

    setRef = (ref) => {
        this.items.push(ref);
    }

    focusOnItem = (id) => {
        this.items.forEach(item => item.classList.remove('char__item_selected'));
        this.items[id].classList.add('char__item_selected');
        this.items[id].focus();
    }

    render() {
        const {chars, loading, error, offset, newCharsLoding, charsEnded} = this.state;
        const {onSelectedChar} = this.props;

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
                        this.focusOnItem(i)
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            onSelectedChar(id);
                            this.focusOnItem(i);
                        }}}
                    ref={this.setRef}>
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
                onClick={() => this.updateChars(offset)}
                disabled={newCharsLoding}
                style={{display: charsEnded ? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func
}

export default CharList;