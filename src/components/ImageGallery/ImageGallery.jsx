import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({webformatURL, tags}) => {
    return (
        <li className={css.item}>
            <img
                className={css.img}
                src={webformatURL}
                alt={tags}
            />
        </li>
    );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
}