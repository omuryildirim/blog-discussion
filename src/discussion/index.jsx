import React, {useContext, useCallback, useMemo} from 'react';
import {AddComment} from '../shared/components/add-comment';
import {Box, CircularProgress, Container, Divider, Typography} from '@mui/material';
import {Comment} from '../shared/components/comment';
import {DiscussionWrapper} from './style';
import websocket from '../shared/clients/websocket';
import {UsersContext} from '../shared/contexts';
import {CommentsContext} from '../shared/contexts';
import {updateComment} from '../shared/utils/helpers';
import {UpvoteEvent} from "../shared/constants";
import {processWebSocketMessage} from "./helpers";

const Discussion = () => {
    const {users, user} = useContext(UsersContext);
    const {comments, setComments, replies, setReplies} = useContext(CommentsContext);

    const onMessageReceive = useCallback((receivedMessage) => processWebSocketMessage({receivedMessage, replies, setReplies, comments, setComments}),
        [replies, setReplies, comments, setComments]
    );

    const sendMessageToWebSocket = useMemo(() => websocket(onMessageReceive), [onMessageReceive]);

    if (comments && replies && users && user) {
        return (
            <DiscussionWrapper data-testid="discussion-wrapper">
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
                            <Comment comment={comment} sendMessageToWebSocket={sendMessageToWebSocket} />
                        </Box>
                        )}
                    </Box>
                </Container>
            </DiscussionWrapper>
        );
    }

    return (
        <Container data-testid="loading-wrapper">
            <Box sx={{display: 'flex'}} justifyContent="center">
                <CircularProgress />
            </Box>
        </Container>
    );
};

export default Discussion;
