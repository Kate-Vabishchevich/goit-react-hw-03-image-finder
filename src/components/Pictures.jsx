import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { searchPictures } from 'services/fetchAPI';
import ImageGallery from './ImageGallery/ImageGallery';

class Pictures extends Component {
    state = {
        pictures: [],
        search: '',
        loading: false,
        loadMore: false,
        page: 1,
        error: null,
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

    render() {
        const { pictures } = this.state;
        const { searchPictures } = this;
        return (
            <div>
                <Searchbar onSubmit={searchPictures} />
                <ImageGallery pictures={pictures} />
            </div>
        );
    }
};

export default Pictures;