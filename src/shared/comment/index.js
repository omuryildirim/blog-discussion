import {Box, Button, Grid, Typography} from "@mui/material";
import {UserAvatar} from "../avatar";
import React from "react";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {CommentWrapper, Points} from "./style";

export const Comment = ({comment: {userid, timestamp, upvotes, message}, users, user}) => {
    const messageOwner = users[userid];
    const isUserUpvoted = upvotes.includes(user._id);

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
                    <Button startIcon={<ArrowDropUpIcon />} color="neutral" className={isUserUpvoted ? "upvoted" : ""}>
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
