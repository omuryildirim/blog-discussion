"use strict";

// Global variables
let users;
let user;

// HTTP functions
const get = async (url) => {
    const response = await fetch(url, {
      method: "GET",
      headers: {'Content-Type': 'application/json'}
    });

    return await response.json();
};

const post = async (url, body) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    });

    return await response.json();
};

// DOM manipulators
// Functions that adds comment to comment section
const createCommentBody = ({userid, timestamp, message, upvotes, _id}) => {
    const commentBody = document.createElement("div");
    commentBody.className = "comment-body";

    commentBody.appendChild(createCommentHeader(users[userid].name));
    commentBody.appendChild(createTimeAgo(timestamp));
    commentBody.appendChild(createMessage(message));
    commentBody.appendChild(createUpvoteButton(_id, upvotes));

    return commentBody;
}

const createCommentHeader = (username) => {
    const commentHeader = document.createElement("div");
    commentHeader.className = "comment-header";
    commentHeader.textContent = username;
    return commentHeader;
}

const createTimeAgo = () => {
    const commentTimeAgo = document.createElement("div");
    commentTimeAgo.className = "comment-time-ago";
    commentTimeAgo.textContent = "・ 45 min ago";
    return commentTimeAgo;
}

const createMessage = (text) => {
    const message = document.createElement("div");
    message.className = "message";
    message.textContent = text;
    document.getElementById("text-input").value = "";
    return message;
}

const createUpvoteButton = (id, upvotes) => {
    const actionButton = document.createElement("div");
    actionButton.className = "action-button";
    actionButton.dataset.id = id;

    const upvoteIcon = document.createElement("div");
    upvoteIcon.className = "upvote-icon";
    upvoteIcon.textContent = "▲";

    const text = document.createElement("div");
    text.className = "action-button-text";
    text.textContent = "Upvote";

    if (upvotes.length) {
        const points = document.createElement("div");
        points.className = "points";
        points.textContent = upvotes.length;
        actionButton.appendChild(points);

        if (upvotes.includes(user._id)) {
            actionButton.className += " upvoted";
            text.textContent += "d";
        }
    }

    actionButton.appendChild(upvoteIcon);
    actionButton.appendChild(text);
    actionButton.addEventListener("click", upvote);

    return actionButton;
}

const addCommentToHTML = (data) => {
    const comment = document.createElement("div");
    comment.className = "comment";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.style.backgroundImage = `url(public/images/${users[data.userid].image})`;

    comment.appendChild(avatar);
    comment.appendChild(createCommentBody(data));

    const commentSection = document.getElementById("comments-section");
    commentSection.insertBefore(comment, commentSection.firstChild);
}

// Upvote
const upvote = (event) => {
    const target = event.currentTarget;
    post(`/api/comment/${target.dataset.id}/upvote`, {upvoter: user._id}).then(data => {
        if (target.className.indexOf("upvoted") < 0) {
            target.className += " upvoted";
            target.querySelector(".action-button-text").textContent = "Upvoted";

            let points = target.querySelector(".points");

            if (points) {
                points.textContent = data.upvotes.length;
            } else {
                points = document.createElement("div");
                points.className = "points";
                points.textContent = data.upvotes.length;
                target.insertBefore(points, target.firstChild);
            }
        }
    });

}

// On click events
document.getElementById("comment-button").addEventListener("click", event => {
    post("/api/comment", {
        userid: user._id,
        message: document.getElementById("text-input").value
    }).then(data => addCommentToHTML(data));
});

// Load users
get("/api/users").then((data) => {
    users = data;
});

// Load comments
const loadComments = () => get("/api/comments").then(comments => {
    comments.sort((c1, c2) => c1.timestamp > c2.timestamp ? 1:-1);
    comments.forEach(comment => addCommentToHTML(comment));
});

// Load userdata
get("/api/user").then(data => {
    document.getElementById("add-comment").querySelector(".avatar").style.backgroundImage = `url(public/images/${data.image})`;
    user = data;
    loadComments();
});

