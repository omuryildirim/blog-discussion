import React, {useEffect, useState, useMemo} from 'react';
import {
    BrowserRouter as Router
} from 'react-router-dom';
import {theme} from './theme';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {Routes} from './routes';
import {UsersContext} from './shared/contexts';
import {usersService} from './shared/services';
import {commentsService} from './shared/services';
import {CommentsContext} from './shared/contexts';

const App = () => {
    const [users, setUsers] = useState(null);
    const [user, setUser] = useState(null);
    const [comments, setComments] = useState(null);
    const [replies, setReplies] = useState(null);
    const usersContextValue = useMemo(
        () => ({users, setUsers, user, setUser}),
        [users, user]
    );
    const commentsContextValue = useMemo(
        () => ({comments, setComments, replies, setReplies}),
        [comments, replies]
    );

    useEffect(() => {
        usersService.getUsers().then(data => setUsers(data));
        usersService.getUser().then(data => setUser(data));
        commentsService.getComments().then(data => setComments(data));
        commentsService.getReplies().then(data => setReplies(data));
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <UsersContext.Provider value={usersContextValue}>
                    <CommentsContext.Provider value={commentsContextValue}>
                        <Routes />
                    </CommentsContext.Provider>
                </UsersContext.Provider>
            </Router>
        </ThemeProvider>
    );
};

export default App;
