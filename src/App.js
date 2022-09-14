import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";
import Discussion from "./discussion";
import {theme} from "./theme";
import {Box, CircularProgress, CssBaseline, ThemeProvider} from "@mui/material";

const AppRoutes = () => {
  return useRoutes([
    { path: "/", element: <Discussion /> },
  ]);
};

const App = () => {
  const [comments, setComments] = useState(null);

  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  )
}

export default App
