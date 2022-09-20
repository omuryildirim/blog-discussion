import '@testing-library/jest-dom';
import React from 'react';
import {AddComment} from './index';
import {fireEvent, render, screen, act} from '@testing-library/react';
import {theme} from '../../../theme';
import {ThemeProvider} from '@mui/material';
import {mockUser, mockUsers} from '../../../../__mocks__/users';
import {mockComments, mockReplies} from '../../../../__mocks__/comments';
import {CommentsContext, UsersContext} from '../../contexts';
import * as services from '../../services';

jest.mock('../../services');

const defaultProps = {isReply: false, parentCommentId: 'mock-parent-comment-id', isParentReply: false, setIsReplyEnabled: jest.fn()};
const usersContextValue = {users: mockUsers, setUsers: jest.fn(), user: mockUser, setUser: jest.fn()};
const commentsContextValue = {comments: mockComments, setComments: jest.fn(), replies: mockReplies, setReplies: jest.fn()};

describe('AddComment', () => {
    const componentWithContext = (props) => {
        return (
            <ThemeProvider theme={theme}>
                <UsersContext.Provider value={usersContextValue}>
                    <CommentsContext.Provider value={commentsContextValue}>
                        <AddComment {...props} />
                    </CommentsContext.Provider>
                </UsersContext.Provider>
            </ThemeProvider>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render', () => {
        const component = render(componentWithContext(defaultProps));

        expect(screen.getByTestId('add-comment-container')).toBeVisible();

        component.unmount();
    });

    it('should add comment', async () => {
        services.commentsService.addComment.mockImplementationOnce(({message}) => Promise.resolve(message));

        const component = render(componentWithContext(defaultProps));

        await act(async () => {
            await fireEvent.change(screen.getByTestId('message-input'), {target: {value: 'Test Message'}});
            await fireEvent.click(screen.getByTestId('send-comment-button'));
        });

        expect(commentsContextValue.setComments).toHaveBeenCalledWith(['Test Message', ...mockComments]);

        component.unmount();
    });

    it('should add reply to a comment', async () => {
        services.commentsService.reply.mockImplementationOnce(({message}) => Promise.resolve({comment: {...mockComments[1], replies: ['test-reply']}, reply: {...mockComments[1], message, isReply: true, _id: 'test-reply'}}));

        const component = render(componentWithContext({...defaultProps, isReply: true}));

        await act(async () => {
            await fireEvent.change(screen.getByTestId('message-input'), {target: {value: 'Test Message'}});
            await fireEvent.click(screen.getByTestId('send-comment-button'));
        });

        expect(commentsContextValue.setReplies).toHaveBeenCalledWith({...mockReplies, 'test-reply': {...mockComments[1], message: 'Test Message', isReply: true, _id: 'test-reply'}});
        expect(commentsContextValue.setComments).toHaveBeenCalledWith([mockComments[0], {...mockComments[1], replies: ['test-reply']}]);

        component.unmount();
    });

    it('should add reply to a reply', async () => {
        services.commentsService.reply.mockImplementationOnce(({message}) => Promise.resolve({comment: mockComments[1], reply: {...mockComments[1], message, isReply: true, _id: 'test-reply'}}));

        const component = render(componentWithContext({...defaultProps, isReply: true, isParentReply: true}));

        await act(async () => {
            await fireEvent.change(screen.getByTestId('message-input'), {target: {value: 'Test Message'}});
            await fireEvent.click(screen.getByTestId('send-comment-button'));
        });

        expect(commentsContextValue.setReplies).toHaveBeenCalledWith({
            ...mockReplies,
            'test-reply': {...mockComments[1], message: 'Test Message', isReply: true, _id: 'test-reply'},
            [mockComments[1]._id]: mockComments[1]
        });

        component.unmount();
    });
});
