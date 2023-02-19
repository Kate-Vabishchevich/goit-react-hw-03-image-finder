import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { searchPictures } from 'services/fetchAPI';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

class Pictures extends Component {
    state = {
        pictures: [],
        search: '',
        isLoading: false,
        page: 1,
        total: 0,
        error: null,
    };

    async componentDidUpdate(prevProps, prevState) {
        const { search, page } = this.state;
        if (prevState.search !== search || prevState.page !== page) {
            try {
                this.setState({ isLoading: true });
                const data = await searchPictures(search, page);
                this.setState(({ pictures }) => ({
                    pictures: [...pictures, ...data.hits],
                    total: data.totalHits,
                }));
            } catch (error) {
                this.setState(error => error.message);
            }
            finally {
                this.setState({ isLoading: false });
            }
        }
    };

    searchPictures = ({ search }) => {
        if (search !== this.state.value) {
            this.setState({ search, page: 1, pictures: [] });
        }
    };

    loadMore = () => {
        this.setState(({ page }) => ({
            page: page + 1,
        }));
    };

    render() {
        const { pictures, error, isLoading, total } = this.state;
        const { searchPictures, loadMore } = this;
        const totaPage = pictures.length / total;
        return (
            <div>
                <Searchbar onSubmit={searchPictures} />
                <ImageGallery pictures={pictures} />
                {error && <p>Whoops, something went wrong. Please, refresh the page </p>}
                {totaPage < 1 && !isLoading && <Button onClick={loadMore} />}
                {isLoading && <Loader />}
            </div>
        );
    }
};

export default Pictures;