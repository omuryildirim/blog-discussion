import axios from 'axios';

export const axiosWrapper = async (method, url, body) => {
    let response;

    try {
        if (method === 'post' || method === 'put' || method === 'patch') {
            response = await axios[method](url, body);
        } else {
            response = await axios[method](url);
        }

        return response.data;
    } catch (error) {
        // TODO: Can show an actual error in UI, like a snackbar message
        console.log(error);
    }
};
