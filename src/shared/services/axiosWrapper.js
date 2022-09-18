import axios from 'axios';

export const axiosWrapper = async (method, url, body) => {
    let response;

    try {
        if (method === 'post' || method === 'put') {
            response = await axios[method](url, body);
        } else {
            response = await axios[method](url);
        }

        return response.data;
    } catch (error) {
        console.log(error);
    }
};
