import React, {useContext} from 'react';
import {AddComment} from '../shared/components/add-comment';
import {Box, CircularProgress, Container, Divider, Typography} from '@mui/material';
import {Comment} from '../shared/components/comment';
import {DiscussionWrapper} from './style';
import {websocket} from '../websocket';
import {UsersContext} from '../shared/contexts';
import {CommentsContext} from '../shared/contexts';
import {updateComment} from '../shared/utils/helpers';

const Discussion = () => {
    const {users, user} = useContext(UsersContext);
    const {comments, setComments, replies, setReplies} = useContext(CommentsContext);

    const onMessageReceive = (data) => {
        if (data.isReply) {
            setReplies({...replies, [data.comment._id]: data.comment});
        } else {
            updateComment({comments, updatedComment: data.comment, setComments});
        }
    };
    const sendCommentToWebSocket = websocket(onMessageReceive);

    if (comments && replies && users && user) {
        return (
            <DiscussionWrapper>
                <Container className="container">
                    <Box sx={{mb: 6, mx: 2}}>
                        <Typography variant="h5" mb={4} fontWeight="bold">
                            Discussion
                        </Typography>
                        <AddComment mb={4} isReply={false} />
                    </Box>
                    <Divider variant="middle" />
                    <Box sx={{mt: 6}}>
                        {comments.map(comment => <Box sx={{mt: 4, mx: 2}} key={comment._id}>
                            <Comment comment={comment} sendCommentToWebSocket={sendCommentToWebSocket} />
                        </Box>
                        )}
                    </Box>
                </Container>
            </DiscussionWrapper>
        );
    }

    return (
        <Container>
            <Box sx={{display: 'flex'}} justifyContent="center">
                <CircularProgress />
            </Box>
        </Container>
    );
};

export default Discussion;
