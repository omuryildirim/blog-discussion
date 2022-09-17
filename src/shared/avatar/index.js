import {Avatar} from "@mui/material";

export const UserAvatar = ({ picture }) => {
    return (
        <>
            <Avatar sx={{ bgcolor: `#${Math.floor(Math.random()*16777215).toString(16)}`, height: 34, width: 34 }} >
                { picture }
            </Avatar>
        </>
    );
}
