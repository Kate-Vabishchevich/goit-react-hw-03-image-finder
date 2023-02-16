import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, tags, onClick }) => {
    return (
        <li className={css.gallery_item} onClick={onClick}>
            <img
                className={css.gallery_img}
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