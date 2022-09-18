import {Button, Grid, TextField} from '@mui/material';
import React, {useState, useContext} from 'react';
import {UserAvatar} from '../avatar';
import {UsersContext} from '../../contexts';
import {commentsService} from '../../services';
import {CommentsContext} from '../../contexts';
import {updateCommentWithNewReply} from './helpers';

export const AddComment = ({isReply, parentCommentId, isParentReply, setIsReplyEnabled}) => {
    const {user: {image, _id, name}} = useContext(UsersContext);
    const {comments, setComments, replies, setReplies} = useContext(CommentsContext);
    const [message, setMessage] = useState('');

    const addComment = () => {
        if (isReply) {
            commentsService.reply({parentCommentId, message, userId: _id})
                .then(({comment, reply}) => {
                    updateCommentWithNewReply({updatedComment: comment, reply, replies, setReplies, isParentReply, comments, setComments});
                    setIsReplyEnabled(false);
                    setMessage('');
                });
        } else {
            commentsService.addComment({message, userId: _id})
                .then((response) => {
                    setComments([response, ...comments]);
                    setMessage('');
                });
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs="auto">
                <UserAvatar image={image} name={name} />
            </Grid>
            <Grid item xs>
                <TextField fullWidth
                    size="small"
                    label="What are your thoughts?"
                    variant="outlined"
                    value={message}
                    onChange={event => setMessage(event.target.value)}
                />
            </Grid>
            <Grid item xs="auto" display="flex">
                <Button variant="contained" color="primary" onClick={addComment}>Comment</Button>
            </Grid>
        </Grid>
    );
};
