import {axiosWrapper} from './axiosWrapper';

export const commentsService = {
    getComments: () => axiosWrapper('get', '/api/comments'),
    getReplies: () => axiosWrapper('get', '/api/replies'),
    upvoteComment: ({commentId, userId}) => axiosWrapper('post', `/api/comment/${commentId}/upvote`, {upvoter: userId}),
    reply: ({parentCommentId, message, userId}) => axiosWrapper('post', `/api/comment/${parentCommentId}/reply`, {
        userId,
        message
    }),
    addComment: ({message, userId}) => axiosWrapper('post', '/api/comment', {
        userId,
        message
    })
};
