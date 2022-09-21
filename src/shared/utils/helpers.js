export const updateComment = ({comments, updatedComment, setComments}) => {
    const updatedComments = comments.reduce((list, data) => {
        if (data._id === updatedComment._id) {
            list.push(updatedComment);
        } else {
            list.push(data);
        }

        return list;
    }, []);
    setComments(updatedComments);
};
