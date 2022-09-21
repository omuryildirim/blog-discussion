import {usersService} from './usersService';
import axios from 'axios';

jest.mock('axios');

describe('usersService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should make getUsers request', async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve({data: 'test-data'}));

        const response = await usersService.getUsers();

        expect(axios.get).toHaveBeenCalledWith('/api/users');
        expect(response).toEqual('test-data');
    });

    it('should make getUser request', async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve({data: 'test-data'}));

        const response = await usersService.getUser();

        expect(axios.get).toHaveBeenCalledWith('/api/user');
        expect(response).toEqual('test-data');
    });
});
