import { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

class Searchbar extends Component {
    state = {
        search: '',
    }

    handleSubmit = e => {
        e.preventDefault();
        const { onSubmit } = this.props;
         if (this.state.search.trim() === '') {
             return alert('Searchfield is empty. Please, enter your request.');
        } 
        onSubmit({ ...this.state });
        this.reset();
    }

    reset() {
        this.setState({ search: '' });
    }

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({[name]: value});
    }

    render() {
        const { search } = this.state;
        const { handleSubmit, handleChange } = this;
        return (
        <header className={css.searchbar}>
            <form className={css.form} onSubmit={handleSubmit}>
                <button type="submit" className={css.button}>
                        <span className={css.button_label}></span>
                        <AiOutlineSearch size="24px" />
                </button>

                <input
                    className={css.input}
                    onChange={handleChange}
                    value={search}
                    name="search"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>);
    }
};

export default Searchbar;

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}