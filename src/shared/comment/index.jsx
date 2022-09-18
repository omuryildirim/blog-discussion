import {Box, Button, Grid, Typography} from "@mui/material";
import {UserAvatar} from "../avatar";
import React, {useState, useCallback} from "react";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {CommentWrapper, Points, VerticalLine} from "./style";
import axios from "axios";
import {AddComment} from "../add-comment";

export const Comment = ({comment: {userId, timestamp, upvotes, message, _id, replies: commentReplies, isReply}, users, user, updateComment, pushReply, replies, sendCommentToWebSocket}) => {
    const messageOwner = users[userId];
    const isUserUpvoted = upvotes.includes(user._id);
    const [isReplyEnabled, setIsReplyEnabled] = useState(false);

    const upvote = useCallback(() => {
        axios.post(`/api/comment/${_id}/upvote`, {
            upvoter: user._id
          })
          .then((response) => {
              if (isReply) {
                  pushReply([response.data]);
              } else {
                  updateComment(response.data);
              }
              sendCommentToWebSocket(response.data);
          })
          .catch((error) => {
            console.log(error);
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
                <Box sx={{ mb: 1 }}>
                    <Typography component="subtitle1" fontWeight="bold">{messageOwner.name}</Typography><Typography fontSize={11} component="subtitle2"> &#8226; {timestamp}</Typography>
                </Box>
                <Box>
                    <Typography component="subtitle1">{message}</Typography>
                </Box>
                <Box>
                    <Button startIcon={<ArrowDropUpIcon />}
                            color="neutral"
                            className={isUserUpvoted ? "upvoted" : ""}
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
                    <Box>
                        <AddComment user={user}
                                    isReply={true}
                                    parentId={_id}
                                    pushComment={({comment, reply}) => {
                                        if (isReply) {
                                            pushReply([reply, comment]);
                                        } else {
                                            pushReply([reply]);
                                            updateComment(comment);
                                        }

                                        setIsReplyEnabled(false);
                                    }}
                        />
                    </Box>
                ) : (
                    <></>
                )}
                {commentReplies.length ? (
                  commentReplies.map(id =>
                      <Box sx={{ mt: 4, mx: 2 }} key={id}>
                            <Comment comment={replies[id]}
                                     users={users}
                                     user={user}
                                     updateComment={updateComment}
                                     pushReply={pushReply}
                                     replies={replies}
                                     sendCommentToWebSocket={sendCommentToWebSocket}
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
}
