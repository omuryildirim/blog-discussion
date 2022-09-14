import React from 'react';
import {AddComment} from "../shared/add-comment";
import {Box, Container, Divider, Grid, Typography} from "@mui/material";
import {Comment} from "../shared/comment";

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
const comments = [{
        user: {
            name: "Test",
            picture: "A"
        },
        time: new Date().toDateString(),
        message: loremIpsum.slice(50)
    },
    {
        user: {
            name: "Test2",
            picture: "P"
        },
        time: new Date().toDateString(),
        message: loremIpsum.slice(50)
    }
];

const Discussion = (props) => {
    return (
      <Container >
          <Box sx={{ mb: 6, mx: 2 }}>
            <Typography variant="h5" mb={4} fontWeight="bold">
              Discussion
            </Typography>
            <AddComment mb={4} user={comments[0].user} />
          </Box>
          <Divider variant="middle" />
          <Box sx={{ mt: 6 }}>
              {comments.map(comment =>
                  <Box sx={{ mt: 4, mx: 2 }}>
                        <Comment user={comment.user} time={comment.time} message={comment.message} />
                  </Box>
              )}
          </Box>
      </Container>
    );
}

export default Discussion;
