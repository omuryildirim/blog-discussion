import '@testing-library/jest-dom';
import React from 'react';
import websocket from '../shared/clients/websocket';
import {render, screen} from '@testing-library/react';
import Discussion from './index';
import {CommentsContext, UsersContext} from '../shared/contexts';
import {mockComments, mockReplies} from '../../__mocks__/comments';
import {mockUser, mockUsers} from '../../__mocks__/users';
import {ThemeProvider} from '@mui/material';
import {theme} from '../theme';
import {updateComment} from '../shared/utils/helpers';
import {UpvoteEvent} from '../shared/constants';

jest.mock('../shared/clients/websocket');
jest.mock('../shared/utils/helpers');

describe('Discussion', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render loading state', () => {
        // Resolve requests with empty data
        websocket.mockReturnValueOnce(jest.fn());

        const component = render(<Discussion />);

        // check if discussion component is rendered
        expect(screen.getByTestId('loading-wrapper')).toBeVisible();

        component.unmount();
    });

    it('should render comments if they are provided', () => {
        // Resolve requests with empty data
        websocket.mockReturnValueOnce(jest.fn());

        const usersContextValue = {users: mockUsers, setUsers: jest.fn(), user: mockUser, setUser: jest.fn()};
        const commentsContextValue = {comments: mockComments, setComments: jest.fn(), replies: mockReplies, setReplies: jest.fn()};

        const component = render(
            <ThemeProvider theme={theme}>
                <UsersContext.Provider value={usersContextValue}>
                    <CommentsContext.Provider value={commentsContextValue}>
                        <Discussion />
                    </CommentsContext.Provider>
                </UsersContext.Provider>
            </ThemeProvider>
        );

        // check if discussion component is rendered
        expect(screen.getByTestId('discussion-wrapper')).toBeVisible();

        component.unmount();
    });

    it('should execute onMessageReceive function', () => {
        // Execute input function
        websocket.mockImplementationOnce(inputFunction => inputFunction({event: UpvoteEvent, comment: {isReply: true, _id: 'mock-id'}}) ||
            inputFunction({event: UpvoteEvent, comment: {isReply: false, _id: 'mock-id'}}));

        const setRepliesMock = jest.fn();
        const component = render(
            <CommentsContext.Provider value={{comments: mockComments, setComments: 'mock-set-comments', replies: mockReplies, setReplies: setRepliesMock}}>
                <Discussion />
            </CommentsContext.Provider>
        );

        expect(setRepliesMock).toHaveBeenCalledWith({
            ...mockReplies,
            'mock-id': {isReply: true, _id: 'mock-id'}
        });

        expect(updateComment).toHaveBeenCalledWith({
            comments: mockComments,
            setComments: 'mock-set-comments',
            updatedComment: {
                isReply: false,
                _id: 'mock-id'
            }
        });

        component.unmount();
    });
});
