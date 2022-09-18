import {Box, Button, Grid, Typography} from '@mui/material';
import {UserAvatar} from '../avatar';
import React, {useState, useCallback, useContext} from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {CommentWrapper, Points, VerticalLine} from './style';
import {AddComment} from '../add-comment';
import {UsersContext} from '../../contexts';
import {CommentsContext} from '../../contexts';
import {commentsService} from '../../services';
import {updateComment} from '../../utils/helpers';
import {format} from 'timeago.js';

export const Comment = ({comment: {userId, timestamp, upvotes, message, _id, replies: commentReplies, isReply}, sendCommentToWebSocket}) => {
    const {users, user} = useContext(UsersContext);
    const {replies, setReplies, comments, setComments} = useContext(CommentsContext);

    const messageOwner = users[userId];
    const isUserUpvoted = upvotes.includes(user._id);
    const [isReplyEnabled, setIsReplyEnabled] = useState(false);

    const upvote = useCallback(() => {
        commentsService.upvoteComment({commentId: _id, userId: user._id})
            .then((response) => {
                if (isReply) {
                    setReplies({...replies, [response._id]: response});
                } else {
                    updateComment({updatedComment: response, comments, setComments});
                }
                sendCommentToWebSocket(response);
            });
    });

    return (
        <CommentWrapper>
            <Grid container spacing={2} className="grid-container">
                {commentReplies.length ? (
                    <VerticalLine />
                ) : (
                    <></>
                )}
                <Grid item xs="auto">
                    <UserAvatar image={messageOwner.image} name={messageOwner.name} />
                </Grid>
                <Grid item xs>
                    <Box sx={{mb: 1}}>
                        <Typography component="subtitle1" fontWeight="bold">{messageOwner.name}</Typography><Typography fontSize={11} component="subtitle2"> &#8226; {format(timestamp)}</Typography>
                    </Box>
                    <Box>
                        <Typography component="subtitle1">{message}</Typography>
                    </Box>
                    <Box>
                        <Button startIcon={<ArrowDropUpIcon />}
                            color="neutral"
                            className={isUserUpvoted ? 'upvoted' : ''}
                            onClick={upvote}
                            disabled={isUserUpvoted}
                        >
                            {upvotes.length ? (
                                <>
                                    <Points>{upvotes.length}</Points>
                                    {isUserUpvoted ? (
                                        <>Upvoted</>
                                    ) : (
                                        <>Upvote</>
                                    )}
                                </>
                            ) : (
                                <>Upvote</>
                            )}
                        </Button>
                        <Button color="neutral" onClick={() => setIsReplyEnabled(!isReplyEnabled)}>Reply</Button>
                    </Box>
                    {isReplyEnabled ? (
                        <Box sx={{mt: 4, mx: 2}}>
                            <AddComment isReply={true} isParentReply={isReply} parentCommentId={_id} setIsReplyEnabled={status => setIsReplyEnabled(status)} />
                        </Box>
                    ) : (
                        <></>
                    )}
                    {commentReplies.length ? (
                        commentReplies.map(id => <Box sx={{mt: 4, mx: 2}} key={id}>
                            <Comment comment={replies[id]} sendCommentToWebSocket={sendCommentToWebSocket}
                            />
                        </Box>
                        )
                    ) : (
                        <></>
                    )}
                </Grid>
            </Grid>
        </CommentWrapper>
    );
};
