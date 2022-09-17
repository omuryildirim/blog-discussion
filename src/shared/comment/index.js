import {Box, Button, Grid, Typography} from "@mui/material";
import {UserAvatar} from "../avatar";
import React from "react";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {CommentWrapper, Points} from "./style";
import axios from "axios";

export const Comment = ({comment: {userid, timestamp, upvotes, message, _id}, users, user, processUpvote}) => {
    const messageOwner = users[userid];
    const isUserUpvoted = upvotes.includes(user._id);

    const upvote = () => {
        axios.post(`/api/comment/${_id}/upvote`, {
            upvoter: user._id
          })
          .then((response) => {
            processUpvote(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    return (
        <CommentWrapper>
          <Grid container spacing={2}>
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
                    <Button color="neutral">Reply</Button>
                </Box>
            </Grid>
          </Grid>
        </CommentWrapper>
    );
}
