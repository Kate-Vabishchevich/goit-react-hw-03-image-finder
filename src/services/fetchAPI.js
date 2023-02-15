import axios from "axios";

const API_KEY = "32106886-cb1cc02bd30eab36270ed5df7";

const instance = axios.create({
    baseURL: 'https://pixabay.com/api/',
    params: {
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: '12',
    },
});

export const searchPictures = async (q, page = 1) => {
    const { data } = await instance.get('/', {
        params: {
            q,
            page
        },
    });
    return data;
};