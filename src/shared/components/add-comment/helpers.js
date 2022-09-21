import {updateComment} from '../../utils/helpers';

export const updateCommentWithNewReply = ({updatedComment, reply, replies, setReplies, isParentReply, comments, setComments}) => {
    if (isParentReply) {
        setReplies({...replies, [reply._id]: reply, [updatedComment._id]: updatedComment});
    } else {
        setReplies({...replies, [reply._id]: reply});
        updateComment({comments, updatedComment, setComments});
    }
};
