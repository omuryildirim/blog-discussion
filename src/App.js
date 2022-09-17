import React, { useState } from 'react'
import {
  BrowserRouter as Router,
} from "react-router-dom";
import {theme} from "./theme";
import {Box, CircularProgress, CssBaseline, ThemeProvider} from "@mui/material";
import {Routes} from "./routes";

const App = () => {
  const [comments, setComments] = useState(null);

  if (!comments) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes />
        </Router>
      </ThemeProvider>
    )
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  )
}

export default App
