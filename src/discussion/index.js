import React, {useCallback, useEffect, useState} from 'react';
import {AddComment} from "../shared/add-comment";
import {Box, CircularProgress, Container, Divider, Typography} from "@mui/material";
import {Comment} from "../shared/comment";
import {DiscussionWrapper} from "./style";
import axios from "axios";

const Discussion = () => {
  const [comments, setComments] = useState(null);
  const [replies, setReplies] = useState(null);
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const pushComment = useCallback((comment) => {
      setComments([comment, ...comments]);
  });
  const updateComment = useCallback((updatedComment) => {
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
  const pushReply = useCallback((reply) => {
      setReplies({...replies, ...reply.reduce((dict, data) => {dict[data._id] = data; return dict;}, {})});
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
    axios.get('/api/replies')
      .then(({data}) => {
          setReplies(data);
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
                <AddComment mb={4} user={user} pushComment={pushComment} isReply={false} />
              </Box>
              <Divider variant="middle" />
              <Box sx={{ mt: 6 }}>
                  {comments.map(comment =>
                      <Box sx={{ mt: 4, mx: 2 }} key={comment._id}>
                            <Comment comment={comment}
                                     users={users}
                                     user={user}
                                     updateComment={updateComment}
                                     pushComment={pushComment}
                                     pushReply={pushReply}
                                     replies={replies}
                            />
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
