import {Button, Grid, TextField} from "@mui/material";
import React from "react";
import {UserAvatar} from "../avatar";

export const AddComment = ({user}) => {
    return (
      <Grid container spacing={2}>
        <Grid item xs="auto">
            <UserAvatar picture={user.picture} />
        </Grid>
        <Grid item xs>
            <TextField fullWidth size="small" label="What are your thoughts?" variant="outlined" />
        </Grid>
        <Grid item xs="auto" display="flex">
            <Button variant="contained" color="primary">Comment</Button>
        </Grid>
      </Grid>
    );
}
