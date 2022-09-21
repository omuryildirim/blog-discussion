import '@testing-library/jest-dom';
import React from 'react';
import {Comment} from './index';
import {fireEvent, render, screen, act} from '@testing-library/react';
import {theme} from '../../../theme';
import {ThemeProvider} from '@mui/material';
import {mockUser, mockUsers} from '../../../../__mocks__/users';
import {mockComments, mockReplies} from '../../../../__mocks__/comments';
import {CommentsContext, UsersContext} from '../../contexts';
import * as services from '../../services';
import {UpvoteEvent} from '../../constants';

jest.mock('../../services');

const defaultProps = {comment: mockComments[1], sendMessageToWebSocket: jest.fn()};
const usersContextValue = {users: mockUsers, setUsers: jest.fn(), user: mockUser, setUser: jest.fn()};
const commentsContextValue = {comments: mockComments, setComments: jest.fn(), replies: mockReplies, setReplies: jest.fn()};

describe('Comment', () => {
    const componentWithContext = (props) => {
        return (
            <ThemeProvider theme={theme}>
                <UsersContext.Provider value={usersContextValue}>
                    <CommentsContext.Provider value={commentsContextValue}>
                        <Comment {...props} />
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

        expect(screen.getByTestId('comment-wrapper')).toBeVisible();

        component.unmount();
    });

    it('should render comment with reply and upvotes', () => {
        const component = render(componentWithContext({...defaultProps, comment: mockComments[0]}));

        expect(screen.getAllByTestId('comment-wrapper').length).toEqual(2);

        component.unmount();
    });

    it('should render number of upvotes and upvoted text if user is upvoted', () => {
        const component = render(componentWithContext({...defaultProps, comment: mockComments[0]}));

        expect(screen.getByText('1')).toBeVisible();
        expect(screen.getByText('Upvoted')).toBeVisible();

        component.unmount();
    });

    it('should open reply section', () => {
        const component = render(componentWithContext(defaultProps));

        fireEvent.click(screen.getByTestId('reply-button'));

        expect(screen.getByTestId('add-comment-container')).toBeVisible();

        component.unmount();
    });

    it('should upvote a comment', async () => {
        services.commentsService.upvoteComment.mockResolvedValueOnce({...mockComments[1], upvotes: ['test-id']});

        const component = render(componentWithContext(defaultProps));

        await act(async () => {
            fireEvent.click(screen.getByTestId('upvote-button'));
        });

        expect(commentsContextValue.setComments).toHaveBeenCalledWith([mockComments[0], {...mockComments[1], upvotes: ['test-id']}]);
        expect(defaultProps.sendMessageToWebSocket).toHaveBeenCalledWith({
            event: UpvoteEvent,
            comment: {...mockComments[1], upvotes: ['test-id']}
        });

        component.unmount();
    });

    it('should upvote a reply', async () => {
        const reply = mockReplies['6328389375b9cc8ddf876885'];
        services.commentsService.upvoteComment.mockResolvedValueOnce({...reply, upvotes: ['test-id']});

        const component = render(componentWithContext({...defaultProps, comment: reply}));

        await act(async () => {
            fireEvent.click(screen.getByTestId('upvote-button'));
        });

        expect(commentsContextValue.setReplies).toHaveBeenCalledWith({...mockReplies, [reply._id]: {...reply, upvotes: ['test-id']}});

        component.unmount();
    });
});
