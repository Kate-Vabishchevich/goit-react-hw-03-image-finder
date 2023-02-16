import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ pictures, showPicture }) => {
    const elements = pictures.map(({ id, largeImageURL, webformatURL, tags }) => (
        <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            tags={tags}
            onClick={() => showPicture({ largeImageURL })}
        />
    ));

    return <ul className={css.image_gallery}>{elements}</ul>
};

export default ImageGallery;

ImageGallery.propTypes = {
    pictures: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            webformatURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
        })
    ),
    showPicture: PropTypes.func.isRequired,
};