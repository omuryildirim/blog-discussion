import {commentsService} from './commentsService';
import axios from 'axios';

jest.mock('axios');

describe('commentsService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should make getComments request', async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve({data: 'test-data'}));

        const response = await commentsService.getComments();

        expect(axios.get).toHaveBeenCalledWith('/api/comments');
        expect(response).toEqual('test-data');
    });

    it('should make getReplies request', async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve({data: 'test-data'}));

        const response = await commentsService.getReplies();

        expect(axios.get).toHaveBeenCalledWith('/api/replies');
        expect(response).toEqual('test-data');
    });

    it('should make upvoteComment request', async () => {
        axios.post.mockImplementationOnce(() => Promise.resolve({data: 'test-data'}));

        const response = await commentsService.upvoteComment({commentId: 'mock-comment-id', userId: 'mock-user-id'});

        expect(axios.post).toHaveBeenCalledWith('/api/comment/mock-comment-id/upvote', {upvoter: 'mock-user-id'});
        expect(response).toEqual('test-data');
    });

    it('should make reply request', async () => {
        axios.post.mockImplementationOnce(() => Promise.resolve({data: 'test-data'}));

        const response = await commentsService.reply({parentCommentId: 'mock-parent-comment-id', message: 'mock-message', userId: 'mock-user-id'});

        expect(axios.post).toHaveBeenCalledWith('/api/comment/mock-parent-comment-id/reply', {message: 'mock-message', userId: 'mock-user-id'});
        expect(response).toEqual('test-data');
    });

    it('should make addComment request', async () => {
        axios.post.mockImplementationOnce(() => Promise.resolve({data: 'test-data'}));

        const response = await commentsService.addComment({message: 'mock-message', userId: 'mock-user-id'});

        expect(axios.post).toHaveBeenCalledWith('/api/comment', {message: 'mock-message', userId: 'mock-user-id'});
        expect(response).toEqual('test-data');
    });
});
