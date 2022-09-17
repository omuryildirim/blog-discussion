import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {UserAvatar} from "../avatar";
import React from "react";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export const Comment = ({user, time, upvotes, message}) => {
    return (
        <>
          <Grid container spacing={2}>
            <Grid item xs="auto">
                <UserAvatar picture={user.picture} />
            </Grid>
            <Grid item xs>
                <Box sx={{ mb: 1 }}>
                    <Typography component="subtitle1" fontWeight="bold">{user.name}</Typography><Typography fontSize={11} component="subtitle2"> &#8226; {time}</Typography>
                </Box>
                <Box>
                    <Typography component="subtitle1">{message}</Typography>
                </Box>
                <Box>
                    <Button startIcon={<ArrowDropUpIcon />} color="neutral">
                        Upvote
                    </Button>
                    <Button color="neutral">Reply</Button>
                </Box>
            </Grid>
          </Grid>
        </>
    );
}
