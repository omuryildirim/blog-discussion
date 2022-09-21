import '@testing-library/jest-dom';
import React from 'react';
import App from './App';
import * as services from './shared/services';
import {render, screen} from '@testing-library/react';

jest.mock('./shared/services');

describe('App', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render', () => {
        // Resolve requests with empty data
        services.usersService.getUsers.mockResolvedValueOnce({});
        services.usersService.getUser.mockResolvedValueOnce({});
        services.commentsService.getComments.mockResolvedValueOnce([]);
        services.commentsService.getReplies.mockResolvedValueOnce({});

        const component = render(<App />);

        // check if discussion component is rendered
        expect(screen.getByTestId('loading-wrapper')).toBeVisible();

        component.unmount();
    });
});
