import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { searchPictures } from 'services/fetchAPI';
import ImageGallery from './ImageGallery/ImageGallery';
import LargeImage from './ImageGallery/LargeImage/LargeImage';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

class Pictures extends Component {
    state = {
        pictures: [],
        search: '',
        status: 'idle',
        loadMore: false,
        page: 1,
        totalPages: null,
        per_page: 12,
        error: null,
        largeImage: null,
        showModal: false,
    };

    async componentDidUpdate(prevProps, prevState) {
        const { search, page, totalPages, per_page } = this.state;
        if (prevState.search !== search || prevState.page !== page) {
            try {
                this.setState({ status: 'pending' });
                const data = await searchPictures(search, page, per_page);
                this.setState(({ pictures }) => ({
                    pictures: [...pictures, ...data.hits],
                    totalPages: Math.ceil(data.totalHits / per_page),
                    status: 'resolved',
                }));
            } catch (error) {
                this.setState({ status: 'rejected' });
                this.setState(error => error.message);
            }
        }
    };

    // async fetchPictures() {
    //     try {
    //         this.setState({ loading: true });
    //         const { search, page } = this.state;
            
    //         const data = await searchPictures(search, page);
    //         this.setState(({ pictures }) => ({
    //             pictures: [...pictures, ...data.hits],
    //         }));
    //         this.checkData(data);
    //     } catch (error) {
    //         this.setState(error => error.message);
    //     } finally {
    //         this.setState({ loading: false });
    //     }
    // };

    searchPictures = ({ search }) => {
        if (search === '') {
            alert('Searchfield is empty. Please, enter your request.');
      return;
        } if (search !== this.state.value) {
            this.setState({ search, page: 1, pictures: [] });
        }
    };
    
    // checkData = ({ totalHits, hits }) => {
    //     const PER_PAGE = 12
    //     const { page } = this.state;
    //     if (page === 1 && totalHits !== 0) {
    //         this.setState({ loadMore: true });
    //     }
    //     if (totalHits === 0) {
    //         this.setState({ loadMore: false })
    //     }
    //     else if (hits.length < PER_PAGE) {
    //         alert('Oops! This is a finish, try something else')
    //     }
    // };

    showPicture = ({ largeImageURL }) => {
        this.setState({
            largeImage: { largeImageURL },
            showModal: true,
        });
    }

    loadMore = () => {
        this.setState(({ page }) => ({
            page: page + 1,
        }));
    };

    closeModal = () => {
        this.setState({ showModal: false, largeImage: null });
    }

    render() {
        const { pictures, showModal, largeImage, error, status
        } = this.state;
        const { searchPictures, loadMore, showPicture, closeModal } = this;
        return (
            <div>
                <Searchbar onSubmit={searchPictures} />
                <ImageGallery pictures={pictures} showPicture={ showPicture} />
                {status === 'pending' && <Loader />}
                {error && <p>Whoops, something went wrong: </p>}
                {pictures.length > 0 && <Button onClick={loadMore} />}
                {showModal && (<Modal onClose={closeModal}>
                    <LargeImage {...largeImage} />
                </Modal>)}
            </div>
        );
    }
};

export default Pictures;