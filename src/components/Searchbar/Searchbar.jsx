import { Component } from 'react';
import css from './Searchbar.module.css';

class Searchbar extends Component {

    render() {
        return (
        <header className={css.searchbar}>
            <form className={css.form}>
                <button type="submit" className={css.button}>
                    <span className={css.button_label}>Search</span>
                </button>

                <input
                    className={css.input}
                    type="text"
                    autocomplete="off"
                    autofocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>);
    }
};

export default Searchbar;