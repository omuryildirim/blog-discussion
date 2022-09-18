import {axiosWrapper} from './axiosWrapper';

export const usersService = {
    getUsers: () => axiosWrapper('get', '/api/users'),
    getUser: () => axiosWrapper('get', '/api/user')
};
