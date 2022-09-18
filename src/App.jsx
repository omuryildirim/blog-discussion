import React from 'react';
import {
    BrowserRouter as Router
} from 'react-router-dom';
import {theme} from './theme';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {Routes} from './routes';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes />
            </Router>
        </ThemeProvider>
    );
};

export default App;
