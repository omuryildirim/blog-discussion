export const mockComments = [
    {
        "_id": "6328388575b9cc8ddf87687d",
        "userId": "6325c5e7c7fd8afeaff45fb3",
        "message": "Test",
        "replies": [
            "6328389375b9cc8ddf876885"
        ],
        "upvotes": [
            "6325c5e7c7fd8afeaff45fb4"
        ],
        "timestamp": 1663580293002,
        "isReply": false,
        "__v": 0
    },
    {
        "_id": "6328388a75b9cc8ddf876883",
        "userId": "6325c5e7c7fd8afeaff45fb4",
        "message": "Test2",
        "replies": [],
        "upvotes": [],
        "timestamp": 1663580298253,
        "isReply": false,
        "__v": 0
    }
];

export const mockReplies = {
    "6328389375b9cc8ddf876885": {
        "_id": "6328389375b9cc8ddf876885",
        "userId": "6325c5e7c7fd8afeaff45fb4",
        "message": "Hej Anna!",
        "replies": [],
        "upvotes": [
            "6325c5e7c7fd8afeaff45fb4",
            "6325c5e7c7fd8afeaff45fb6"
        ],
        "timestamp": 1663580307095,
        "isReply": true,
        "__v": 0
    }
}