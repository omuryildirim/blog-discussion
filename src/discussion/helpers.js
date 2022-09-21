import {UpvoteEvent} from '../shared/constants';
import {updateComment} from '../shared/utils/helpers';

export const processWebSocketMessage = ({receivedMessage, replies, setReplies, comments, setComments}) => {
    if (receivedMessage.event === UpvoteEvent) {
        if (receivedMessage.comment.isReply) {
            setReplies({...replies, [receivedMessage.comment._id]: receivedMessage.comment});
        } else {
            updateComment({comments, updatedComment: receivedMessage.comment, setComments});
        }
    }
};
