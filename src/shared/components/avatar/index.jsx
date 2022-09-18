import React from 'react';
import {Avatar} from '@mui/material';

export const UserAvatar = ({image, name}) => {
    return (
        <>
            <Avatar alt={name} src={`/public/images/${image}`} sx={{height: 34, width: 34}} />
        </>
    );
};
