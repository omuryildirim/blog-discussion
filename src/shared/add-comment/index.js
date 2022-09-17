import {Button, Grid, TextField} from "@mui/material";
import React, { useState } from "react";
import {UserAvatar} from "../avatar";
import axios from "axios";

export const AddComment = ({user: {image, _id, name}, pushComment, isReply, parentId}) => {
    const [message, setMessage] = useState("");

    const addComment = () => {
        if (isReply) {
            axios.post(`/api/comment/${parentId}/reply`, {
                userId: _id,
                message
              })
              .then((response) => {
                pushComment(response.data);
                setMessage("");
              })
              .catch((error) => {
                console.log(error);
              });
        } else {
            axios.post('/api/comment', {
                userId: _id,
                message
              })
              .then((response) => {
                pushComment(response.data);
                setMessage("");
              })
              .catch((error) => {
                console.log(error);
              });
        }
    }

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
                       onChange={(event) => setMessage(event.target.value)}
            />
        </Grid>
        <Grid item xs="auto" display="flex">
            <Button variant="contained" color="primary" onClick={addComment}>Comment</Button>
        </Grid>
      </Grid>
    );
}
