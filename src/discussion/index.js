import React, {useCallback, useEffect, useState} from 'react';
import {AddComment} from "../shared/add-comment";
import {Box, CircularProgress, Container, Divider, Typography} from "@mui/material";
import {Comment} from "../shared/comment";
import {DiscussionWrapper} from "./style";
import axios from "axios";

const Discussion = () => {
  const [comments, setComments] = useState(null);
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const pushComment = useCallback((comment) => {
      setComments([comment, ...comments]);
  });
  const processUpvote = useCallback((updatedComment) => {
      const updatedComments = comments.reduce((list, data) => {
          if (data._id === updatedComment._id) {
              list.push(updatedComment);
          } else {
              list.push(data);
          }

          return list;
      }, []);
      setComments(updatedComments);
  });

  useEffect(() => {
    axios.get('/api/comments')
      .then(({data}) => {
          data.sort((c1, c2) => c1.timestamp < c2.timestamp ? 1:-1);
          setComments(data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get('/api/users')
      .then(({data}) => setUsers(data))
      .catch((error) => {
        console.log(error);
      });
    axios.get('/api/user')
      .then(({data}) => setUser(data))
      .catch((error) => {
        console.log(error);
      });
  }, [])

  if (comments && users && user) {
    return (
      <DiscussionWrapper>
          <Container className="container">
              <Box sx={{ mb: 6, mx: 2 }}>
                <Typography variant="h5" mb={4} fontWeight="bold">
                  Discussion
                </Typography>
                <AddComment mb={4} user={user} pushComment={pushComment} />
              </Box>
              <Divider variant="middle" />
              <Box sx={{ mt: 6 }}>
                  {comments.map(comment =>
                      <Box sx={{ mt: 4, mx: 2 }} key={comment._id}>
                            <Comment comment={comment} users={users} user={user} processUpvote={processUpvote} />
                      </Box>
                  )}
              </Box>
          </Container>
      </DiscussionWrapper>
    );
  }

  return (
    <Container>
      <Box sx={{ display: 'flex' }} justifyContent="center">
        <CircularProgress />
      </Box>
    </Container>
  )
}

export default Discussion;
