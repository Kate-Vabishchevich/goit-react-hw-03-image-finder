import axios from "axios";

const instance = axios.create({
    baseURL: 'https://pixabay.com/api/',
    params: {
        key: '32106886-cb1cc02bd30eab36270ed5df7',
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: '12',
    },
});

export const searchPictures = async () => {
    const result = await instance.get();
    return result;
}