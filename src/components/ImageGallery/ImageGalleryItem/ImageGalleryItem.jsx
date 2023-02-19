import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import { Component } from 'react';
import Modal from 'components/Modal/Modal';

class ImageGalleryItem extends Component {
    state = {
        isOpen: false,
    };
    handleModal = () => { this.setState(({ isOpen }) => ({ isOpen: !isOpen })); };


    render() {
        const { webformatURL, largeImageURL, tags} = this.props;

        return (
            <li className={css.item}>
                <img
                    src={webformatURL}
                    alt={tags}
                    source={largeImageURL}
                    className={css.img}
                    onClick={this.handleModal}
                />
                {this.state.isOpen && (
                    <Modal
                        largeImageURL={largeImageURL}
                        onClose={this.handleModal}
                    />
                )}
            </li>
        );
    }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
}