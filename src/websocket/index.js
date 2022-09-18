const client = new WebSocket("ws://localhost:3001/websockets");

export const websocket = (updateComment, pushReply) => {
    client.onopen = () => {
        console.log('WebSocket Client Connected');
    };

    client.onmessage = (message) => {
        const data = JSON.parse(message.data);
        console.log(message);
        try {
            if (data.userId !== "userId") {
                if (data.isReply) {
                    pushReply([data.comment]);
                } else {
                    updateComment(data.comment);
                }
            }
        } catch (err) {
          console.log(err);
        }
    };

    client.onerror = () => {
        console.log('Connection Error');
    };

    const sendCommentToWebSocket = (comment) => {
        client.send(JSON.stringify({
            event: "comment:upvote",
            comment
        }));
    };

    return sendCommentToWebSocket;
}
