import React, {useEffect, useState} from 'react';
import {AddComment} from "../shared/add-comment";
import {Box, CircularProgress, Container, Divider, Typography} from "@mui/material";
import {Comment} from "../shared/comment";
import {DiscussionWrapper} from "./style";

const Discussion = () => {
  const [comments, setComments] = useState(null);
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/comments')
      .then(resp => resp.json())
      .then(data => setComments(data.sort((c1, c2) => c1.timestamp > c2.timestamp ? 1:-1)))
    fetch('/api/users')
      .then(resp => resp.json())
      .then(data => setUsers(data))
    fetch('/api/user')
      .then(resp => resp.json())
      .then(data => setUser(data))
  }, [])

  if (comments && users && user) {
    return (
      <DiscussionWrapper>
          <Container className="container">
              <Box sx={{ mb: 6, mx: 2 }}>
                <Typography variant="h5" mb={4} fontWeight="bold">
                  Discussion
                </Typography>
                <AddComment mb={4} user={user} />
              </Box>
              <Divider variant="middle" />
              <Box sx={{ mt: 6 }}>
                  {comments.map(comment =>
                      <Box sx={{ mt: 4, mx: 2 }} key={comment._id}>
                            <Comment comment={comment} users={users} user={user} />
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
