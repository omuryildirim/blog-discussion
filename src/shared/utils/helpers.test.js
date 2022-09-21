import {updateComment} from './helpers';
import {mockComments} from '../../../__mocks__/comments';

describe('helpers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('updateComment', () => {
        it('should process update comment accordingly', () => {
            const setComments = jest.fn();
            const updatedComment = {...mockComments[0], upvotes: ['test']};
            updateComment({comments: mockComments, updatedComment, setComments});

            expect(setComments).toHaveBeenCalledWith([{...mockComments[0], upvotes: ['test']}, ...mockComments.slice(1)]);
        });
    });
});
