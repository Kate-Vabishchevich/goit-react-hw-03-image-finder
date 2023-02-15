import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';

class Pictures extends Component {
    state = {
        pictures: [],
        search: '',
    };

    searchPictures = ({search}) => {
        this.setState({ search, page: 1, pictures: [] });
}
    render() {
        const { searchPictures } = this;
        return (
            <div>
                <Searchbar onSubmit={ searchPictures} />
            </div>
        );
    }
};

export default Pictures;