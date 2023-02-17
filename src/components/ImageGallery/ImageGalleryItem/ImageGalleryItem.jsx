import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, tags, onClick }) => {
    return (
        <li className={css.item} onClick={onClick}>
            <img
                className={css.img}
                src={webformatURL}
                alt={tags} />
        </li>
    );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
}