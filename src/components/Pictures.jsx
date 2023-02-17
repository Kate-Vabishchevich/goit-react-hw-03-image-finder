import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { searchPictures } from 'services/fetchAPI';
import ImageGallery from './ImageGallery/ImageGallery';
import LargeImage from './ImageGallery/LargeImage/LargeImage';
import Button from './Button/Button';
import Modal from 'services/Modal/Modal';
// import Loader from './Loader/Loader';

class Pictures extends Component {
    state = {
        pictures: [],
        search: '',
        loading: false,
        loadMore: false,
        page: 1,
        error: null,
        largeImage: null,
        showModal: false,
    };

    async fetchPictures() {
        try {
            this.setState({ loading: true });
            const { search, page } = this.state;
            const data = await searchPictures(search, page);
            this.setState(({ pictures }) => ({
                pictures: [...pictures, ...data.hits],
            }));
            this.checkData(data);
        } catch (error) {
            this.setState(error => error.message);
        } finally {
            this.setState({ loading: false });
        }
    };

    searchPictures = ({ search }) => {
        this.setState({ search, page: 1, pictures: [] });
    };
    
    checkData = ({ totalHits, hits }) => {
        const PER_PAGE = 12
        const { page } = this.state;
        if (page === 1 && totalHits !== 0) {
            this.setState({ loadMore: true });
        }
        if (totalHits === 0) {
            this.setState({ loadMore: false })
        }
        else if (hits.length < PER_PAGE) {
            alert('Oops! This is a finish, try something else')
        }
    };

    loadMore = () => {
        this.setState(({ page }) => ({
            page: page + 1,
        }));
    };

    closeModal = () => {
        this.setState({ showModal: false, largeImage: null });
    }

    render() {
        const { pictures, showModal, largeImage } = this.state;
        const { searchPictures, loadMore, closeModal } = this;
        return (
            <div>
                <Searchbar onSubmit={searchPictures} />
                <ImageGallery pictures={pictures} />
                {/* {loading && <Loader />} */}
                <Button onClick={loadMore} />
                {showModal && (<Modal close={closeModal}>
                    <LargeImage {...largeImage} />
                </Modal>)}
            </div>
        );
    }
};

export default Pictures;