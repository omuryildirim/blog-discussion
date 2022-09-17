"use strict";

const createCommentBody = () => {

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
    const commentBody = document.createElement("div");
    commentBody.className = "comment-body";

    commentBody.appendChild(createCommentHeader());
    commentBody.appendChild(createTimeAgo());
    commentBody.appendChild(createMessage());
    commentBody.appendChild(createUpvoteButton());

    return commentBody;
}

const createCommentHeader = () => {
    const commentHeader = document.createElement("div");
    commentHeader.className = "comment-header";
    commentHeader.textContent = "Telia";
    return commentHeader;
}

const createTimeAgo = () => {
    const commentTimeAgo = document.createElement("div");
    commentTimeAgo.className = "comment-time-ago";
    commentTimeAgo.textContent = "・ 45 min ago";
    return commentTimeAgo;
}

const createMessage = () => {
    const message = document.createElement("div");
    message.className = "message";
    message.textContent = document.getElementById("text-input").value;
    document.getElementById("text-input").value = "";
    return message;
}

const createUpvoteButton = () => {
    const actionButton = document.createElement("div");
    actionButton.className = "action-button";

    const upvoteIcon = document.createElement("div");
    upvoteIcon.className = "upvote-icon";
    upvoteIcon.textContent = "▲";

    const text = document.createElement("div");
    text.className = "action-button-text";
    text.textContent = "Upvote";

    actionButton.appendChild(upvoteIcon);
    actionButton.appendChild(text);
    actionButton.addEventListener("click", upvote);

    return actionButton;
}

document.getElementById("comment-button").addEventListener("click", event => {
    const comment = document.createElement("div");
    comment.className = "comment";

    const avatar = document.createElement("div");
    avatar.className = "avatar";

    comment.appendChild(avatar);
    comment.appendChild(createCommentBody());

    const commentSection = document.getElementById("comments-section");
    commentSection.insertBefore(comment, commentSection.firstChild);

    return true;
});

// Upvote
const upvote = (event) => {
    if (event.currentTarget.className.indexOf("upvoted") < 0) {
        event.currentTarget.className += " upvoted";
        event.currentTarget.querySelector(".action-button-text").textContent = "Upvoted";

        let points = event.currentTarget.querySelector(".points");

        if (points) {
            points.textContent = parseInt(points.textContent) + 1;
        } else {
            points = document.createElement("div");
            points.className = "points";
            points.textContent = "1";
            event.currentTarget.insertBefore(points, event.currentTarget.firstChild);
        }
    }
}

document.querySelectorAll(".upvote-button").forEach(element => {
    element.addEventListener("click", event => upvote(event));
});
